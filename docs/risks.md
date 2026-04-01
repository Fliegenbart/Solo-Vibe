# Solo-Vibe: Risiken und harte Entscheidungen

## Die 10 größten Risiken

### 1. Die Sichtbarkeitsgrenze der Technik

**Das Risiko:** Zu wenig Technik zeigen → Nutzer fühlt sich machtlos, wenn etwas schiefgeht. Zu viel Technik zeigen → Nutzer fühlt sich überfordert, das Produkt verfehlt seine Zielgruppe.

**Wo es auftritt:** Fehlermeldungen beim Deploy. Server-Logs. Build-Fehler.

**Die harte Entscheidung:** Solo-Vibe braucht zwei Schichten — eine einfache Oberfläche und eine technische Tiefe. Die Oberfläche muss immer funktionieren. Die Tiefe muss immer erreichbar sein, aber nie im Weg stehen. Das klingt nach Progressive Disclosure, ist aber schwieriger als es klingt: Jeder Fehlerfall braucht eine menschenlesbare Übersetzung. Das ist nicht automatisierbar — es ist redaktionelle Arbeit.

**Empfehlung:** Fehlermeldungen sind Produktarbeit, nicht Technikarbeit. Die häufigsten 20 Fehler erhalten handgeschriebene Erklärungen. Alles andere bekommt einen generischen Fallback mit "Details anzeigen".

---

### 2. SSH-Setup für Nicht-Technische

**Das Risiko:** VPS + SSH + Schlüssel + Firewall + Ports — das ist für die Zielgruppe eine Mauer. Wenn der Server-Wizard nicht hervorragend ist, verliert Solo-Vibe Nutzer am kritischsten Punkt: bevor sie den Kernwert erleben.

**Wo es auftritt:** Flow "Server verbinden". Erster Deploy.

**Die harte Entscheidung:** Der Wizard muss so gut sein, dass jemand, der zum ersten Mal einen Hetzner-Server gemietet hat, in unter 10 Minuten deployen kann. Das erfordert:
- Schritt-für-Schritt mit Screenshots
- Copy-Paste-Befehle
- Automatische Server-Erkennung und -Einrichtung
- Klare Fehlermeldungen bei jedem Schritt

**Empfehlung:** Parallel zum Wizard eine Partnerschaft oder Anleitung für Hetzner und DigitalOcean anbieten. "Solo-Vibe empfiehlt: Hetzner Cloud CX22" mit One-Click-Link zur Serverkonfiguration.

---

### 3. Runtime-Varianz und Build-Fehler

**Das Risiko:** Node.js-Projekte haben 47 verschiedene Build-Setups. package.json kann npm, yarn oder pnpm verwenden. Build-Scripts können fehlen, falsch konfiguriert sein oder auf Umgebungsvariablen angewiesen sein. Jeder Build-Fehler, den Solo-Vibe nicht versteht, wird zum Sackgassen-Moment für den Nutzer.

**Wo es auftritt:** Deploy-Engine. Funktionstest.

**Die harte Entscheidung:** V1 unterstützt nur das, was es sauber kann. Das bedeutet:
- Nur npm (nicht yarn, nicht pnpm in V1)
- Nur Standard-Build-Scripts (`npm run build` oder nichts)
- Wenn das `start`-Script fehlt, Fehler mit klarer Anleitung
- Kein Support für Monorepos, Workspaces oder komplexe Build-Chains

**Empfehlung:** Strenge Projektvalidierung beim Upload. Wenn Solo-Vibe das Projekt nicht versteht, sofort sagen — nicht beim Deploy scheitern.

---

### 4. Konkurrenz durch integrierte Plattformen

**Das Risiko:** Lovable, Bolt und Blink werden besser im Deployment. Wenn diese Tools ihren Deploy-Flow verbessern, schrumpft Solo-Vibes Wedge. Warum sollte jemand Code aus Lovable exportieren, in Solo-Vibe hochladen und von dort deployen, wenn Lovable selbst deployen kann?

**Wo es auftritt:** Marktpositionierung. Nutzerakquise.

**Die harte Entscheidung:** Solo-Vibes Differenzierung muss über "einfacher deployen" hinausgehen. Die echten Differenziatoren sind:
- Offenheit (dein Server, nicht unserer)
- Versionierung (zurücksetzen, was die anderen nicht können)
- Sicherheit (was keine Plattform löst)
- Unabhängigkeit (kein Credit-Burn, kein Lock-in)

**Empfehlung:** Solo-Vibe als "zweiten Ort" positionieren, nicht als Ersatz. "Bau in Lovable, veröffentliche mit Solo-Vibe." Die Komplementärposition ist stabiler als die Konkurrenzposition.

---

### 5. Sicherheitsverantwortung

**Das Risiko:** Solo-Vibe deployed unsicheren Code auf die Server anderer Leute. Wenn ein AI-generierter Code eine SQL-Injection hat und über Solo-Vibe live geht, wer ist verantwortlich? Solo-Vibe hat SSH-Zugang zu Nutzer-Servern — das ist ein hochwertiges Angriffsziel.

**Wo es auftritt:** Deployment-Engine. SSH-Key-Storage. Secrets-Management.

**Die harte Entscheidung:** Solo-Vibe muss Sicherheit ernst nehmen, ohne die Nutzer zu überfordern:
- SSH-Keys werden verschlüsselt gespeichert
- Secrets werden verschlüsselt, nie geloggt
- Deployments laufen als eingeschränkter User (nicht root)
- Längerfristig: einfacher Secrets-Scan beim Upload (API-Keys im Code erkennen)

**Empfehlung:** In V1 keine automatische Sicherheitsprüfung des Codes (zu komplex). Aber: klare Warnung beim Teilen von Projekten. Und: die eigene Infrastruktur (Solo-Vibe-Server) muss absolut sicher sein.

---

### 6. Einfachheit kippt in Machtlosigkeit

**Das Risiko:** "Ein Pfad, nicht zehn Optionen" klingt elegant — bis der Nutzer etwas braucht, das nicht auf dem einen Pfad liegt. Python-App deployen? Nicht möglich. Zwei Projekte auf einem Server? Nicht vorgesehen. Eigenes Build-Script? Nicht unterstützt.

**Wo es auftritt:** Überall, wo der Nutzer an die Grenzen des MVP stößt.

**Die harte Entscheidung:** Die Grenzen müssen ehrlich kommuniziert werden. Nicht "Das geht nicht", sondern "Solo-Vibe unterstützt das noch nicht. Du kannst dein Projekt jederzeit herunterladen und manuell deployen."

**Empfehlung:** Jede Grenze muss einen Ausweg haben — und der Ausweg ist immer Export. Solo-Vibe darf nie eine Sackgasse sein.

---

### 7. Code-Transfer und Synchronisation

**Das Risiko:** Wie kommt der Code in Solo-Vibe? Upload per ZIP ist der einfachste Weg, aber auch der unbequemste bei häufigen Änderungen. Wenn der Nutzer in Cursor arbeitet und dann jedes Mal eine ZIP-Datei hochladen muss, wird der Workflow zu umständlich.

**Wo es auftritt:** Alltägliche Nutzung. Iteration. Code-Upload.

**Die harte Entscheidung:** V1 muss mit ZIP-Upload starten — das ist der einfachste Mechanismus. Aber der Weg zu besseren Optionen muss klar sein:
- V1.5: Drag-and-Drop Ordner-Upload
- V1.5: CLI-Tool für den Power-User (`solovibe push`)
- V2: Direkte Integration mit Cursor, VS Code (Filesystem-Watch)
- V2: GitHub-Webhook (Auto-Sync)

**Empfehlung:** ZIP-Upload muss so schnell und schmerzlos wie möglich sein. Drag-and-Drop. Keine unnötigen Bestätigungsdialoge. Automatischer Stand beim Upload.

---

### 8. Monetarisierung

**Das Risiko:** Solo-Vibe ist offen, hat kein Hosting, keine AI, keine Credits. Wo ist das Geschäftsmodell?

**Wo es auftritt:** Sobald V1 Nutzer hat und Infrastrukturkosten entstehen.

**Die harte Entscheidung:** Das Geschäftsmodell muss zur Offenheitsphilosophie passen. Keine Paywalls für Basisfunktionen. Keine Credits.

Mögliche Modelle:
- **Freemium:** Kostenlos bis 3 Projekte, Bezahlt für mehr Projekte + Prioritäts-Features
- **Managed Hosting (V2):** Solo-Vibe hostet für dich — einfacher als eigener Server, Aufpreis
- **Pro-Features:** Automatisches SSL, Custom Domains, Team-Features, AI-Assistent
- **Enterprise (V3):** Self-Hosted Solo-Vibe für Unternehmen

**Empfehlung:** V1 ist kostenlos (Early Access / Closed Beta). Monetarisierung wird erst nach Product-Market-Fit entschieden. Aber die Architektur muss Freemium ermöglichen (Projekt-Limits, Feature-Flags).

---

### 9. Wartung von Live-Apps

**Das Risiko:** Solo-Vibe deployt die App, aber wer wartet sie? Server-Updates, Sicherheitspatches, Disk-Space, abgelaufene SSL-Zertifikate — all das ist Betrieb, nicht Deployment. Die Zielgruppe denkt nicht an Betrieb.

**Wo es auftritt:** Wochen nach dem ersten Deploy. Wenn der Server voll ist. Wenn Node.js veraltet.

**Die harte Entscheidung:** V1 kann das nicht lösen. Solo-Vibe ist kein Hosting-Anbieter und kein Server-Management-Tool. Aber Solo-Vibe kann:
- Einfache Warnungen zeigen ("Dein Server hat weniger als 1 GB freien Speicher")
- Anleitungen bereitstellen ("So aktualisierst du Node.js auf deinem Server")
- Bei kritischen Problemen: "Dein Server meldet Probleme. [Details ansehen]"

**Empfehlung:** Nicht lösen, aber nicht ignorieren. Einfache Monitoring-Checks beim nächsten Deploy. Und langfristig: Managed Hosting als bezahlte Option, die genau dieses Problem löst.

---

### 10. Zielgruppe ist ein Moving Target

**Das Risiko:** VibeCoder als Zielgruppe existiert erst seit 2025. Die Tools, die sie nutzen, ändern sich quartalsweise. Lovable hatte vor 6 Monaten kein Agentic-Feature; jetzt ist es der Standard. Was passiert, wenn die nächste Generation von AI-Tools keinen exportierbaren Code mehr produziert, sondern direkt deployt?

**Wo es auftritt:** Langfristige Produktstrategie. Marktpositionierung.

**Die harte Entscheidung:** Solo-Vibe darf nicht auf eine bestimmte Tool-Kette wetten. Der Wedge "Post-Build" muss flexibel genug sein, um neue Quellen aufzunehmen. Wenn morgen ein neues AI-Tool Code als Git-Repo exportiert, muss Solo-Vibe das annehmen können.

**Empfehlung:** Die Import-Schicht (wie Code in Solo-Vibe kommt) muss erweiterbar sein. ZIP, URL, Git-Clone, Drag-and-Drop, API — jede neue Quelle ist ein neuer Adapter. Der Rest des Systems (Versionierung, Deploy, Rollback) bleibt stabil.

---

## Zusammenfassung: Die drei größten Entscheidungen

1. **SSH vs. Managed Hosting:** Entschieden für SSH. Das ist mutig und konsequent. Aber der Wizard muss exzellent sein.

2. **Komplementär vs. Konkurrent:** Solo-Vibe startet als Ergänzung zu Lovable/Bolt, nicht als Ersatz. Das ist taktisch klug, aber erfordert, dass der Wedge schnell genug ausgebaut wird, bevor die Plattformen aufholen.

3. **Strenger MVP vs. breiter Launch:** Entschieden für streng. Nur Node.js + Static, nur Ubuntu/Debian, nur SSH. Das reduziert die Angriffsfläche, limitiert aber die Zielgruppe. Die Frage ist: Reicht die Zielgruppe für Product-Market-Fit-Signale?
