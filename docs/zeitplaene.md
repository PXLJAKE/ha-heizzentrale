# Zeitpläne

Ein Zeitplan stellt Thermostate zu festen Zeiten um. Du findest ihn unter
dem Zahnrad im Abschnitt **Zeitpläne**.

![Zeitpläne und Abwesenheit](assets/zeitplaene-abwesenheit.webp){ loading=lazy }

## Anlegen

1. **Neuer Zeitplan** wählen und einen Namen geben.
2. **Schaltpunkte** hinzufügen. Jeder Schaltpunkt hat Wochentage, eine
   Uhrzeit und eine Aktion.
3. Unter **Gilt für** Stockwerke oder einzelne Räume antippen.
4. **Speichern**.

![Zeitplan bearbeiten](assets/zeitplan-bearbeiten-handy.webp){ width=320 loading=lazy }

## Aktionen

| Aktion | Wirkung |
| --- | --- |
| Ein Preset, etwa Komfort, Eco, Schlafen | Stellt das Preset am Thermostat. Angeboten werden die Presets deiner Thermostate. |
| An | Schaltet das Thermostat ein, ohne sonst etwas zu ändern. |
| Aus | Schaltet das Thermostat aus. |
| Temperatur | Stellt eine feste Solltemperatur. |

## Regeln

- Ein Schaltpunkt gilt ab seiner Uhrzeit bis zum nächsten. Die Woche läuft
  durch: Montag früh gilt noch der letzte Punkt vom Sonntag.
- Ein Zeitplan für einen **einzelnen Raum hat Vorrang** vor dem seines
  Stockwerks.
- Stellst du ein Thermostat **von Hand** um, bleibt das bis zum nächsten
  Schaltpunkt so.
- Bietet ein Thermostat ein Preset nicht an, wird es dort ausgelassen.

## Erst ansehen, dann anwenden

Zeitpläne starten auf **Nur anzeigen**. Heizzentrale fasst dann kein
Thermostat an und schreibt im Raumfenster unter **Plan**, was sie stellen
würde. Passt das, stellst du ganz unten in den Einstellungen auf
**Anwenden**.

!!! warning "Eigene Automationen"
    Schalte Automationen ab, die dieselben Thermostate zeitlich steuern,
    bevor du auf Anwenden stellst. Sonst arbeiten beide gegeneinander.

## Offene Fenster

Hat ein Raum einen Fensterkontakt, schaltet Heizzentrale sein Thermostat
aus, sobald das Fenster länger als die Wartezeit offen ist (Standard: 2
Minuten). Beim Schließen stellt sie es wieder so, wie es vorher war. Kurzes
Stoßlüften unter der Wartezeit ändert nichts.

- Das gilt nur, wenn „Anwenden“ gewählt ist.
- Unter **Einstellungen, Offene Fenster** stellst du die Wartezeit ein oder
  schaltest die Regel ganz ab.
- Soll ein einzelner Raum nicht reagieren, nimm in seinen Einstellungen den
  Fensterkontakt heraus.

## Rechtzeitig vorheizen

Normalerweise stellt ein Schaltpunkt das Thermostat genau zur eingestellten
Uhrzeit um, und der Raum ist erst später warm. Mit **Einstellungen,
Rechtzeitig vorheizen, „Früher starten“** bedeutet die Uhrzeit: Dann soll
der Raum warm sein.

- Heizzentrale **misst**, wie schnell jeder Raum warm wird, immer wenn er
  mindestens 20 Minuten heizt und dabei mindestens 0,3 Grad wärmer wird.
  Neue Messungen fließen zu 30 Prozent in den gemerkten Wert ein.
- Aus dem Abstand zur Solltemperatur und dieser Geschwindigkeit rechnet sie
  aus, wie viele Minuten früher sie umstellen muss. Beispiel: 3 Grad fehlen,
  der Raum schafft 2 Grad pro Stunde, also 90 Minuten früher.
- Sie startet **höchstens** so viel früher, wie du einstellst (Standard:
  120 Minuten).
- Vorgeheizt wird nur in Richtung wärmer. Absenken beginnt immer genau am
  Schaltpunkt.
- Ein Raum **ohne Messwert** wird nie vorgeheizt. In den Einstellungen
  steht, welche Räume schon gemessen sind.
- Abwesenheit, ein brennender Ofen und ein offenes Fenster gehen vor.

!!! note "Heizzeiten am Kessel"
    Vorheizen bringt nur etwas, wenn dein Wärmeerzeuger zu dieser Zeit auch
    Wärme liefert. Liegt der Start vor der Heizzeit, die am Kessel
    eingestellt ist, stelle die Heizzeit dort entsprechend früher.
