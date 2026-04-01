# Product Overview

## The problem

Millions of people build software with AI. A chatbot generates code, and in 30 minutes there's a working prototype. Then the question: **now what?**

The code lives in a chat window. Or in a ZIP download. Or inside a platform that charges $25/month and reluctantly lets you export. There's no safe place to keep it. No simple way to publish it. No way back when something breaks.

The tools that exist don't solve this:

- **Lovable, Bolt, Blink** build the code — but they also own it. Credits burn on bugfixes. Export is an afterthought.
- **GitHub** is built for developer teams. Branches, pull requests, merge conflicts — that's a foreign language for someone building with AI.
- **Replit** is a cloud IDE with built-in hosting. Build there, stay there.
- **Vercel / Netlify / Railway** are deployment platforms for developers. They expect CLIs, Git repos, and build configs.

None of these answer the actual question: **How does my AI-generated code get onto the internet safely — and how do I keep control?**

## The gap

```
                    Easy to use
                         |
          Lovable/Bolt   |
          Blink/Replit   |
                         |
  Lock-in ———————————————+——————————————— Open
                         |
                         |   ← SOLO-VIBE
                         |
                    GitHub/Cursor
                    (Developer skills needed)
```

No product today is both **easy** and **open**. The easy tools are closed. The open tools require developer skills. Solo-Vibe occupies that empty quadrant.

## Who this is for

People who build software with AI without identifying as programmers.

They think in ideas and experiments. They use ChatGPT, Claude, Cursor, or Lovable to build prototypes. They want their ideas to live on the internet — not disappear in a chat history.

**Specifically:**
- Solo builders shipping their first app
- Non-technical founders validating an MVP
- Creatives building tools and websites for themselves or others
- Tinkerers who experiment and publish

**Not for (now):**
- Developer teams with established workflows
- Enterprise customers with compliance requirements
- People who need an AI code editor (that's Cursor, Lovable, etc.)

## Positioning

**Solo-Vibe is the open workbench that safely stores your AI-generated code and deploys it to your own server — no Git, no lock-in, no developer skills required.**

Solo-Vibe enters the market not as an IDE, not as an AI tool, and not as a hosting platform. But as **the missing bridge between AI-generated code and the internet.**

The wedge: *Build in Lovable. Ship with Solo-Vibe.*

## Competitive framing

Solo-Vibe is complementary to AI coding tools, not competitive.

| | Solo-Vibe | Lovable / Bolt | GitHub | Replit | Vercel |
|---|---|---|---|---|---|
| No developer skills needed | Yes | Yes | No | Partial | No |
| Deploy to your own server | Yes | No | No | No | No |
| No lock-in | Yes | No | Yes | No | Partial |
| Versioning + rollback | Yes | Limited | Yes (Git) | Limited | Yes (Git) |
| Built-in deployment | Yes | Platform-bound | No | Platform-bound | CLI required |

## Product principles

These rules govern every product decision. They are not aspirational — they are constraints.

### 1. Everything is reversible
No action is permanent. Every deployment can be rolled back. Every saved version is kept. The user never needs to fear breaking something.

### 2. Technology works, but stays invisible
Versioning, security checks, server config, build processes — all of this happens. But the user only sees what they need, when they need it. No terminal output, no config files, no stack traces.

### 3. Your code belongs to you
No lock-in. No proprietary formats. Code is exportable at any time as a standard ZIP. The export button is visible, not hidden.

### 4. One path, not ten options
For every task, there's one clear way. Not three deployment methods. Not five config screens. One way that works. Wizards instead of forms. Sensible defaults instead of empty fields.

### 5. When something goes wrong, help instead of blame
Error messages are moments to build or lose trust. No cryptic error codes. No developer jargon. Instead: what happened, what the user can do. Maximum two sentences, always with a suggested action.

### 6. Open means open
Openness is a technical property, not a marketing promise. Standard code, standard formats, the user's own server, exportable data. If Solo-Vibe disappears tomorrow, the user's server keeps running.

### 7. Simplicity has depth
Solo-Vibe feels simple — but behind the surface is real substance. When a user wants to dig deeper (logs, old versions, server details), they can. But they don't have to. Progressive disclosure: the first view is minimal, every detail has a "show more."

## Key differentiation axes

1. **Openness:** No hosting lock-in. Your code, your server, always exportable.
2. **Language:** No developer jargon in the UI. No branches, no commits, no pull requests.
3. **Focus:** One thing done well — safely publishing AI-generated code.
4. **Audience:** The first platform built explicitly for AI builders, not developers who use AI.
5. **Europe:** GDPR-aware. European infrastructure possible. No US-only cloud dependency.
