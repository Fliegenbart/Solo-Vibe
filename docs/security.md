# Security Model

Solo-Vibe touches user code, secrets, and servers. This document explains what we access, what we protect, what we don't, and what the user remains responsible for.

## What Solo-Vibe can access

| Data | Access level | Storage |
|---|---|---|
| User's project code | Full read/write | Git repos on Solo-Vibe server filesystem |
| Secrets (env vars) | Write, masked read | Encrypted in PostgreSQL (AES-256-GCM) |
| SSH credentials | Used for deployment | Encrypted in database, never displayed |
| Server OS info | Read during setup | Stored as metadata |
| Server logs | Streamed live | Not permanently stored on Solo-Vibe |
| Deployment history | Full | Stored in database |

## What Solo-Vibe should never do

- **Never expose secrets in logs, errors, or UI.** Values are masked everywhere.
- **Never store the encryption key in the database.** It lives as an environment variable.
- **Never run arbitrary commands on the user's server.** Only predefined deployment steps.
- **Never access the user's server outside of deployment and log streaming.**
- **Never include secrets in ZIP exports.**
- **Never transmit credentials over unencrypted connections.**

## Security by area

### Code storage

Projects are stored as Git repositories on the Solo-Vibe server filesystem.

**Protected:** Access is scoped to the authenticated user. Projects cannot be accessed by other users.

**Risk:** If the Solo-Vibe server is compromised, all stored code is accessible. This is the standard risk for any server-side application.

**Mitigation:** Filesystem permissions, daily encrypted backups, planned migration to encrypted-at-rest storage.

### ZIP upload

Users upload code as ZIP files. This is the primary way code enters Solo-Vibe.

**Risk:** ZIP files can contain malicious content (zip bombs, symlink attacks, oversized files).

**Mitigation (V1):**
- Maximum upload size enforced (100 MB)
- ZIP extraction with depth limits
- Symlinks rejected during extraction
- File count limits

**Not yet implemented:** Malware scanning, content inspection.

### Secret handling

Secrets (API keys, database passwords, etc.) are stored encrypted and injected during deployment.

**How it works:**
1. User enters a key-value pair in the UI
2. Value is encrypted with AES-256-GCM before storage
3. Encryption key is a server environment variable (not in the database)
4. During deployment, secrets are decrypted and written as `.env` to the user's server
5. The `.env` file lives in a `shared/` directory, symlinked into the active release

**Protected:** Values are never logged, never shown in full in the UI (last 4 chars only), never included in exports.

**Risk:** The `.env` file on the user's server is a plain text file. Anyone with server access can read it.

**User responsibility:** Secure your server's SSH access. Solo-Vibe puts secrets on your server, but protecting that server is your job.

### SSH server connection

Solo-Vibe connects to the user's server via SSH to deploy code and stream logs.

**How it works:**
1. Solo-Vibe generates an SSH key pair (or accepts user-provided keys)
2. The private key is stored encrypted in the database
3. Connections use key-based auth (no passwords stored)
4. A dedicated `solovibe` user is created on the target server with limited sudo

**Command boundaries:** Solo-Vibe only executes predefined commands:
- `rsync` for file transfer
- `npm ci` / `npm install` for Node.js builds
- `pm2 start/restart/stop` for process management
- `nginx -s reload` for static sites
- Health check HTTP requests

Solo-Vibe does **not** run arbitrary shell commands. The deployment script is fixed.

**Risk:** If the Solo-Vibe server is compromised, an attacker could use stored SSH keys to access user servers.

**Mitigation:** SSH keys are encrypted at rest. The `solovibe` user has restricted sudo (only for specific commands). Server connections can be revoked.

### Deployment permissions

Deployments run as the `solovibe` user, not root.

**Allowed:** File operations in `/opt/solovibe/`, npm install, PM2 process management, Nginx config reload (via sudo).

**Not allowed:** System-level changes, package installation, firewall modifications, user management.

### Rollback safety

Rollback replaces the current symlink with a previous release. The old release files remain on the server.

**Safe:** No code is deleted during rollback. All previous releases are kept.

**Limitation:** Rollback does not revert database changes. If the app modified a database, rolling back the code may cause mismatches.

### Health checks

After deployment, Solo-Vibe sends an HTTP GET to the app's root URL.

**What it checks:** HTTP response status (expects 2xx within 30 seconds).

**What it doesn't check:** Application correctness, data integrity, specific endpoints, response content.

## Supported server assumptions

Solo-Vibe V1 assumes:
- Ubuntu 22.04+ or Debian 12+
- SSH access with key-based auth
- Root or sudo access (for initial setup only)
- Ports 80 and 443 accessible (or custom port)
- No conflicting web server configuration

**Unsupported:**
- Other Linux distributions
- Windows servers
- Containers / Kubernetes
- Servers behind corporate firewalls or VPNs
- Servers with non-standard SSH configurations

## Not yet supported / not yet audited

| Area | Status |
|---|---|
| Independent security audit | Not done |
| Automated secret scanning in code | Planned for V1.5 |
| Rate limiting on API | Planned for V1 |
| Two-factor authentication | Planned for V2 |
| Audit log (who did what when) | Partial (event log exists, but not security-focused) |
| SOC 2 / ISO 27001 | Not planned for early stage |
| Encrypted-at-rest filesystem | Not yet (standard filesystem permissions) |
| Network isolation between user projects | Not yet (filesystem permissions only) |

## Recommended best practices for users

1. **Use a dedicated server for Solo-Vibe projects.** Don't deploy to a server with sensitive production data.
2. **Keep your server updated.** Solo-Vibe doesn't manage OS updates.
3. **Don't hardcode secrets in your code.** Use Solo-Vibe's secret management instead.
4. **Set up SSH key-only access.** Disable password auth on your server.
5. **Set up a firewall.** Only expose the ports you need (22 for SSH, 80/443 for web).
6. **Review your code before deploying.** Solo-Vibe does not scan for vulnerabilities.
7. **Back up your server independently.** Solo-Vibe backs up your code, not your server.

## Threat model summary

| Threat | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Solo-Vibe server compromised | Low | High (all code + encrypted secrets + SSH keys) | Encrypted secrets, encrypted SSH keys, daily backups |
| Man-in-the-middle on SSH | Very low | High | SSH key verification, known_hosts |
| Malicious ZIP upload | Medium | Medium (server-side) | Size limits, depth limits, no symlinks |
| Secret leaked in user's code | High | High (user's API keys exposed) | V1.5: secret scanning. V1: user responsibility. |
| Brute force on user's VPS | Medium | High | Not Solo-Vibe's domain. User must secure their server. |
| Unauthorized access to project | Low | Medium | Session auth, project scoped to user |

## Future security improvements

- **V1.5:** Basic secret scanning (warn if API keys found in uploaded code)
- **V1.5:** Rate limiting on all API endpoints
- **V2:** Two-factor authentication
- **V2:** Audit log with security focus
- **Later:** Independent security audit, bug bounty program
