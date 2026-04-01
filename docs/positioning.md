# Solo-Vibe: Positionierung

## Marktkontext

Der Markt für AI-gestütztes Software-Bauen wächst mit 38% pro Jahr und erreicht bis 2027 geschätzt 12,3 Milliarden Dollar. 41% des globalen Codes wird bereits von AI generiert. 25% der YC-Startups des Winter-2025-Batches bestehen zu 95% aus AI-generiertem Code.

Gleichzeitig verschiebt sich die Stimmung von Euphorie zu Ernüchterung. Die Gründe:
- 196 von 198 untersuchten AI-generierten Apps hatten Sicherheitslücken
- Credits verbrennen am schnellsten beim Bugfixing — genau dort, wo die Plattformen versagen
- Der größte Schmerzpunkt ist nicht das Bauen, sondern das Veröffentlichen und Verteilen

## Die Lücke im Markt

```
                    Einfach zu nutzen
                         |
                         |
          Lovable/Bolt   |
          Blink/Replit   |
                         |
  Lock-in ———————————————+——————————————— Offen
                         |
                         |
                         |   ← SOLO-VIBE
                         |
                    GitHub/Cursor
                    (Entwicklerwissen nötig)
```

Es gibt heute kein Produkt, das gleichzeitig **einfach** und **offen** ist. Die einfachen Tools sind geschlossen. Die offenen Tools erfordern Entwicklerwissen. Solo-Vibe besetzt genau diesen Quadranten.

## Wettbewerbsabgrenzung

### vs. Lovable / Bolt / Blink
Diese Tools bauen den Code. Solo-Vibe übernimmt danach.
- Lovable generiert mit AI. Solo-Vibe bewahrt auf und veröffentlicht.
- Bolt baut Prototypen. Solo-Vibe bringt sie sicher ins Internet.
- Kein Wettbewerb, sondern **Ergänzung** — zumindest in V1.

Mittelfristig: Wenn Solo-Vibe eigene AI-Features bekommt, wird es zum alternativen Workflow. Aber V1 ist bewusst komplementär.

### vs. GitHub
GitHub ist für Entwicklerteams mit Git-Wissen. Solo-Vibe ist für Solo-Builder ohne Git-Wissen.
- Kein Branch-Modell, keine Pull Requests, keine Merge-Konflikte
- Sprache und Konzepte sind für Nicht-Programmierer gebaut
- Deployment eingebaut statt extern (GitHub Pages ist limitiert, GitHub Actions erfordert Konfiguration)

### vs. Replit
Replit ist eine Cloud-IDE mit eigenem Hosting. Solo-Vibe ist eine Werkbank mit offenem Hosting.
- Bei Replit baut und hostet man in der Plattform. Bei Solo-Vibe hostet man auf dem eigenen Server.
- Replit bindet Datenbanken und Hosting an die Plattform. Solo-Vibe bindet nichts.
- Replit ist breiter (IDE + AI + Hosting). Solo-Vibe ist fokussierter (Aufbewahren + Veröffentlichen).

### vs. Vercel / Netlify / Railway
Diese Tools sind Deployment-Plattformen für Entwickler. Solo-Vibe ist eine Werkbank für Nicht-Entwickler.
- Vercel erwartet CLI-Wissen, Git-Repos, Build-Konfigurationen.
- Railway erwartet Dockerfiles oder Buildpacks.
- Solo-Vibe erwartet: einen Ordner mit Code.

## Der Wedge: Vibe Deployment

Solo-Vibe betritt den Markt nicht als IDE, nicht als AI-Tool und nicht als Hosting-Plattform. Sondern als **die fehlende Brücke zwischen AI-generiertem Code und dem Internet.**

Der schärfste Eintrittspunkt:
1. Du hast Code von Lovable/Cursor/ChatGPT
2. Du lädst ihn in Solo-Vibe hoch
3. Solo-Vibe bewahrt ihn sicher auf, prüft grundlegende Sicherheit
4. Du verbindest deinen Server
5. Ein Klick: live

Alles, was zwischen "Ich habe Code" und "Meine App ist online" steht, ist Solo-Vibes Territorium.

## Differenzierungsachsen

1. **Offenheit:** Kein eigenes Hosting, kein Lock-in. Dein Code, dein Server, jederzeit exportierbar.
2. **Sprache:** Keine Entwicklerbegriffe in der Oberfläche. Keine Branches, keine Commits, keine Pull Requests.
3. **Fokus:** Nicht alles für alle. Sondern eine Sache hervorragend: AI-generierten Code sicher veröffentlichen.
4. **Zielgruppe:** Die erste Plattform, die explizit für VibeCoder gebaut ist — nicht für Entwickler, die AI benutzen.
5. **Europa:** DSGVO-bewusst, europäische Infrastruktur möglich, kein US-only Cloud-Zwang.
