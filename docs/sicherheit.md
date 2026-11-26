# Sicherheit

Eine Heizung darf durch eine Software nicht kalt bleiben. Daran richtet sich
Heizzentrale aus.

- **Erst zeigen, dann schalten.** Zeitpläne, Abwesenheit und Öfen starten
  auf „Nur anzeigen“. Stränge und Pumpen werden in dieser Beta gar nicht
  geschaltet.
- **Im Zweifel warm.** Unbekannte oder nicht erreichbare Geräte zählen als
  anwesend. Nicht lesbare Thermostate halten ihren Strang offen. Ein Ofen
  ohne Messwert gilt als aus.
- **Von Hand hat Vorrang.** Eine Änderung am Thermostat bleibt bis zum
  nächsten Schaltpunkt. Eine Pumpengruppe in einem von Hand gewählten Modus
  wird nicht angefasst.
- **Nur Administratoren** können Zeitpläne, Regeln, Öfen, Sprache und
  Anordnung ändern.
- **Wenig Schreibzugriffe.** Auf die Speicherkarte wird nur geschrieben,
  wenn du etwas änderst oder wenn eine Regel tatsächlich etwas umstellt.
- **Keine Cloud.** Alles läuft in deinem Home Assistant. Die Ansicht lädt
  nichts von fremden Servern.

!!! warning "Beta"
    Verlasse dich in dieser Phase nicht allein auf Heizzentrale. Prüfe nach
    dem Einschalten von „Anwenden“ ein paar Tage, ob die Räume so warm
    werden, wie du es erwartest.
