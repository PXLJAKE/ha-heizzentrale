# Fragen und Fehlersuche

## Die Ansicht zeigt nach einem Update noch die alte Version

Lade die Seite im Browser neu, am Handy die App einmal schließen und wieder
öffnen. Hilft das nicht, leere den Cache der App.

## Ein Raum steht unter „Weitere Räume“

Der Bereich seines Thermostats ist in Home Assistant keinem Stockwerk
zugeordnet. Ordne den Bereich unter **Einstellungen**, **Bereiche** einem
Stockwerk zu, oder ziehe den Raum im Bearbeitungsmodus in ein Stockwerk.

## Der Kessel zeigt mehrere hundert Grad

Im Feld Kesseltemperatur steckt vermutlich die Flammraumtemperatur. Wähle
dort den Fühler für das Kesselwasser, siehe
[Einrichtung](einrichtung.md#1-warmeerzeuger).

## Ein Strang zeigt keine Spreizung

Dem Strang fehlt der Vorlauf- oder Rücklauffühler. Die Einstellungen zeigen
dazu einen Hinweis am Strang.

## Ein Zeitplan macht nichts

- Steht ganz unten in den Einstellungen **Anwenden**?
- Hat der Zeitplan Schaltpunkte und ist er einem Raum oder Stockwerk
  zugewiesen?
- Bietet das Thermostat das gewählte Preset an?
- Hast du das Thermostat seit dem letzten Schaltpunkt von Hand umgestellt?
  Dann wartet Heizzentrale bis zum nächsten.

## Eine Abwesenheitsregel trifft nicht zu

Schau den Zustand der gewählten Geräte in Home Assistant an. Die Regel
greift nur, wenn **alle** weg sind und die Wartezeit um ist. `unavailable`
zählt als anwesend.

## Speichern nicht möglich

Nur Administratoren können Einstellungen ändern.

## Etwas stimmt nicht

Melde es bitte unter
[Issues](https://github.com/PXLJAKE/ha-heizzentrale/issues) mit der Version
aus **Einstellungen**, **Geräte & Dienste**, **Heizzentrale** und einer
kurzen Beschreibung. Bitte keine Zugangsdaten oder Adressen mitschicken.
