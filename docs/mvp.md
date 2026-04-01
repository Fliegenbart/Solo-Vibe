# Solo-Vibe: MVP-Scope & Informationsarchitektur

## MVP-Philosophie

V1 macht eine Sache hervorragend: AI-generierten Code sicher aufbewahren und auf einen eigenen Server bringen. Alles andere ist Ablenkung.

---

## Unbedingt in V1

### Kernfunktionen

| Funktion | Warum unverzichtbar |
|----------|---------------------|
| **Projekt erstellen** (Upload/ZIP/URL) | Ohne das gibt es kein Produkt |
| **Stände speichern** (manuell) | Versionierung ist Kern des Werteversprechens |
| **Verlauf ansehen** | Nutzer muss sehen, was passiert ist |
| **Veröffentlichungsstand markieren** | Trennung: "alles was ich speichere" vs. "das hier ist bereit" |
| **Server verbinden** (SSH-Wizard) | Deploy-Target. Der Wizard muss den Server einrichten. |
| **Live schalten** (Deploy) | Kernwert. |
| **Zurücksetzen** (Rollback) | Sicherheitsnetz. Ohne das ist Live-Schalten zu riskant. |
| **Funktionstest** (Health Check) | Automatische Prüfung, ob die App nach Deploy läuft |
| **Geheime Einstellungen** (Env Vars) | Fast jede App braucht Secrets. Ohne das ist Deploy kaputt. |
| **Protokoll ansehen** (Logs) | Wenn etwas nicht funktioniert, muss der Nutzer sehen, warum |
| **Projekt herunterladen** (ZIP-Export) | Offenheitsversprechen. Muss ab Tag 1 funktionieren. |
| **Vorschau** (lokale Preview-URL) | Nutzer muss sehen, was er deployen wird, bevor er es tut |

### Unterstützte Projekttypen (V1)

| Typ | Runtime | Deploy-Methode |
|-----|---------|----------------|
| **Statische Website** | HTML/CSS/JS | rsync → Nginx |
| **Node.js Web-App** | Node.js 18+ | rsync → npm install → PM2 |

Keine weiteren Runtimes in V1. Keine Python-Apps. Keine Docker-Container. Keine Datenbanken.

### Unterstützte Server (V1)

- Ubuntu 22.04 LTS oder neuer
- Debian 12 oder neuer
- Mindestens 1 GB RAM, 10 GB Disk
- SSH-Zugang mit Root oder sudo

---

## Bewusst NICHT in V1

| Feature | Warum nicht |
|---------|-------------|
| **Eigener Code-Editor** | Solo-Vibe ist kein Editor. Nutzer bearbeiten Code extern (Cursor, VS Code, Lovable). |
| **AI-Funktionen** | Kein AI-Chat, kein AI-Fix, kein AI-Deploy-Debug. Das kommt in V2. Solo-Vibe ist in V1 der Ort wo AI-generierter Code hinkommt, nicht wo er entsteht. |
| **Team-Kollaboration** | Solo. Kein Sharing von Schreibrechten. Kein gemeinsames Arbeiten. |
| **Remix / Forking** | Erfordert öffentliche Projektgalerie, Nutzerprofile, Social-Layer. V1.5. |
| **Domain-Verwaltung** | Nutzer konfiguriert DNS selbst. Solo-Vibe verwaltet keine Domains. |
| **SSL/HTTPS-Setup** | Zu komplex und fehleranfällig. V1 deployt auf HTTP. SSL per Anleitung (Certbot). V1.5: automatisches SSL. |
| **Datenbank-Management** | Auf dem Server des Nutzers. Solo-Vibe fasst sie nicht an. |
| **Mehrere Server pro Projekt** | Ein Projekt = ein Server. Staging/Production-Trennung ist V2. |
| **Öffentliche Projektgalerie** | Erfordert Moderation, Social-Features, Discover-Mechanik. V1.5. |
| **Billing / Monetarisierung** | V1 ist kostenlos (Closed Beta / Early Access). Monetarisierung ist V2. |
| **Mobile App** | Web-App reicht. Responsive, aber kein nativer Client. |
| **Webhook-Integrationen** | Kein Bedarf in V1. Manuelles Deploy reicht. |
| **Automatisches Deploy** | Kein Auto-Deploy bei Stand-Speicherung. Nutzer entscheidet bewusst. |

---

## V1.5 (nach Validierung)

| Feature | Voraussetzung |
|---------|---------------|
| **Automatisches SSL** (Let's Encrypt) | Server-Wizard muss Domain-Konfiguration unterstützen |
| **Projekt teilen** (öffentlicher Link) | Secrets-Scan, öffentliche Projektseiten |
| **Remix** | Öffentliche Projekte, Nutzerprofile |
| **Python-Support** | Zweite Runtime (venv, gunicorn) |
| **GitHub-Import** (private Repos) | OAuth-Integration |
| **Einfacher Secrets-Scan** | Warnung, wenn API-Keys im Code stehen |

## V2 (nach Product-Market-Fit)

| Feature | Richtung |
|---------|----------|
| **AI-Assistent** | "Was ist schiefgegangen?" — AI erklärt Fehler, schlägt Fixes vor |
| **Team-Features** | Geteilte Projekte, Kommentare, einfache Rechte |
| **Managed Hosting** | Optional: Solo-Vibe hostet für dich (Monetarisierungs-Hebel) |
| **Domain-Verwaltung** | Custom Domains, DNS-Konfiguration, SSL |
| **Mehrere Umgebungen** | Vorschau-Server + Live-Server |
| **Docker-Support** | Für komplexere Apps |
| **API** | Externe Tools können mit Solo-Vibe interagieren |
| **Öffentliche Galerie** | Discover, Featured Projects, Community |

---

## Informationsarchitektur: Screens

### Screen 1: Projektübersicht (Dashboard)

**Hauptziel:** Alle Projekte auf einen Blick. Schneller Einstieg.

**Elemente:**
- Liste aller Projekte (Name, Beschreibung, letzter Stand, Live-Status)
- Visueller Indikator: "Live" (grün), "Nicht veröffentlicht" (neutral), "Problem" (rot)
- Schnellaktionen pro Projekt: Öffnen, Live schalten, Herunterladen

**Haupt-CTA:** "Neues Projekt"

**Nicht auf diesem Screen:**
- Keine Server-Verwaltung (eigener Screen)
- Keine Detail-Ansichten
- Keine Verlauf-Informationen

---

### Screen 2: Projekt-Detail

**Hauptziel:** Alles zu einem Projekt. Der zentrale Arbeitsbereich.

**Elemente:**
- Projektname und Beschreibung (editierbar)
- Aktueller Stand: Dateien und Ordnerstruktur (read-only Datei-Browser)
- Status-Leiste: "Letzter Stand: vor 3 Stunden" / "Live-Version: v4 seit gestern"
- Schnellaktionen: Stand speichern, Live schalten, Vorschau

**Haupt-CTA:** "Stand speichern" (wenn Änderungen) oder "Live schalten" (wenn neuer Veröffentlichungsstand bereit)

**Nicht auf diesem Screen:**
- Kein Code-Editor
- Keine Server-Details (eigener Bereich)
- Keine vollständigen Logs

---

### Screen 3: Verlauf & Stände

**Hauptziel:** Chronologische Übersicht aller Stände und Ereignisse.

**Elemente:**
- Timeline: Stände, Veröffentlichungsstände, Deployments, Rollbacks
- Jeder Eintrag: Zeitstempel, optionale Notiz, Typ (Stand/Veröffentlichung/Deploy)
- Veröffentlichungsstände visuell hervorgehoben
- Bei Deployments: Erfolg/Fehler-Status

**Haupt-CTA:** "Diesen Stand wiederherstellen" / "Diesen Stand live schalten"

**Nicht auf diesem Screen:**
- Keine Datei-Diffs (zu technisch für V1, im "Mehr"-Menü versteckt)
- Keine vollständigen Log-Ausgaben

---

### Screen 4: Live schalten (Deploy-Flow)

**Hauptziel:** Den Nutzer durch den Deploy-Prozess führen.

**Elemente:**
- Gewählter Veröffentlichungsstand (oder "aktuellen Stand jetzt markieren")
- Server-Status: verbunden/nicht verbunden
- Fortschrittsanzeige: Code übertragen → App starten → Funktionstest
- Ergebnis: Erfolg mit Link oder Fehler mit Erklärung

**Haupt-CTA:** "Jetzt live schalten"

**Nicht auf diesem Screen:**
- Keine Konfigurationsoptionen
- Keine Build-Details (nur bei Fehler als "Details anzeigen")

---

### Screen 5: Protokoll & Fehlerbehebung

**Hauptziel:** Verstehen, was auf dem Server passiert. Fehler diagnostizieren.

**Elemente:**
- Live-Protokoll vom Server (gefiltert, lesbar — keine rohen Logs)
- Letzte Deployments mit Status
- Schnelle Aktionen: "Zurücksetzen auf [letzten funktionierenden Stand]"
- Bei Fehlern: menschenlesbare Erklärung + Handlungsempfehlung

**Haupt-CTA:** "Zurücksetzen" (wenn Problem erkannt)

**Nicht auf diesem Screen:**
- Keine SSH-Terminal-Ansicht
- Keine rohen Stack-Traces (nur via "Technische Details anzeigen")

---

### Screen 6: Server & Geheime Einstellungen

**Hauptziel:** Serververbindung und Secrets verwalten.

**Elemente:**
- Serververbindung: Status, IP, OS, letzte Prüfung
- Geheime Einstellungen: Key-Value-Liste (Werte maskiert, editierbar)
- Server-Wizard (wenn noch kein Server verbunden)

**Haupt-CTA:** "Server verbinden" (wenn keiner) oder "Verbindung testen"

**Nicht auf diesem Screen:**
- Keine Server-Konfigurationsdateien
- Keine direkten SSH-Befehle
- Keine Disk/RAM-Monitoring (V2)

---

## Screen-Architektur

```
┌─────────────────────────────┐
│     Projektübersicht        │ ← Einstieg
│     (Dashboard)             │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│     Projekt-Detail          │ ← Zentraler Arbeitsbereich
│                             │
│  ┌──────┬──────┬──────┐    │
│  │Dateien│Verlauf│Server│   │ ← Tabs innerhalb des Projekts
│  └──────┴──────┴──────┘    │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│     Live schalten           │ ← Modal oder eigener Flow
│     (Deploy-Wizard)         │
└─────────────────────────────┘
```

Die Struktur ist flach: Dashboard → Projekt → Tabs. Keine verschachtelten Ebenen. Maximal 2 Klicks zu jeder Information.
