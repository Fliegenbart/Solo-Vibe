# MVP Scope

## Philosophy

V1 does one thing well: accept AI-generated code, store it safely, and deploy it to the user's own server. Everything else is distraction.

## What's in V1

| Feature | Why it's essential |
|---|---|
| **Create project** (upload ZIP/folder/URL) | Without this, there's no product |
| **Save snapshots** (manual) | Versioning is the core promise |
| **View history** | Users must see what happened |
| **Mark a release** | Separates "everything I save" from "this is ready" |
| **Connect server** (guided SSH wizard) | The deploy target. Wizard sets up the server. |
| **Go live** (deploy) | Core value |
| **Roll back** | Safety net. Without it, going live is too risky. |
| **Health check** | Automatic check that the app works after deploy |
| **Secrets** (environment variables) | Almost every app needs them. Without this, deploy is broken. |
| **View logs** | When something fails, users need to see why |
| **Download project** (ZIP export) | The openness promise. Must work from day one. |
| **Preview** | Users must see what they're deploying before they do it |

### Supported project types

| Type | How it's deployed |
|---|---|
| Static website (HTML/CSS/JS) | rsync to Nginx |
| Node.js web app (Node 18+) | rsync, npm install, PM2 |

No other runtimes in V1.

### Supported servers

- Ubuntu 22.04 LTS or newer
- Debian 12 or newer
- Minimum 1 GB RAM, 10 GB disk
- SSH access with root or sudo

## What's NOT in V1

| Feature | Why not |
|---|---|
| Code editor | Solo-Vibe is not an editor. Users edit code in Cursor, VS Code, Lovable. |
| AI features | No AI chat, no AI fix, no AI deploy-debug. V1 is where AI-generated code arrives, not where it's created. |
| Team collaboration | Solo. No shared write access. No co-editing. |
| Remix / forking | Requires public project gallery, user profiles, social layer. |
| Domain management | Users configure DNS themselves. |
| Automatic SSL | Too complex for V1. Users set up Certbot manually. |
| Database management | On the user's server. Solo-Vibe doesn't touch it. |
| Multiple servers per project | One project = one server. |
| Public project gallery | Requires moderation, social features, discovery. |
| Billing | V1 is free (closed beta). |
| Webhook integrations | Manual deploy is enough for V1. |
| Auto-deploy on save | Users decide consciously when to go live. |
| Yarn / pnpm | Only npm in V1. |
| Python / Go / other runtimes | Only static + Node.js. |
| Docker containers | Not in V1. |

## What we refuse to build in V1

These aren't "nice to have later." They would actively harm the product if added now:

1. **A code editor.** The moment Solo-Vibe has an editor, it competes with Cursor and Lovable instead of complementing them.
2. **AI features.** AI coding tools evolve quarterly. Building AI into V1 means chasing a moving target instead of nailing the post-build workflow.
3. **Team features.** The word "Solo" is in the name. Multi-user adds auth complexity, permission models, and UI overhead that dilutes the single-user experience.
4. **Managed hosting.** Offering our own hosting creates the lock-in we're positioning against. The user's server is the point.
5. **A marketplace or gallery.** Community features need a community first. Shipping them empty looks worse than not having them.

## Decision rule: does this belong in V1?

When a new idea appears, apply this filter:

```
1. Does it serve the core loop?
   (upload → save → connect → deploy → roll back)
   → No? It's not V1.

2. Can V1 work without it?
   → Yes? It's not V1.

3. Does it add a new surface area we'd need to support?
   (new runtime, new auth flow, new UI section)
   → Yes? It's not V1.

4. Would a solo builder miss it in their first deploy?
   → No? It's not V1.
```

If a feature passes all four questions, it might belong in V1. If it fails any one, it goes to the roadmap.

## Current limitations

These are known gaps we accept for now:

- **No production security audit.** Architecture is security-conscious, but unaudited.
- **SSH wizard untested at scale.** Different server configs will surface edge cases.
- **Build errors are hard to translate.** Node.js build failures are technical. Solo-Vibe tries to explain them, but some will be opaque.
- **No SSL automation.** HTTP only in V1. Users need to set up HTTPS themselves.
- **No monitoring.** Solo-Vibe doesn't watch servers between deploys.
