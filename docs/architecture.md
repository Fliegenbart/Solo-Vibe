# Architecture

## System overview

```
┌─────────────┐     HTTPS      ┌──────────────┐     SSH      ┌──────────────┐
│   Browser    │ ◄────────────► │  Solo-Vibe    │ ──────────► │  User's      │
│   (Web App)  │                │  Backend      │             │  Server      │
└─────────────┘                └──────┬───────┘             └──────────────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │  PostgreSQL   │
                               │  + Git Repos  │
                               │  (Filesystem) │
                               └──────────────┘
```

Solo-Vibe is a web application. The user interacts through a browser. The backend stores projects as Git repositories (invisible to the user) and deploys to the user's server via SSH.

## Core objects

Solo-Vibe has 6 core entities. Each has a user-facing meaning and a technical implementation.

| User concept | Internal implementation | Description |
|---|---|---|
| **Project** | Git repository + DB metadata | Everything belonging to one idea: code, versions, settings |
| **Snapshot** | Git commit | A saved state of the project at a point in time |
| **Release** | Git tag on a commit | A snapshot marked as stable / ready to deploy |
| **Live version** | Last successfully deployed tag | What's currently running on the user's server |
| **Server connection** | SSH credentials + server profile | The bridge between Solo-Vibe and the user's VPS |
| **History** | Git log + deployment log + event log | Unified timeline of everything that happened |

```
Project
├── Snapshot (many)
│   └── Release (marked snapshots)
│       └── Live version (the currently deployed release)
├── Server connection (one per project, optional)
└── History (aggregated from all events)
```

## Tech stack

| Component | Technology | Rationale |
|---|---|---|
| API server | Node.js + Hono (or Fastify) | Fast, lightweight, TypeScript-native |
| Database | PostgreSQL | Reliable, JSON support for flexible metadata |
| Git operations | isomorphic-git or git CLI | Git as versioning engine, never as user-facing feature |
| SSH client | ssh2 (Node.js) | Server connection, deployment, log streaming |
| File storage | Filesystem (Git repos on disk) | Simple, fast, exportable. Object storage (S3) later. |
| Auth | Lucia or Better Auth | Session-based, simple, self-hosted |
| Frontend | SvelteKit or Next.js | SSR, fast, good DX |
| Job queue | BullMQ + Redis | Async jobs: deploy, server setup |

## API structure

```
Projects
  POST   /api/projects                    Create project
  GET    /api/projects                    List user's projects
  GET    /api/projects/:id                Project detail
  DELETE /api/projects/:id                Archive project
  POST   /api/projects/:id/upload         Upload code
  GET    /api/projects/:id/download       ZIP export

Snapshots
  POST   /api/projects/:id/snapshots      Save snapshot
  GET    /api/projects/:id/snapshots      List snapshots
  GET    /api/projects/:id/snapshots/:sid  Snapshot detail

Releases
  POST   /api/projects/:id/releases       Mark release
  GET    /api/projects/:id/releases       List releases

Deployment
  POST   /api/projects/:id/deploy         Deploy (go live)
  POST   /api/projects/:id/rollback       Roll back
  GET    /api/projects/:id/deploy/status  Deploy status (SSE/WebSocket)

Server
  POST   /api/servers                     Connect server
  GET    /api/servers/:id                 Server details
  POST   /api/servers/:id/test            Test connection
  POST   /api/servers/:id/setup           Run server setup
  DELETE /api/servers/:id                 Disconnect server

Secrets & logs
  GET    /api/projects/:id/secrets        List secrets (values masked)
  PUT    /api/projects/:id/secrets        Update secrets
  GET    /api/projects/:id/logs           Stream server logs (SSE)
  GET    /api/projects/:id/timeline       Unified history
```

## Data model

```sql
users
  id            UUID PRIMARY KEY
  email         TEXT UNIQUE NOT NULL
  name          TEXT
  created_at    TIMESTAMPTZ

projects
  id            UUID PRIMARY KEY
  user_id       UUID REFERENCES users
  name          TEXT NOT NULL
  description   TEXT
  runtime       TEXT            -- 'static' | 'nodejs'
  repo_path     TEXT            -- path to Git repo on filesystem
  server_id     UUID REFERENCES servers (NULLABLE)
  is_public     BOOLEAN DEFAULT false
  archived_at   TIMESTAMPTZ
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ

snapshots
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  commit_hash   TEXT NOT NULL
  note          TEXT            -- optional user note
  created_at    TIMESTAMPTZ

releases
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  snapshot_id   UUID REFERENCES snapshots
  tag_name      TEXT NOT NULL   -- 'v1', 'v2', or user-defined
  created_at    TIMESTAMPTZ

deployments
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  release_id    UUID REFERENCES releases
  server_id     UUID REFERENCES servers
  status        TEXT            -- pending | transferring | building | starting | checking | live | failed
  error_message TEXT
  started_at    TIMESTAMPTZ
  completed_at  TIMESTAMPTZ

servers
  id            UUID PRIMARY KEY
  user_id       UUID REFERENCES users
  name          TEXT
  host          TEXT NOT NULL
  port          INTEGER DEFAULT 22
  username      TEXT DEFAULT 'solovibe'
  ssh_key_id    UUID
  os_info       JSONB           -- {distro, version, arch}
  setup_status  TEXT            -- pending | ready | error
  target_dir    TEXT            -- e.g. '/opt/solovibe'
  created_at    TIMESTAMPTZ

secrets
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  key           TEXT NOT NULL
  value_enc     BYTEA NOT NULL  -- encrypted (AES-256-GCM)
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ

events
  id            UUID PRIMARY KEY
  project_id    UUID REFERENCES projects
  type          TEXT            -- snapshot | release | deploy | rollback | error | server_setup
  reference_id  UUID
  message       TEXT
  created_at    TIMESTAMPTZ
```

## Versioning logic

Every project is internally a Git repository. The user never sees this.

**Save snapshot:** Files are written to the Git working directory, then `git add . && git commit`. The commit hash is stored in the `snapshots` table.

**Mark release:** `git tag v[n] [commit-hash]`. The tag is stored in the `releases` table. Only tagged commits can be deployed.

**Restore snapshot:** `git checkout [commit-hash]`, then a new commit with the old state. No destructive reset — history stays intact.

**Storage:** Repos live at `/data/repos/[user-id]/[project-id]/`. Daily backups. Long-term: migration to S3-compatible storage.

## Deployment engine

```
1. Pre-checks
   ├── Server connection active?
   ├── Release exists?
   └── Secrets complete?

2. Transfer
   ├── git archive [tag] → tar
   ├── rsync via SSH to server
   └── Files placed in /opt/solovibe/[project]/releases/[tag]/

3. Build
   ├── Static: nothing
   └── Node.js: npm ci --production

4. Activate
   ├── Symlink: /opt/solovibe/[project]/current → releases/[tag]/
   ├── Static: Nginx config reload
   └── Node.js: PM2 restart/start

5. Inject secrets
   └── .env file generated from encrypted secrets, written to server

6. Health check
   ├── HTTP GET to http://[server-ip]:[port]/
   ├── 2xx within 30s → success
   └── Timeout or error → offer rollback

7. Update status
   └── Deployment record → 'live' or 'failed'
```

### Rollback

1. Switch symlink to previous release: `current → releases/[previous-tag]/`
2. PM2 restart or Nginx reload
3. Health check
4. No rebuild needed — previous release files are still on the server

### Server directory structure

```
/opt/solovibe/[project]/
├── releases/
│   ├── v1/
│   ├── v2/
│   └── v3/
├── current → releases/v3  (symlink)
├── shared/
│   └── .env
└── logs/
```

## Secrets handling

- Encrypted with AES-256-GCM in the database
- Encryption key stored as environment variable on Solo-Vibe server (not in DB)
- Decrypted only during deploy, written as `.env` to user's server
- Values masked in UI (last 4 characters visible)
- Never included in logs or error messages
- Not included in ZIP export (with warning)

## Logs

**Server logs:** Streamed via SSH (`pm2 logs --raw` or `journalctl -f`), delivered to frontend via SSE. Not permanently stored on Solo-Vibe server (privacy).

**Deployment logs:** Each step logged. Errors get both technical detail (stored) and human-readable translation (displayed).

**History:** Unified timeline combining snapshots, releases, deployments, and errors.

## Health checks (V1)

Simple HTTP check after deployment:
- `GET http://[server-ip]:[port]/`
- Expect 2xx within 30 seconds
- On timeout: "Your app isn't responding. It may still be starting." + retry button
- On 5xx: "Your app is reachable but reports a problem." + link to logs

## Export and openness

- **ZIP export:** `git archive HEAD` → ZIP. Contains all files of current snapshot. No Git history, no secrets. Available anytime.
- **No lock-in:** Standard project structures. No Solo-Vibe config files in the project. PM2 and Nginx are standard tools. If Solo-Vibe disappears, the server keeps running.
- **Git clone (V1.5):** Optional clone URL for users who know Git.

## Solo-Vibe infrastructure (MVP)

- Single server (e.g. Hetzner CPX31: 4 vCPU, 8 GB RAM)
- PostgreSQL on same server (or managed: Supabase, Neon)
- Redis on same server
- Nginx reverse proxy + Let's Encrypt SSL
- Daily backups of DB and Git repos

**Later:** Horizontal API scaling, Git repos on object storage, deployment jobs distributed via message queue, CDN for frontend.
