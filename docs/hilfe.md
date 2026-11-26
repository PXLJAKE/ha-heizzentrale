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

## Ich will Heizzentrale entfernen

Stelle vorher den Betriebsmodus auf „Beobachtet“ und Zeitpläne sowie den
Vorlauf nach Bedarf auf „Nur anzeigen“. Dann gibt Heizzentrale alles
zurück, was sie verstellt hat. Entfernst du sie ohne diesen Schritt, bleiben
geschlossene Stränge geschlossen und die Zahl der Heizkurve bleibt, wie sie
gerade ist.

## Ein Strang schließt nicht, obwohl kein Raum Wärme will

- Steht der Betriebsmodus auf „Schaltet“?
- Hat der Strang einen Stellantrieb und sind ihm Räume zugeordnet? Ohne
  Räume gilt er immer als gebraucht.
- Ist ein Thermostat an diesem Strang nicht erreichbar oder ein Raum unter
  8 °C? Dann bleibt er sicherheitshalber offen.
- Seit dem letzten Bedarf müssen 10 Minuten vergangen sein.

## Speichern nicht möglich

Nur Administratoren können Einstellungen ändern.

## Etwas stimmt nicht

Melde es bitte unter
[Issues](https://github.com/PXLJAKE/ha-heizzentrale/issues) mit der Version
aus **Einstellungen**, **Geräte & Dienste**, **Heizzentrale** und einer
kurzen Beschreibung. Bitte keine Zugangsdaten oder Adressen mitschicken.
