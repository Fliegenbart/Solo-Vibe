# Solo-Vibe: Sprachsystem

## Grundregel

In der Nutzeroberfläche existieren keine Git-Begriffe, keine DevOps-Begriffe und keine Entwickler-Fachsprache. Die Sprache fühlt sich an wie eine Werkstatt für Ideen, nicht wie ein Terminal.

## Vokabular

### Begriffe, die wir verwenden

| Technischer Begriff | Solo-Vibe Begriff | Erklärung |
|---|---|---|
| Repository | **Projekt** | Der Ort, an dem alles zu einer Idee lebt |
| Commit | **Stand speichern** | Den aktuellen Zustand festhalten |
| Saved state / Snapshot | **Stand** | Ein gespeicherter Zustand des Projekts |
| Tag / Release | **Veröffentlichungsstand** | Ein Stand, der als stabil markiert wurde |
| Deploy | **Live schalten** | Den Code auf den Server bringen, sodass er im Internet erreichbar ist |
| Deployment | **Veröffentlichung** | Der Vorgang, etwas live zu schalten |
| Rollback | **Zurücksetzen** | Einen früheren Stand wieder live schalten |
| Server (VPS) | **Server** | Bleibt "Server" — der Begriff ist allgemein verständlich |
| SSH Connection | **Serververbindung** | Die Verbindung zwischen Solo-Vibe und deinem Server |
| Environment Variables | **Geheime Einstellungen** | Passwörter, API-Schlüssel und Konfiguration, die nicht im Code stehen sollen |
| Logs | **Protokoll** | Was auf dem Server passiert — Meldungen, Fehler, Aktivitäten |
| Preview | **Vorschau** | Dein Projekt ansehen, bevor es live geht |
| Build Process | *(nicht sichtbar)* | Passiert automatisch im Hintergrund |
| CI/CD Pipeline | *(nicht sichtbar)* | Existiert intern, hat keinen Nutzerbegriff |
| Health Check | **Funktionstest** | Automatische Prüfung, ob die App nach dem Live-Schalten funktioniert |
| Fork | **Remix** | Eine eigene Version auf Basis eines fremden Projekts starten (V1.5) |
| Clone | **Kopie** | Eine exakte Kopie eines Projekts erstellen |
| Diff | **Änderungen** | Was sich zwischen zwei Ständen verändert hat |
| Version History | **Verlauf** | Die Chronik aller gespeicherten Stände |
| ZIP Export | **Herunterladen** | Das Projekt als Datei auf den eigenen Computer laden |
| Upload | **Hochladen** | Code in Solo-Vibe bringen |
| Runtime | *(nicht sichtbar)* | Wird intern erkannt und konfiguriert |
| Docker | *(nicht sichtbar)* | Intern möglich, nie in der UI |
| Error (technical) | **Problem** | Etwas funktioniert nicht wie erwartet |
| Stack Trace | *(nicht sichtbar)* | Nur im erweiterten Protokoll, nie prominent |

### Aktions-Sprache

| Technische Aktion | Solo-Vibe Aktion |
|---|---|
| `git commit -m "..."` | **Stand speichern** |
| `git push` | *(nicht nötig — passiert automatisch)* |
| `git checkout <hash>` | **Stand wiederherstellen** |
| `git tag v1.0` | **Als Veröffentlichungsstand markieren** |
| `ssh deploy` | **Live schalten** |
| `docker rollback` | **Zurücksetzen** |
| `tail -f logs` | **Protokoll ansehen** |
| `git clone` | **Projekt kopieren** |
| `git fork` | **Remixen** (V1.5) |
| `.env` bearbeiten | **Geheime Einstellungen anpassen** |

## Begriffe, die nie in der UI auftauchen

Diese Begriffe existieren nur intern oder in der technischen Dokumentation:

- Branch
- Merge
- Pull Request
- Push
- Fetch
- Rebase
- Cherry-Pick
- Stash
- HEAD
- Origin
- Remote
- Upstream
- CI/CD
- Pipeline
- Dockerfile
- Container
- Image
- Registry
- YAML
- Config File
- Terminal
- CLI
- stdout / stderr
- Daemon
- Process
- Port
- DNS (stattdessen: "Adresse" oder "Domain")

## Tonalität

- Direkt, nicht technisch
- Aktiv, nicht passiv ("Dein Projekt ist live" statt "Das Deployment wurde erfolgreich abgeschlossen")
- Kurz, nicht ausführlich
- Ermutigend bei Fehlern ("Das hat nicht geklappt. Versuch es nochmal oder setze auf den letzten Stand zurück.")
- Keine Ausrufezeichen-Euphorie ("Dein Projekt ist live." nicht "Dein Projekt ist live!!!")

## Beispiele für UI-Texte

**Statt:** "Commit erfolgreich. Push to remote completed."
**Besser:** "Stand gespeichert."

**Statt:** "Deployment failed. Check logs for details."
**Besser:** "Das Live-Schalten hat nicht geklappt. Dein Server meldet ein Problem. [Protokoll ansehen]"

**Statt:** "Environment variable DATABASE_URL is not set."
**Besser:** "Deinem Projekt fehlt eine geheime Einstellung. [Einstellungen anpassen]"

**Statt:** "Rolling back to commit a3f8e2b..."
**Besser:** "Wird zurückgesetzt auf den Stand vom 28. März, 14:23 Uhr..."

**Statt:** "No Dockerfile found. Please configure your build process."
**Besser:** "Solo-Vibe erkennt automatisch, wie dein Projekt gebaut wird. Falls etwas nicht stimmt, [hilft dir dieser Leitfaden]."
