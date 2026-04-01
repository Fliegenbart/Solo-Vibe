# Solo-Vibe

**The open workbench that safely stores your AI-generated code and deploys it to your own server.**

No Git. No lock-in. No developer skills required.

<!-- ![Solo-Vibe Demo](media/demo-preview.gif) -->
<!-- Demo GIF coming soon. See docs/demo.md for the planned walkthrough. -->

---

## Why this exists

1. **AI tools generate code, but they don't give it a home.** Your prototype lives in a chat window, a ZIP download, or a platform that charges credits to let you keep it.
2. **The tools that could help require developer skills.** GitHub needs Git. Vercel needs a CLI. Railway needs Docker. None of them are built for the people actually building with AI.
3. **Nobody solves the last mile.** Going from "I have working code" to "it's live on the internet, on my server, and I can roll back if something breaks" is still unreasonably hard.

## Who this is for

- Solo builders shipping their first AI-generated app
- Non-technical founders validating an MVP
- Creatives building tools and websites with ChatGPT, Claude, Cursor, or Lovable
- Tinkerers who want to experiment and publish without learning infrastructure

**Not for** (right now): developer teams with established workflows, enterprise customers, or people who need an AI code editor.

## What Solo-Vibe does

Upload your AI-generated code. Store every version safely. Connect your own server. Go live with one click. Roll back in seconds if something breaks.

That's it. No editor, no AI, no hosting platform. Just the bridge between "I have code" and "it's on the internet."

## What Solo-Vibe is not

| Solo-Vibe is not... | Use instead |
|---|---|
| A code editor | Cursor, VS Code |
| An AI coding tool | ChatGPT, Claude, Lovable |
| A hosting provider | Your own VPS (Hetzner, DigitalOcean) |
| A GitHub replacement | GitHub (if you know Git) |

## How it works

```
1. Upload        Drop your ZIP or folder into Solo-Vibe
                  ↓
2. Save           Every version is stored — go back anytime
                  ↓
3. Connect        Link your own VPS with a guided setup wizard
                  ↓
4. Go live        One click — code transferred, app started, health checked
                  ↓
5. Roll back      Something broke? Previous version restored in seconds
```

## Why not just use...

| | Solo-Vibe | GitHub | Lovable / Bolt | Replit | Vercel |
|---|---|---|---|---|---|
| No developer skills needed | Yes | No | Yes | Partial | No |
| Deploy to your own server | Yes | No | No | No | No |
| No lock-in | Yes | Yes | No | No | Partial |
| Versioning + rollback | Yes | Yes (Git) | Limited | Limited | Yes (Git) |
| Simple deployment | Yes | No | Platform-bound | Platform-bound | CLI required |

**Solo-Vibe complements AI coding tools.** Build in Lovable. Ship with Solo-Vibe.

## Current MVP scope

V1 does one thing well: accept AI-generated code, store it safely, deploy it to your server.

**Supported:**
- Static websites (HTML/CSS/JS)
- Node.js web apps
- Ubuntu 22.04+ / Debian 12+ servers via SSH
- Versioning, rollback, secrets, logs, health checks, preview, ZIP export

**Not supported in V1:** code editor, AI features, team collaboration, Docker, Python, automatic SSL, database management, multiple servers per project.

See [docs/mvp-scope.md](docs/mvp-scope.md) for the full scope and explicit non-goals.

## Current limitations

This is early-stage software. Be aware:

- **No production security audit yet.** The architecture is designed for security, but has not been independently reviewed.
- **SSH setup requires a VPS.** You need a server with SSH access. The wizard helps, but it's still a step.
- **Only npm for Node.js.** Yarn and pnpm are not supported in V1.
- **No automatic SSL.** V1 deploys over HTTP. SSL setup (via Certbot) is your responsibility for now.
- **No database management.** Solo-Vibe deploys code, not databases.

We'd rather be honest about what's missing than pretend it's ready. See [docs/security.md](docs/security.md) for the full security model.

## Security and trust

Solo-Vibe touches your code, your secrets, and your server. We take that seriously:

- **Secrets** are encrypted at rest (AES-256-GCM) and never logged
- **SSH keys** are stored encrypted, never exposed in the UI
- **Deployments** run as a restricted user, not root
- **Your code** is standard code in standard formats — no proprietary wrappers
- **Export** is always available — you can leave anytime

See [SECURITY.md](SECURITY.md) for responsible disclosure and [docs/security.md](docs/security.md) for the detailed security model.

## Project status

Solo-Vibe is in **active development** toward a closed beta.

- Product strategy and architecture: complete
- Technical implementation: in progress
- Landing page: [solo-vibe.vercel.app](https://solo-vibe.vercel.app)

## Documentation

| Document | What it covers |
|---|---|
| [Product Overview](docs/product-overview.md) | Problem, audience, principles, positioning |
| [MVP Scope](docs/mvp-scope.md) | What's in V1, what's not, and why |
| [Architecture](docs/architecture.md) | Tech stack, data model, deployment engine |
| [Security](docs/security.md) | Security model, threat model, limitations |
| [Roadmap](docs/roadmap.md) | Now / Next / Later / Maybe Never |
| [Demo](docs/demo.md) | Canonical demo scenario and video script |
| [Language System](docs/language-system.md) | Product vocabulary and tone |

## Contributing and feedback

Solo-Vibe is not yet accepting code contributions, but feedback is welcome.

- **Found a problem?** [Open an issue](../../issues/new/choose)
- **Have an idea?** [Start a discussion](../../issues/new?template=feature_request.md)
- **Want early access?** Star the repo and watch for updates

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to give useful feedback.

---

**Solo-Vibe** — Your AI code deserves a home.
