# Vorlauf nach Bedarf

Die Heizkurve deines Wärmeerzeugers legt fest, wie heiß das Wasser in die
Heizkörper geht. Ist sie zu hoch eingestellt, geht Wärme in den Leitungen
verloren, der Puffer ist schneller leer und der Kessel startet öfter.

Heizzentrale kann eine Zahl deines Wärmeerzeugers in kleinen Schritten
nachstellen: runter, solange alle Räume warm werden, und wieder hoch, sobald
ein Raum zu kalt bleibt. **Sie lernt dabei nichts und rät nichts**, sondern
folgt den festen Regeln auf dieser Seite.

## Einrichten

Unter **Einstellungen, Vorlauf nach Bedarf**:

1. **Zahl wählen**, die die Heizkurve verschiebt. Das ist je nach Hersteller
   die Raum-Solltemperatur des Heizkreises, eine Parallelverschiebung oder
   eine Fernverstellung.
2. **Kleinsten und größten Wert** festlegen. Außerhalb davon stellt
   Heizzentrale nie etwas ein.
3. **Schrittweite** wählen, zum Beispiel 0,5.
4. Erst einmal auf **„Nur anzeigen“** lassen. Dort steht, was sie stellen
   würde und warum. Passt das ein paar Tage lang, stelle auf „Anwenden“.

!!! tip "ÖkoFEN Pellematic"
    Geeignet ist die Zahl `temp_heat` des Heizkreises (die Raumtemperatur,
    auf die die Heizkurve rechnet). Ein Grad weniger senkt den Vorlauf um
    etwa so viel, wie deine Heizkurve steil ist. Die Zahl `remote_override`
    lässt sich in Home Assistant nur ab 0 aufwärts stellen und eignet sich
    deshalb nicht zum Absenken.

## Die Regeln

| Was passiert | Was Heizzentrale tut |
| --- | --- |
| Ein Raum will Wärme und ist seit über 90 Minuten mehr als 0,5 Grad zu kalt | einen Schritt hoch |
| Nach einer Änderung | mindestens 60 Minuten warten, bevor es weiter hoch geht |
| 4 Stunden lang wollten Räume Wärme und keiner blieb zu kalt | einen Schritt runter |
| Nach einer Änderung | mindestens 4 Stunden warten, bevor es weiter runter geht |
| Kein Raum will Wärme | nichts, die Zeit zählt nicht |
| Der Wert ist nicht lesbar | nichts |

Hoch geht es also schnell, runter langsam. Die 90 Minuten decken auch das
normale Aufheizen nach einem Schaltpunkt ab, deshalb wird morgens nicht
sofort angehoben.

Räume, die aus sind oder deren Fenster offen ist, zählen nicht mit.

## Zurückstellen

Stellst du auf „Nur anzeigen“ zurück oder wählst eine andere Zahl, setzt
Heizzentrale die Zahl wieder auf den Wert, den sie vor ihrer ersten Änderung
hatte. Die letzten Änderungen stehen mit Uhrzeit in den Einstellungen.
