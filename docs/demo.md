# Demo

## Canonical demo scenario

A solo builder exports a ZIP from an AI coding tool, uploads it into Solo-Vibe, connects a VPS, previews it, deploys it, sees a successful health check, then rolls back to an earlier version.

This scenario covers the entire core loop in under 90 seconds.

## Step-by-step walkthrough

### Step 1: Export from AI tool
**What happens:** User downloads a ZIP from Lovable / Cursor / ChatGPT.
**What the viewer understands:** Solo-Vibe starts where AI coding tools end.
**Asset needed:** `media/demo-01-export.png` — Screenshot of ZIP download from an AI tool.

### Step 2: Upload into Solo-Vibe
**What happens:** User drags the ZIP into Solo-Vibe. Project is created automatically. First snapshot saved.
**What the viewer understands:** Getting code into Solo-Vibe is instant. No setup, no config.
**Asset needed:** `media/demo-02-upload.gif` — Drag-and-drop animation, project appears.

### Step 3: Preview
**What happens:** User clicks "Preview" and sees their app running.
**What the viewer understands:** You can see what you're about to deploy. No surprises.
**Asset needed:** `media/demo-03-preview.png` — Split view: Solo-Vibe UI + preview pane.

### Step 4: Connect server
**What happens:** User enters server IP. Solo-Vibe tests the connection, detects OS, installs required software.
**What the viewer understands:** The SSH wizard makes server setup guided and safe. No terminal needed.
**Asset needed:** `media/demo-04-connect.gif` — Server wizard flow, connection test, green checkmark.

### Step 5: Go live
**What happens:** User clicks "Go live." Progress indicator shows: transferring → building → starting → health check → live.
**What the viewer understands:** One click. Real deployment. Health-checked.
**Asset needed:** `media/demo-05-deploy.gif` — Deploy progress animation, ending with "Your project is live."

### Step 6: See it running
**What happens:** User clicks the live URL. The app is running on their own server.
**What the viewer understands:** This is real. On your server. Not a platform preview.
**Asset needed:** `media/demo-06-live.png` — Browser showing the running app with the server URL visible.

### Step 7: Roll back
**What happens:** User opens history, selects a previous release, clicks "Restore this version." The previous version goes live.
**What the viewer understands:** Every version is saved. Rolling back is instant and safe.
**Asset needed:** `media/demo-07-rollback.gif` — History view, click restore, success confirmation.

## Why this matters

Most AI builders can create a working prototype in minutes. But getting it from "it works on my screen" to "it's live on the internet" takes hours of setup, terminal commands, and infrastructure knowledge that has nothing to do with the idea itself.

Solo-Vibe eliminates that gap. The demo shows the complete journey — from ZIP to live — in under 2 minutes, with zero terminal commands.

---

## Video scripts

### Full demo (90 seconds)

```
[Screen: AI coding tool with a finished project]

VOICE: You built something with AI. A website. A tool. An MVP.
       Now you want it on the internet. On your server. Under your control.

[Screen: Drag ZIP into Solo-Vibe]

VOICE: Drop your project into Solo-Vibe.
       Every version is saved automatically.

[Screen: Preview pane opens]

VOICE: Preview it first. See exactly what you're about to deploy.

[Screen: Server wizard — enter IP, green checkmarks]

VOICE: Connect your server. Solo-Vibe handles the setup.

[Screen: "Go live" button → progress animation → "Your project is live"]

VOICE: One click. Your code is on your server.
       Health-checked. Running. Yours.

[Screen: Open browser, app is running at server URL]

VOICE: That's it. Live on the internet. On a server you own.

[Screen: History view, click "Restore" on previous version]

VOICE: Something broke? Roll back to any previous version. Instantly.

[Screen: Solo-Vibe logo + tagline]

VOICE: Solo-Vibe. Your AI code deserves a home.
       No Git. No lock-in. No developer skills required.
```

### Teaser (30 seconds)

```
[Screen: ZIP file being dropped into Solo-Vibe]

VOICE: Built something with AI?

[Screen: "Go live" → progress → success]

VOICE: Deploy it to your own server. One click.

[Screen: History view → rollback]

VOICE: Roll back anytime. Every version saved.

[Screen: Logo + tagline]

VOICE: Solo-Vibe. From AI code to the internet.
       No Git. No lock-in.
```

### GitHub social preview (10 seconds / static)

```
[Visual: Split frame]
Left:  ZIP file icon labeled "AI-generated code"
Right: Browser window showing a live website

Center: Arrow connecting left to right

Bottom: "Solo-Vibe — Your AI code deserves a home."
```

**Asset needed:** `media/social-preview.png` — 1280x640px, this composition.

---

## Asset file naming

All demo assets follow this convention:

```
media/
├── demo-01-export.png
├── demo-02-upload.gif
├── demo-03-preview.png
├── demo-04-connect.gif
├── demo-05-deploy.gif
├── demo-06-live.png
├── demo-07-rollback.gif
├── demo-preview.gif          ← composite GIF for README hero
├── social-preview.png         ← GitHub social preview (1280x640)
└── README.md                  ← asset conventions
```
