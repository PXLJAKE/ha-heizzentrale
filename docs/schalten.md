# Was würde geschaltet

Heizzentrale rechnet laufend aus, welche Stränge gebraucht werden, und zeigt
das an. **In dieser Beta schaltet sie dabei nichts.** Du kannst in Ruhe
prüfen, ob ihre Entscheidungen zu deinem Haus passen.

![Würde jetzt schließen](assets/wuerde-schalten.webp){ loading=lazy }

## So entscheidet sie

**Ein Raum will Wärme**, wenn sein Thermostat an ist, kein Fenster offen ist
und es Heizen meldet. Meldet ein Thermostat das nicht, zählt, ob der Raum
mehr als 0,2 Grad unter seinem Soll liegt.

**Ein Strang wird gebraucht**, solange mindestens einer seiner Räume Wärme
will.

- Will kein Raum mehr Wärme, wartet sie **10 Minuten**. Erst dann steht am
  Strang „würde jetzt schließen“.
- Will ein Raum wieder Wärme, steht dort sofort „würde jetzt öffnen“.
- Ein Strang **ohne zugeordnete Räume** gilt immer als gebraucht.
- Ist ein Thermostat **nicht lesbar**, bleibt der Strang sicherheitshalber
  offen.

**Die Pumpengruppe wird gebraucht**, solange einer ihrer Stränge gebraucht
wird. Sind alle zu, steht dort „würde jetzt ausschalten“. Steht ihre
Steuer-Entität in einem Modus, den jemand von Hand gewählt hat, bleibt sie
unangetastet.

Ein Klick auf den Strang oder die Pumpengruppe nennt den Grund in Worten.

## Betriebsmodus

| Modus | Bedeutung |
| --- | --- |
| Aus | Heizzentrale zeigt nur Messwerte. |
| Beobachtet | Sie zeigt zusätzlich, was sie schalten würde. |

Einen aktiven Modus, der Stränge und Pumpen wirklich schaltet, gibt es noch
nicht. Er kommt erst, wenn sich die Vorschau im Alltag bewährt hat.
