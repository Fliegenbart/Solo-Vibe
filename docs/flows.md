# Solo-Vibe: Kern-User-Flows

## Flow 1: Neues Projekt starten

### Nutzerlogik
1. Nutzer klickt "Neues Projekt"
2. Gibt einen Namen und eine kurze Beschreibung ein
3. Wählt: "Code hochladen" (ZIP/Ordner) oder "Leeres Projekt"
4. Optional: Importiert von einer URL (GitHub-Repo, ZIP-Link)
5. Projekt ist angelegt, der erste Stand wird automatisch gespeichert

### Technische Hintergrundlogik
1. Neues Git-Repo wird auf dem Server initialisiert
2. Hochgeladener Code wird in das Repo committed (initialer Commit)
3. Solo-Vibe analysiert das Projekt: Runtime erkennen (Node.js, Python, statisch), Projektstruktur validieren
4. Metadaten (Name, Beschreibung, erkannte Runtime, Zeitstempel) werden in der DB gespeichert
5. Bei URL-Import: `git clone` oder ZIP-Download, dann wie Upload behandelt

### UX-Risiken
- **Runtime-Erkennung schlägt fehl:** Wenn Solo-Vibe den Projekttyp nicht erkennt, muss der Nutzer helfen können, ohne technisch werden zu müssen. Lösung: "Was für eine Art Projekt ist das?" mit einfachen Optionen (Website, Web-App, API).
- **Große Uploads:** ZIP mit 500MB? Muss es ein Limit geben? Ja — aber mit klarer Meldung.
- **GitHub-Import erfordert Auth:** Für private Repos braucht man ein Token. Das ist für die Zielgruppe schwierig. V1: nur öffentliche Repos importierbar.

---

## Flow 2: Aktuellen Stand speichern

### Nutzerlogik
1. Nutzer arbeitet am Projekt (Code extern bearbeitet, neue Dateien hochgeladen)
2. Klickt "Stand speichern"
3. Optional: schreibt eine kurze Notiz ("Kontaktformular hinzugefügt")
4. Stand erscheint im Verlauf

### Technische Hintergrundlogik
1. Alle geänderten Dateien werden gestaged
2. Git-Commit mit Notiz als Message (oder Auto-Message mit Zeitstempel)
3. Commit-Hash und Metadaten werden in der DB gespeichert
4. Diff zum vorherigen Stand wird berechnet und gecacht

### UX-Risiken
- **Wann speichern?** Wenn der Nutzer Code extern bearbeitet (z.B. in Cursor) und dann in Solo-Vibe hochlädt, ist "Stand speichern" klar. Aber wenn Solo-Vibe später einen Editor hat, muss Autosave vs. manuelles Speichern entschieden werden.
- **Zu viele Stände:** Wenn jede Kleinigkeit ein Stand ist, wird der Verlauf unbrauchbar. Lösung: Stände ohne Notiz werden im Verlauf kompakter dargestellt. Veröffentlichungsstände sind visuell hervorgehoben.

---

## Flow 3: Veröffentlichungsstand markieren

### Nutzerlogik
1. Nutzer schaut sich den aktuellen Stand (oder einen früheren) an
2. Klickt "Als Veröffentlichungsstand markieren"
3. Optional: gibt einen Namen ein ("Version mit neuem Design")
4. Der Stand wird visuell als Veröffentlichungsstand gekennzeichnet

### Technische Hintergrundlogik
1. Git-Tag wird auf dem entsprechenden Commit erstellt
2. Tag-Name: auto-incrementing (v1, v2, v3...) oder benutzerdefiniert
3. Veröffentlichungsstand wird in der DB als deploy-fähig markiert

### UX-Risiken
- **Verwirrung Stand vs. Veröffentlichungsstand:** Der Unterschied muss visuell sofort klar sein. Ein Stand ist grau/neutral, ein Veröffentlichungsstand hat eine deutliche Markierung (Farbe, Badge).
- **Braucht es das?** Manche Nutzer wollen vielleicht direkt live schalten, ohne den Zwischenschritt. Lösung: "Live schalten" markiert automatisch einen Veröffentlichungsstand, wenn noch keiner existiert. Der Schritt ist also optional, aber verfügbar.

---

## Flow 4: Live schalten

### Nutzerlogik
1. Nutzer hat einen Veröffentlichungsstand (oder der aktuelle Stand wird automatisch markiert)
2. Nutzer hat eine Serververbindung eingerichtet (oder wird jetzt dazu aufgefordert)
3. Klickt "Live schalten"
4. Fortschrittsanzeige: "Code wird übertragen... App wird gestartet... Funktionstest läuft..."
5. Ergebnis: "Dein Projekt ist live unter [IP/Domain]" oder "Etwas hat nicht geklappt" mit Handlungsoptionen

### Technische Hintergrundlogik
1. Prüfung: Serververbindung aktiv? Veröffentlichungsstand vorhanden?
2. Code-Transfer per rsync über SSH
3. Build-Prozess auf dem Server (npm install, npm build — je nach Runtime)
4. Prozess starten/neu starten (PM2 für Node.js, Nginx-Reload für statisch)
5. Health-Check: HTTP-Request an die App, Statuscode prüfen
6. Bei Erfolg: Live-Version in DB aktualisieren, Nutzer benachrichtigen
7. Bei Fehler: Build-/Start-Fehler parsen, menschenlesbare Meldung erstellen

### UX-Risiken
- **Build dauert lang:** Node.js `npm install` kann Minuten dauern. Fortschrittsanzeige muss ehrlich sein, nicht fake.
- **Fehler sind kryptisch:** Build-Fehler sind technisch. Solo-Vibe muss sie übersetzen. Das ist der schwierigste UX-Moment im ganzen Produkt. Lösung: Häufigste Fehler erkennen und in Klartext übersetzen. Für unbekannte Fehler: "Etwas Unerwartetes ist passiert. [Protokoll ansehen]"
- **Erster Deploy braucht Server-Setup:** Beim ersten Mal muss der Server vorbereitet werden (Node.js installieren, PM2 einrichten). Das dauert und kann fehlschlagen. Der Wizard muss das klar kommunizieren.

---

## Flow 5: Bei Fehlern zurücksetzen

### Nutzerlogik
1. Nutzer stellt fest: die Live-Version funktioniert nicht richtig
2. Öffnet das Projekt, sieht den Verlauf
3. Sieht den vorherigen Veröffentlichungsstand (z.B. "v2 — lief einwandfrei")
4. Klickt "Diesen Stand live schalten"
5. Fortschrittsanzeige → "Dein Projekt läuft wieder mit dem Stand vom [Datum]"

### Technische Hintergrundlogik
1. Der gewählte Veröffentlichungsstand (Git-Tag) wird erneut deployed
2. Gleicher Prozess wie beim normalen Deploy: rsync, build, restart, health-check
3. Live-Version in DB wird auf den alten Tag zurückgesetzt
4. Rollback-Event wird im Verlauf protokolliert

### UX-Risiken
- **Nutzer weiß nicht, welcher Stand funktioniert hat:** Der Verlauf muss klar zeigen, welche Veröffentlichungsstände erfolgreich deployed waren (grün) und welche Probleme hatten (rot).
- **Rollback schlägt auch fehl:** Wenn der Server selbst das Problem ist (Disk voll, Prozess abgestürzt), hilft kein Rollback. Solo-Vibe muss das erkennen und dem Nutzer sagen: "Dein Server hat ein grundsätzliches Problem."
- **Datenbank-Änderungen:** Code-Rollback setzt keine DB zurück. Wenn die neue Version DB-Änderungen gemacht hat, ist der alte Code möglicherweise inkompatibel. Solo-Vibe kann das in V1 nicht lösen — aber sollte es zumindest erwähnen.

---

## Flow 6: Projekt teilen

### Nutzerlogik
1. Nutzer öffnet ein Projekt
2. Klickt "Teilen"
3. Erhält einen öffentlichen Link zum Projekt
4. Andere können das Projekt ansehen (Code, Beschreibung, Veröffentlichungsstände)
5. V1.5: Andere können das Projekt remixen

### Technische Hintergrundlogik
1. Projekt wird als "öffentlich" markiert
2. Öffentliche Projektseite wird generiert (read-only)
3. Link-Format: solovibe.app/p/[slug]
4. Anzeige: Beschreibung, Dateien des letzten Veröffentlichungsstands, Verlauf (vereinfacht)

### UX-Risiken
- **Secrets im Code:** Wenn der Nutzer API-Schlüssel hart im Code hat (was bei VibeCoder häufig ist), werden sie mit geteilt. Solo-Vibe sollte beim Teilen einen Secrets-Scan machen und warnen.
- **Nutzer will nur die App teilen, nicht den Code:** Das ist ein anderes Feature (öffentlicher Link zur Live-Version). Muss in der UI klar getrennt sein: "App teilen" (Link zur laufenden App) vs. "Projekt teilen" (Code sichtbar machen).

---

## Flow 7: Eigenen Server verbinden

### Nutzerlogik
1. Nutzer klickt "Server verbinden" (im Projekt oder global)
2. Wizard startet: "Hast du schon einen Server?"
   - Ja → IP-Adresse und SSH-Zugangsdaten eingeben
   - Nein → Anleitung für Hetzner/DigitalOcean (mit Screenshot-Steps)
3. Solo-Vibe testet die Verbindung
4. Solo-Vibe prüft den Server: OS, installierte Software, freier Speicher
5. Falls nötig: "Dein Server braucht noch [Node.js/PM2/Nginx]. Soll ich das einrichten?"
6. Nutzer bestätigt → Solo-Vibe richtet den Server ein
7. "Dein Server ist bereit. Du kannst jetzt live schalten."

### Technische Hintergrundlogik
1. SSH-Verbindung testen (Key-basiert oder Passwort → dann Key generieren und hinterlegen)
2. Server-Inventory: OS-Version, RAM, Disk, installierte Packages prüfen
3. Setup-Skript ausführen: Node.js via nvm, PM2, Nginx mit Reverse-Proxy-Template
4. Zielverzeichnis erstellen (z.B. /opt/solovibe/[projektname]/)
5. Firewall-Ports prüfen (80, 443)
6. Verbindungsdaten und Serverprofil in DB speichern

### UX-Risiken
- **SSH-Schlüssel sind für die Zielgruppe ein Fremdwort:** Der Wizard muss das vollständig abstrahieren. "Kopiere diesen Text in dein Server-Terminal" ist schon zu viel. Ideal: Solo-Vibe generiert den Key und gibt eine Copy-Paste-Zeile, die der Nutzer im Hetzner-/DO-Web-Terminal ausführt.
- **Server-Setup schlägt fehl:** Verschiedene Linux-Distributionen, unterschiedliche Konfigurationen. V1 muss streng sein: nur Ubuntu 22.04+ und Debian 12+. Andere Systeme: "Dein Serversystem wird noch nicht unterstützt."
- **Root-Zugang nötig?** Für die Installation von Software ja. Das ist ein Sicherheitsrisiko. Lösung: Separater solovibe-User mit sudo-Rechten nur für die nötigen Befehle.

---

## Flow 8: Projekt remixen (V1.5)

### Nutzerlogik
1. Nutzer findet ein geteiltes Projekt
2. Klickt "Remixen"
3. Eine Kopie wird in seinem Account erstellt
4. Er kann das Projekt beliebig verändern
5. Die Verbindung zum Original wird als "basiert auf [Originalname]" angezeigt

### Technische Hintergrundlogik
1. Git-Clone des öffentlichen Repos in ein neues Repo unter dem Account des Nutzers
2. Alle Stände und Veröffentlichungsstände des Originals werden kopiert
3. Remix-Beziehung wird in der DB gespeichert (Original → Remix)
4. Secrets werden nicht kopiert

### UX-Risiken
- **Attribution:** Der Original-Autor sollte sehen, dass sein Projekt remixt wurde. Aber will er das? Opt-out nötig?
- **Updates vom Original:** Wenn das Original weiterentwickelt wird, will der Remixer Updates ziehen? Das ist git merge — und damit komplex. V1.5: kein Sync, nur einmaliger Remix.
