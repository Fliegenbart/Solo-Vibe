# Language System

Solo-Vibe speaks the language of makers and builders, not developers and operators.

## Core rule

No Git terms, no DevOps terms, no developer jargon in the user-facing interface. The product should feel like a workshop for ideas, not a terminal.

## Vocabulary

### Terms we use

| Technical term | Solo-Vibe term | Explanation |
|---|---|---|
| Repository | **Project** | Everything belonging to one idea |
| Commit | **Save / Save a snapshot** | Capture the current state |
| Saved state / Snapshot | **Snapshot** | A saved state of the project at a point in time |
| Tag / Release | **Release** | A snapshot marked as stable and ready to deploy |
| Deploy | **Go live** | Put the code on the server so it's reachable on the internet |
| Deployment | **Going live** | The process of making something live |
| Rollback | **Roll back / Restore** | Make a previous version live again |
| Server (VPS) | **Server** | Stays "server" — universally understood |
| SSH connection | **Server connection** | The link between Solo-Vibe and your server |
| Environment variables | **Secrets** | Passwords, API keys, and settings that shouldn't be in the code |
| Logs | **Logs** | What's happening on the server — messages, errors, activity |
| Preview | **Preview** | See your project before going live |
| Build process | *(invisible)* | Happens automatically in the background |
| CI/CD pipeline | *(invisible)* | Exists internally, has no user-facing name |
| Health check | **Health check** | Automatic test that the app works after going live |
| Fork | **Remix** | Start your own version based on someone else's project (V1.5) |
| Diff | **Changes** | What changed between two snapshots |
| Version history | **History** | The timeline of all saved snapshots |
| ZIP export | **Download** | Get the project as a file on your computer |
| Upload | **Upload** | Bring code into Solo-Vibe |
| Runtime | *(invisible)* | Detected and configured internally |
| Docker | *(invisible)* | Never in the UI |
| Error (technical) | **Problem** | Something isn't working as expected |
| Stack trace | *(invisible)* | Only in expanded logs, never prominent |

### Action language

| Technical action | Solo-Vibe action |
|---|---|
| `git commit` | **Save snapshot** |
| `git push` | *(not needed — automatic)* |
| `git checkout` | **Restore snapshot** |
| `git tag` | **Mark as release** |
| SSH deploy | **Go live** |
| Rollback | **Roll back** |
| `tail -f logs` | **View logs** |

## Terms that must never appear in the UI

- Branch, merge, pull request, push, fetch, rebase, cherry-pick, stash
- HEAD, origin, remote, upstream
- CI/CD, pipeline, workflow
- Dockerfile, container, image, registry
- YAML, config file
- Terminal, CLI, command line
- stdout, stderr, daemon, process, port (use "address" instead)
- DNS (use "domain" or "web address")

## Tone

- **Direct, not technical.** Say what happened, not how.
- **Active, not passive.** "Your project is live" not "The deployment was completed successfully."
- **Short, not verbose.** One sentence beats three.
- **Encouraging when things fail.** "That didn't work. Try again or roll back to the last working version."
- **No exclamation-mark hype.** "Your project is live." not "Your project is live!!!"
- **Confident, not apologetic.** "Solo-Vibe doesn't support Python yet." not "Sorry, we unfortunately can't support Python at this time."

## Before / After examples

**Before:** "Commit erfolgreich. Push to remote completed."
**After:** "Snapshot saved."

**Before:** "Deployment failed. Check logs for details."
**After:** "Going live didn't work. Your server reported a problem. [View logs]"

**Before:** "Environment variable DATABASE_URL is not set."
**After:** "Your project needs a secret that hasn't been set yet. [Manage secrets]"

**Before:** "Rolling back to commit a3f8e2b..."
**After:** "Restoring the version from March 28, 2:23 PM..."

**Before:** "No Dockerfile found. Please configure your build process."
**After:** "Solo-Vibe detects how your project should be built automatically. If something seems wrong, [this guide can help]."

**Before:** "Error: ECONNREFUSED 142.132.x.x:22"
**After:** "Can't reach your server. Check that it's running and that port 22 is open. [Connection help]"
