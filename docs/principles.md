# Solo-Vibe: Produktprinzipien

## Die 7 Regeln

### 1. Alles ist umkehrbar

Keine Aktion im System darf endgültig sein. Jeder Veröffentlichungsschritt kann zurückgenommen werden. Jeder gespeicherte Stand bleibt erhalten. Der Nutzer muss nie Angst haben, etwas kaputtzumachen.

**Konsequenz für die Technik:** Löschen ist Archivieren. Deployment ist Rollback-fähig. Jeder Stand wird aufbewahrt.

**Konsequenz für die UI:** Keine Bestätigungsdialoge mit Drohungen. Stattdessen: "Du kannst jederzeit zurück."

### 2. Technik wirkt, aber sie zeigt sich nicht

Versionierung, Sicherheitsprüfungen, Server-Konfiguration, Build-Prozesse — all das passiert. Aber der Nutzer sieht davon nur, was er braucht, wenn er es braucht.

**Konsequenz für die Technik:** Git, Docker, SSH, Build-Scripts — alles erlaubt im Backend. Nichts davon in der UI.

**Konsequenz für die UI:** Keine Terminal-Ausgaben. Keine Konfigurationsdateien. Keine Fehlermeldungen mit Stack-Traces. Stattdessen: verständliche Statusmeldungen.

### 3. Dein Code gehört dir

Kein Lock-in. Kein Zwang, bei Solo-Vibe zu bleiben. Der Code ist jederzeit exportierbar — als ZIP, als vollständiges Projekt. Kein proprietäres Format. Keine Abhängigkeiten von Solo-Vibe-eigenen Diensten.

**Konsequenz für die Technik:** Kein Solo-Vibe-spezifischer Wrapper um den Code. Standard-Projektstrukturen. Export als erste Funktion, nicht als Notausgang.

**Konsequenz für die UI:** Export-Button sichtbar, nicht versteckt. Keine Warnungen beim Export.

### 4. Ein Pfad, nicht zehn Optionen

Für jede Aufgabe gibt es einen klaren Weg. Nicht drei Deployment-Methoden. Nicht fünf Konfigurationsarten. Ein Weg, der funktioniert.

**Konsequenz für die Technik:** Enge Unterstützung: ein Server-Typ (VPS via SSH), ein Deployment-Verfahren, ein Projektformat. Lieber einen Weg perfektionieren als fünf halb fertig.

**Konsequenz für die UI:** Kein Einstellungsmenü mit 30 Optionen. Wizards statt Formulare. Vernünftige Standardwerte statt leerer Felder.

### 5. Wenn etwas schiefgeht, hilf statt zu beschuldigen

Fehlermeldungen sind Momente, in denen Nutzer Vertrauen verlieren oder aufbauen. Solo-Vibe nutzt sie, um zu helfen. Keine kryptischen Fehlercodes. Keine Entwicklersprache. Stattdessen: Was ist passiert? Was kann der Nutzer tun?

**Konsequenz für die Technik:** Jeder Fehlerfall braucht eine menschenlesbare Erklärung. Logging für Debugging ist intern vorhanden, aber extern gefiltert.

**Konsequenz für die UI:** Fehlermeldungen haben maximal zwei Sätze. Darunter steht immer eine Handlungsempfehlung. Bei komplexen Fehlern: "Details anzeigen" als Option, nicht als Standard.

### 6. Offen heißt offen

Offenheit ist kein Marketing-Versprechen, sondern eine technische Eigenschaft. Der Code ist Standard-Code. Der Server ist der Server des Nutzers. Die Daten sind exportierbar. Die Architektur ermöglicht, dass andere Tools andocken können.

**Konsequenz für die Technik:** API-first denken, auch wenn V1 keine öffentliche API hat. Standard-Formate für alles. Keine versteckten Abhängigkeiten.

**Konsequenz für die UI:** Transparenz über das, was Solo-Vibe tut. "Wir haben deinen Code auf deinen Server kopiert und den Dienst neu gestartet" statt "Deployment erfolgreich".

### 7. Einfachheit hat Tiefe

Solo-Vibe fühlt sich einfach an — aber hinter der einfachen Oberfläche steckt echte Substanz. Wenn ein Nutzer tiefer graben will (Logs, alte Stände, Server-Details), kann er das. Aber er muss es nicht.

**Konsequenz für die Technik:** Zwei Schichten: Oberfläche (einfach, sicher, geführt) und Tiefe (Logs, Verlauf, Details). Die Tiefe existiert immer, wird aber nur bei Bedarf gezeigt.

**Konsequenz für die UI:** Progressive Disclosure. Die erste Ansicht ist minimal. Jede Information hat ein "Mehr anzeigen". Nie mehr als nötig auf einem Screen.
