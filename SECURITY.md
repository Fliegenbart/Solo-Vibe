# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in Solo-Vibe, please report it responsibly.

**Email:** security@solovibe.app (or open a private security advisory on GitHub)

**What to include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

**What to expect:**
- Acknowledgment within 48 hours
- We'll work with you to understand and fix the issue
- We'll credit you in the fix (unless you prefer anonymity)

**Please do not** open a public issue for security vulnerabilities.

## Security overview

Solo-Vibe handles sensitive data: user code, secrets (API keys, passwords), and SSH server credentials. We take this seriously, but we're also honest about our maturity level.

**What Solo-Vibe protects:**
- Secrets encrypted at rest (AES-256-GCM)
- SSH keys stored encrypted
- Deployments run as restricted user (not root)
- Secrets never appear in logs or error messages

**What Solo-Vibe does not yet have:**
- Independent security audit
- Automated secret scanning in uploaded code
- SOC 2 or similar compliance certification
- Bug bounty program

This is early-stage software. The security architecture is designed thoughtfully, but has not been battle-tested at scale.

For the full security model, see [docs/security.md](docs/security.md).
