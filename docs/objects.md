# Solo-Vibe: Kernobjekte

## Übersicht

Solo-Vibe hat 6 Kernobjekte. Jedes hat eine klare Bedeutung für den Nutzer und eine technische Entsprechung im Hintergrund.

---

## 1. Projekt

### Für den Nutzer
Ein Projekt ist alles, was zu einer Idee gehört: der Code, die Stände, die Einstellungen, die Veröffentlichungen. Ein Nutzer hat ein oder mehrere Projekte. Jedes Projekt hat einen Namen und eine kurze Beschreibung.

### Technisch
Ein Projekt entspricht intern einem Git-Repository auf dem Solo-Vibe-Server. Zusätzlich gibt es Metadaten (Name, Beschreibung, Erstellungsdatum, verknüpfter Server, Secrets) in der Datenbank.

### Aktionen
- **Neues Projekt erstellen** (leer oder per Upload)
- **Code hochladen** (ZIP, Ordner, oder per URL importieren)
- **Projekt herunterladen** (ZIP-Export)
- **Projekt archivieren** (Soft Delete — wiederherstellbar)
- **Projekt teilen** (öffentlicher Link, V1)

---

## 2. Stand

### Für den Nutzer
Ein Stand ist ein gespeicherter Zustand des Projekts zu einem bestimmten Zeitpunkt. Wie ein Foto des Projekts. Jeder Stand hat einen Zeitstempel und optional eine kurze Notiz ("Was habe ich verändert?").

Der Nutzer kann jederzeit zu jedem früheren Stand zurückkehren.

### Technisch
Ein Stand ist ein Git-Commit. Die Commit-Message ist die optionale Notiz des Nutzers. Wenn keine Notiz angegeben wird, wird eine automatische Message generiert ("Stand vom 28. März, 14:23 Uhr").

### Aktionen
- **Stand speichern** (manuell, mit optionaler Notiz)
- **Stand ansehen** (Dateien zu diesem Zeitpunkt)
- **Änderungen anzeigen** (Diff zum vorherigen Stand)
- **Stand wiederherstellen** (Projekt auf diesen Stand zurücksetzen)

---

## 3. Veröffentlichungsstand

### Für den Nutzer
Ein Veröffentlichungsstand ist ein Stand, den der Nutzer bewusst als "stabil" oder "fertig genug" markiert hat. Nicht jeder Stand ist ein Veröffentlichungsstand — nur die, die der Nutzer dafür ausgewählt hat.

Veröffentlichungsstände sind die Stände, die live geschaltet werden können.

### Technisch
Ein Veröffentlichungsstand ist ein Git-Tag auf einem bestimmten Commit. Tags werden automatisch nummeriert (v1, v2, v3...) oder können vom Nutzer benannt werden. Nur getaggte Commits können deployed werden.

### Aktionen
- **Stand als Veröffentlichungsstand markieren** (Tag erstellen)
- **Veröffentlichungsstand live schalten** (Deploy auslösen)
- **Veröffentlichungsstände vergleichen** (Diff zwischen zwei Tags)

---

## 4. Live-Version

### Für den Nutzer
Die Live-Version ist der Veröffentlichungsstand, der gerade auf dem Server läuft und im Internet erreichbar ist. Es gibt immer nur eine Live-Version (oder keine, wenn noch nichts veröffentlicht wurde).

### Technisch
Die Live-Version ist der zuletzt erfolgreich deployte Git-Tag. Der Zustand wird in der Datenbank verfolgt (welcher Tag, wann deployed, auf welchem Server). Bei einem Rollback wird ein früherer Tag erneut deployed.

### Aktionen
- **Live-Version ansehen** (Link zur laufenden App)
- **Live-Version zurücksetzen** (Rollback auf einen früheren Veröffentlichungsstand)
- **Live-Version stoppen** (App auf dem Server herunterfahren)

---

## 5. Serververbindung

### Für den Nutzer
Eine Serververbindung ist die Brücke zwischen Solo-Vibe und dem eigenen Server des Nutzers. Der Nutzer richtet sie einmal ein — danach kann Solo-Vibe Code auf den Server bringen, ihn starten und stoppen und das Protokoll lesen.

### Technisch
Eine Serververbindung besteht aus:
- SSH-Host und Port
- SSH-Schlüsselpaar (generiert von Solo-Vibe oder vom Nutzer bereitgestellt)
- Zielverzeichnis auf dem Server
- Serverkonfiguration (erkanntes OS, installierte Runtimes)

Der Verbindungsaufbau wird durch einen Wizard geführt, der den Server prüft und notwendige Software installiert (Node.js, PM2, Nginx — je nach Projekttyp).

### Aktionen
- **Server verbinden** (geführter Wizard)
- **Verbindung testen** (SSH-Check)
- **Serverdetails ansehen** (OS, IP, Status)
- **Server trennen** (Verbindung entfernen, Code bleibt auf dem Server)

---

## 6. Verlauf

### Für den Nutzer
Der Verlauf zeigt alles, was mit dem Projekt passiert ist: gespeicherte Stände, Veröffentlichungen, Live-Schaltungen, Zurücksetzungen, Fehler. Eine chronologische Übersicht.

### Technisch
Der Verlauf ist eine Kombination aus:
- Git-Log (Stände)
- Deployment-Log (Veröffentlichungen, Rollbacks)
- Event-Log (Fehler, Server-Ereignisse)

Alle drei werden in einer einheitlichen Timeline zusammengeführt.

### Aktionen
- **Verlauf ansehen** (chronologische Liste)
- **Ereignis-Details anzeigen** (was genau passiert ist)
- **Zu einem Stand springen** (von Verlaufseintrag direkt zum Stand)
- **Protokoll ansehen** (Server-Logs zu einem bestimmten Zeitpunkt)

---

## Objektbeziehungen

```
Projekt
├── Stand (viele)
│   └── Veröffentlichungsstand (markierte Stände)
│       └── Live-Version (der aktuell deployte Veröffentlichungsstand)
├── Serververbindung (eine pro Projekt, optional)
└── Verlauf (aggregiert aus allen Ereignissen)
```

## Objekte, die bewusst nicht in V1 existieren

| Objekt | Warum nicht |
|--------|-------------|
| **Remix / Ableger** | Erfordert öffentliche Projektgalerie, Nutzerprofile, Social-Features. V1.5. |
| **Team / Mitarbeiter** | Solo-Vibe ist für Solo-Builder. Team-Features sind V2+. |
| **Umgebung (Staging/Production)** | Zu komplex für V1. Ein Server = eine Umgebung. |
| **Domain** | V1 nutzt die Server-IP oder die bestehende Domain des Nutzers. Domain-Verwaltung ist V2. |
| **Datenbank** | Ist auf dem Server des Nutzers. Solo-Vibe verwaltet sie nicht. |
