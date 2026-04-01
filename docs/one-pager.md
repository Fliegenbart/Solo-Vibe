# Solo-Vibe: One-Pager

## Problem

Millionen Menschen bauen Software mit AI. In 30 Minuten steht ein Prototyp. Aber dann: Wo speichere ich den Code? Wie bringe ich ihn ins Internet? Was mache ich, wenn etwas schiefgeht? Die Tools, die den Code generieren, beantworten diese Fragen nicht. GitHub erfordert Entwicklerwissen. Lovable und Replit erzeugen Lock-in. Eine offene, einfache Lösung fehlt.

## Lösung

Solo-Vibe ist eine offene Werkbank, die AI-generierten Code sicher aufbewahrt und auf den eigenen Server des Nutzers bringt. Keine Git-Befehle, kein Lock-in, kein Entwicklerwissen nötig.

## Wie es funktioniert

1. **Code hochladen** — ZIP, Ordner oder Import per URL
2. **Stände speichern** — Automatische Versionierung, jederzeit zurücksetzbar
3. **Server verbinden** — Geführter Wizard für eigenen VPS (Hetzner, DigitalOcean)
4. **Live schalten** — Ein Klick. Code wird übertragen, gestartet und geprüft.
5. **Bei Fehlern zurücksetzen** — Vorherigen Stand in Sekunden wieder live schalten

## Zielgruppe

Solo-Builder, Non-Technical Founders und Kreative, die mit AI (ChatGPT, Claude, Cursor, Lovable) Software bauen und das Ergebnis selbst kontrolliert veröffentlichen wollen.

## Differenzierung

| | Solo-Vibe | Lovable/Bolt | GitHub | Vercel |
|---|---|---|---|---|
| Ohne Entwicklerwissen nutzbar | Ja | Ja | Nein | Nein |
| Eigener Server | Ja | Nein | Nein | Nein |
| Kein Lock-in | Ja | Nein | Ja | Teilweise |
| Versionierung + Rollback | Ja | Eingeschränkt | Ja (Git) | Ja (Git) |
| Einfaches Deployment | Ja | Ja (plattformgebunden) | Nein | Ja (Lock-in) |

## Markt

- AI-gestütztes Software-Bauen: $4,7 Mrd. (2025), prognostiziert $12,3 Mrd. (2027)
- 41% des globalen Codes ist AI-generiert
- 196/198 untersuchte AI-generierte Apps hatten Sicherheitslücken
- Größter Pain Point: nicht Bauen, sondern Veröffentlichen und Verteilen

## MVP-Scope

- Web-App (kein Installer)
- Unterstützt: Node.js-Apps und statische Websites
- Deployment: SSH auf eigenen VPS (Ubuntu/Debian)
- Versionierung, Rollback, Secrets, Logs, Health-Checks
- Kein eigener Editor, keine AI, keine Team-Features

## Geschäftsmodell (nach PMF)

Freemium: kostenlos bis 3 Projekte. Bezahlt für mehr Projekte, Managed Hosting, SSL-Automatisierung, AI-Assistent, Team-Features.

## Wedge

Die fehlende Brücke zwischen AI-generiertem Code und dem Internet. Bau in Lovable. Veröffentliche mit Solo-Vibe.
