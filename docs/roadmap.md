# Roadmap

## Now (V1 — Closed Beta)

The core loop. Nothing else.

- Upload AI-generated code (ZIP, folder, URL import)
- Save snapshots with optional notes
- Mark releases
- Connect a VPS via guided SSH wizard
- Deploy with one click
- Roll back to any previous release
- View logs and health check results
- Manage secrets (environment variables)
- Preview before deploying
- Export project as ZIP at any time

**Supported:** Static websites, Node.js web apps, Ubuntu/Debian servers.

See [mvp-scope.md](mvp-scope.md) for the full scope and explicit non-goals.

## Next (V1.5 — Trust & Usability)

Ship after V1 validates that the core loop works and users want it.

| Feature | Why it matters | What must be true first |
|---|---|---|
| **Automatic SSL** (Let's Encrypt) | HTTP-only is a real barrier for production use | Server wizard must support domain configuration reliably |
| **Basic secret scanning** | 196/198 AI-generated apps have security flaws; this is table stakes | Need a pattern library for common API key formats |
| **Project sharing** (public link) | Users want to show what they built | Must scan for exposed secrets before making code public |
| **Python support** | Second most common runtime for AI-generated code | Need venv + gunicorn deployment path, tested on target servers |
| **GitHub import** (public repos) | Many users already have code on GitHub | Simple clone + convert to project. Private repos need OAuth. |
| **Improved error messages** | V1 will surface errors that are hard to explain | Catalog the 20 most common failures and write human explanations |

## Later (V2 — Expand the Wedge)

Ship after product-market fit signals are clear: users deploy repeatedly, retention is measurable, and the core loop is stable.

| Feature | Why it matters | What must be true first |
|---|---|---|
| **AI assistant for deployment debugging** | "Why did my deploy fail?" is the hardest question for non-technical users | Need a corpus of real deployment failures + successful resolutions |
| **Remix / forking** | Let users build on each other's work | Need public project pages, user profiles, attribution system |
| **Managed hosting option** | Some users don't want to manage a server | Must not compromise the "your server" positioning. Offered as convenience, not default. |
| **Multiple environments** (preview + production) | Serious projects need staging | One project = one server model must be extended |
| **Docker support** | For apps that need custom system dependencies | Adds significant complexity. Only if demand is proven. |
| **Public API** | Let external tools integrate with Solo-Vibe | API-first architecture exists internally; needs auth, rate limiting, docs |

## Maybe never

These are frequently requested features that look attractive but would dilute Solo-Vibe's identity.

| Feature | Why it's tempting | Why it might never ship |
|---|---|---|
| **Code editor** | "Just let me fix one line" | The moment Solo-Vibe has an editor, it competes with Cursor and Lovable instead of complementing them. The wedge is post-build, not build. |
| **AI code generation** | Seems like the obvious next step | AI coding tools evolve quarterly. Building this means chasing a moving target. Our value is stability, not generation. |
| **Team collaboration** | "Can my co-founder see this?" | "Solo" is in the name. Multi-user adds auth complexity, permissions, and UI overhead that dilutes the single-user experience. If we add teams, it should be a separate product. |
| **Full CI/CD pipeline** | Power users will ask for it | This is what GitHub Actions, Vercel, and Railway already do. Building it means competing on infra, not UX. |
| **Database management** | Users need databases | Database provisioning and management is a different product entirely (Supabase, PlanetScale). Solo-Vibe deploys code, not infrastructure. |
| **Marketplace / public gallery** | Community! Discovery! | Community features need a community first. Shipping them empty looks worse than not having them. Build community through quality, not features. |
| **Mobile app** | "I want to check my deploy from my phone" | The web app is responsive. A native app is maintenance overhead with minimal value for the deploy-then-check-once workflow. |

## Decision principle

Every feature must pass this test: **Does this make the core loop better, or does it add a new loop?**

Solo-Vibe's core loop: upload → save → connect → deploy → roll back.

If a feature improves one of those steps, it probably belongs. If it adds a separate workflow, it probably doesn't — or it belongs in a different product.
