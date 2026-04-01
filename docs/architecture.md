# Solo-Vibe: Technische Architektur (MVP)

## Überblick

```
┌─────────────┐     HTTPS      ┌──────────────┐     SSH      ┌──────────────┐
│   Browser    │ ◄────────────► │  Solo-Vibe    │ ──────────► │  Server des   │
│   (Web-App)  │                │  Backend      │             │  Nutzers      │
└─────────────┘                └──────┬───────┘             └──────────────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │  PostgreSQL   │
                               │  + Git-Repos  │
                               │  (Filesystem) │
                               └──────────────┘
```

## Backend

### Tech-Stack

| Komponente | Technologie | Begründung |
|------------|-------------|------------|
| API-Server | **Node.js + Hono** (oder Fastify) | Schnell, leichtgewichtig, TypeScript-native |
| Datenbank | **PostgreSQL** | Zuverlässig, JSON-Support für flexible Metadaten |
| Git-Operationen | **isomorphic-git** oder **git CLI** | Git als Versionierungsengine, nie als Nutzer-Feature |
| SSH-Client | **ssh2** (Node.js Library) | Server-Verbindung, Deployment, Log-Streaming |
| File Storage | **Filesystem** (Git-Repos auf Disk) | Einfach, schnell, exportierbar. Object Storage (S3) später. |
| Auth | **Lucia** oder **Better Auth** | Session-basiert, einfach, selbst-gehostet |
| Frontend | **SvelteKit** oder **Next.js** | SSR, schnell, gute DX |
| Queue | **BullMQ + Redis** | Für asynchrone Jobs (Deploy, Server-Setup) |

### API-Struktur

```
POST   /api/projects                    → Projekt erstellen
GET    /api/projects                    → Alle Projekte des Nutzers
GET    /api/projects/:id                → Projekt-Detail
DELETE /api/projects/:id                → Projekt archivieren
POST   /api/projects/:id/upload         → Code hochladen
GET    /api/projects/:id/download       → ZIP-Export

POST   /api/projects/:id/snapshots      → Stand speichern
GET    /api/projects/:id/snapshots      → Alle Stände
GET    /api/projects/:id/snapshots/:sid → Stand-Detail

POST   /api/projects/:id/releases       → Veröffentlichungsstand markieren
GET    /api/projects/:id/releases       → Alle Veröffentlichungsstände

POST   /api/projects/:id/deploy         → Live schalten
POST   /api/projects/:id/rollback       → Zurücksetzen
GET    /api/projects/:id/deploy/status  → Deploy-Status (SSE/WebSocket)

GET    /api/projects/:id/logs           → Server-Protokoll (SSE)

POST   /api/servers                     → Server verbinden
GET    /api/servers/:id                 → Server-Details
POST   /api/servers/:id/test            → Verbindung testen
POST   /api/servers/:id/setup           → Server einrichten
DELETE /api/servers/:id                 → Server trennen

GET    /api/projects/:id/secrets        → Geheime Einstellungen
PUT    /api/projects/:id/secrets        → Einstellungen aktualisieren

GET    /api/projects/:id/timeline       → Vereinigter Verlauf
```

---

## Datenmodell

### Tabellen

```sql
-- Nutzer
users
  id            UUID PRIMARY KEY
  email         TEXT UNIQUE NOT NULL
  name          TEXT
  created_at    TIMESTAMPTZ

-- Projekte
projects
  id            UUID PRIMARY KEY
  user_id       UUID REFERENCES users
  name          TEXT NOT NULL
  description   TEXT
  runtime       TEXT  -- 'static' | 'nodejs'
  repo_path     TEXT  -- Pfad zum Git-Repo auf dem Filesystem
  server_id     UUID REFERENCES servers (NULLABLE)
  is_public     BOOLEAN DEFAULT false
  archived_at   TIMESTAMPTZ
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ

-- Stände (Referenz auf Git-Commits)
snapshots
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  commit_hash   TEXT NOT NULL
  note          TEXT  -- optionale Nutzernotiz
  created_at    TIMESTAMPTZ

-- Veröffentlichungsstände (Referenz auf Git-Tags)
releases
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  snapshot_id   UUID REFERENCES snapshots
  tag_name      TEXT NOT NULL  -- 'v1', 'v2', 'Version mit neuem Design'
  created_at    TIMESTAMPTZ

-- Deployments
deployments
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  release_id    UUID REFERENCES releases
  server_id     UUID REFERENCES servers
  status        TEXT  -- 'pending' | 'transferring' | 'building' | 'starting' | 'checking' | 'live' | 'failed'
  error_message TEXT
  started_at    TIMESTAMPTZ
  completed_at  TIMESTAMPTZ

-- Server
servers
  id            UUID PRIMARY KEY
  user_id       UUID REFERENCES users
  name          TEXT
  host          TEXT NOT NULL
  port          INTEGER DEFAULT 22
  username      TEXT DEFAULT 'solovibe'
  ssh_key_id    UUID  -- Referenz auf verschlüsselten Key
  os_info       JSONB  -- {distro, version, arch}
  setup_status  TEXT  -- 'pending' | 'ready' | 'error'
  target_dir    TEXT  -- z.B. '/opt/solovibe'
  created_at    TIMESTAMPTZ

-- Geheime Einstellungen
secrets
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  key           TEXT NOT NULL
  value_enc     BYTEA NOT NULL  -- verschlüsselt (AES-256-GCM)
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ

-- Ereignis-Log (vereinigter Verlauf)
events
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  type          TEXT  -- 'snapshot' | 'release' | 'deploy' | 'rollback' | 'error' | 'server_setup'
  reference_id  UUID  -- ID des zugehörigen Objekts
  message       TEXT
  created_at    TIMESTAMPTZ
```

---

## Snapshot- und Versionierungslogik

### Prinzip
Jedes Projekt ist intern ein Git-Repository. Der Nutzer weiß das nicht und muss es nicht wissen.

### Ablauf: Stand speichern
1. Nutzer lädt Dateien hoch (oder Solo-Vibe erkennt Änderungen)
2. Dateien werden ins Working Directory des Git-Repos geschrieben
3. `git add .` + `git commit -m "[Nutzernotiz oder Auto-Message]"`
4. Commit-Hash wird in `snapshots`-Tabelle gespeichert

### Ablauf: Veröffentlichungsstand markieren
1. Nutzer markiert einen Stand
2. `git tag v[n] [commit-hash]`
3. Tag wird in `releases`-Tabelle gespeichert

### Ablauf: Stand wiederherstellen
1. `git checkout [commit-hash]` (detached HEAD)
2. Neuer Commit mit dem Zustand des alten Stands
3. Kein destructive Reset — die History bleibt intakt

### Speicher
- Repos liegen unter `/data/repos/[user-id]/[project-id]/`
- Backup: regelmäßiger Snapshot des gesamten `/data/repos/` Verzeichnisses
- Langfristig: Migration zu Object Storage (S3-kompatibel) möglich

---

## Deployment-Engine

### Ablauf: Live schalten

```
1. Prüfungen
   ├── Serververbindung aktiv?
   ├── Veröffentlichungsstand vorhanden?
   └── Secrets vollständig?

2. Code-Transfer
   ├── git archive [tag] → tar
   ├── rsync über SSH zum Server
   └── Dateien in /opt/solovibe/[projekt]/releases/[tag]/

3. Build (je nach Runtime)
   ├── Static: nichts zu tun
   └── Node.js: npm ci --production (oder npm install)

4. Aktivierung
   ├── Symlink: /opt/solovibe/[projekt]/current → releases/[tag]/
   ├── Static: Nginx-Config reload
   └── Node.js: PM2 restart/start

5. Secrets
   └── .env-Datei wird aus verschlüsselten Secrets generiert und auf den Server geschrieben

6. Funktionstest
   ├── HTTP GET auf http://[server-ip]:[port]/
   ├── Statuscode 2xx → Erfolg
   └── Timeout oder Fehler → Rollback anbieten

7. Status aktualisieren
   └── Deployment-Status in DB → 'live' oder 'failed'
```

### Rollback
1. Symlink auf vorherigen Release umstellen: `current → releases/[vorheriger-tag]/`
2. PM2 restart oder Nginx reload
3. Funktionstest
4. Kein neuer Build nötig — der alte Release liegt noch auf dem Server

### Verzeichnisstruktur auf dem Server

```
/opt/solovibe/[projekt]/
├── releases/
│   ├── v1/
│   ├── v2/
│   └── v3/
├── current → releases/v3  (Symlink)
├── shared/
│   └── .env
└── logs/
```

---

## Secrets-Handling

### Speicherung
- Secrets werden AES-256-GCM verschlüsselt in der Datenbank gespeichert
- Encryption Key liegt in einer Umgebungsvariable des Solo-Vibe-Servers (nicht in der DB)
- Secrets werden nur beim Deploy entschlüsselt und als `.env`-Datei auf den Nutzer-Server geschrieben
- Die `.env`-Datei liegt im `shared/`-Verzeichnis und wird per Symlink in den aktuellen Release eingebunden

### Sichtbarkeit
- In der UI werden Werte maskiert (nur die letzten 4 Zeichen sichtbar)
- Secrets werden nie in Logs, Protokollen oder Fehlerausgaben angezeigt
- Beim ZIP-Export werden Secrets NICHT mit exportiert (separate Warnung)

---

## Logs

### Server-Logs
- Werden per SSH vom Nutzer-Server gestreamt (`ssh user@host 'pm2 logs --raw'` oder `journalctl -f`)
- Werden live per SSE (Server-Sent Events) an das Frontend übertragen
- Werden NICHT dauerhaft auf dem Solo-Vibe-Server gespeichert (Datenschutz)
- Im Frontend gefiltert und mit Zeitstempeln versehen

### Deployment-Logs
- Jeder Schritt des Deployments wird protokolliert
- Bei Fehlern: der technische Fehler wird gespeichert + eine menschenlesbare Übersetzung
- Deployment-Logs werden in der `deployments`-Tabelle gespeichert

### Verlauf
- Kombiniert: Stände + Veröffentlichungsstände + Deployments + Fehler
- Dargestellt als chronologische Timeline
- Jeder Eintrag hat einen Typ, Zeitstempel und eine kurze Beschreibung

---

## Funktionstest (Smoke Check)

### V1: Einfacher HTTP-Check
1. Nach dem Deployment: HTTP GET auf `http://[server-ip]:[port]/`
2. Erwartung: HTTP 2xx innerhalb von 30 Sekunden
3. Bei Timeout: "Deine App antwortet nicht. Möglicherweise startet sie noch." + Retry-Button
4. Bei Fehler (5xx): "Deine App ist erreichbar, meldet aber ein Problem." + Protokoll-Link

### Später (V2): Erweiterte Checks
- Custom-URLs prüfen
- Response-Body-Prüfung
- Mehrere Endpunkte

---

## Export / Offenheit

### ZIP-Export
- `git archive HEAD` → ZIP-Datei
- Enthält alle Dateien des aktuellen Stands
- Enthält KEINE Git-History, KEINE Secrets
- Kann jederzeit heruntergeladen werden

### Git-Clone (V1.5)
- Optional: Git-Clone-URL für Nutzer, die Git können
- Vollständiges Repo mit History
- Nur für den Nutzer selbst (nicht öffentlich in V1)

### Kein Lock-in
- Standard Node.js/HTML-Projekte
- Keine Solo-Vibe-spezifischen Konfigurationsdateien im Projekt
- Der Code auf dem Server ist normaler Code — PM2 und Nginx sind Standard-Tools
- Wenn Solo-Vibe verschwindet, läuft der Server weiter

---

## Infrastruktur (Solo-Vibe selbst)

### MVP-Deployment
- Ein einzelner Server (z.B. Hetzner CPX31: 4 vCPU, 8 GB RAM)
- PostgreSQL auf dem gleichen Server (oder managed: Supabase, Neon)
- Redis auf dem gleichen Server
- Nginx als Reverse Proxy
- Let's Encrypt für SSL
- Tägliche Backups der DB und Git-Repos

### Skalierung (später)
- API-Server horizontal skalierbar (stateless)
- Git-Repos auf Object Storage (S3) oder NFS
- Deployment-Jobs über Message Queue verteilt
- CDN für Frontend
