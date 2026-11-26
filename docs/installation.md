# Installation

Voraussetzung ist Home Assistant 2026.2 oder neuer.

## Über HACS

1. Öffne HACS in Home Assistant.
2. Wähle oben rechts das Menü mit den drei Punkten und dann
   **Benutzerdefinierte Repositories**.
3. Trage `https://github.com/PXLJAKE/ha-heizzentrale` ein und wähle als Typ
   **Integration**.
4. Suche in HACS nach **Heizzentrale** und lade sie herunter.
5. Starte Home Assistant neu.

!!! info "Beta-Versionen in HACS"
    Alle bisherigen Versionen sind Betas. HACS zeigt sie nur, wenn du beim
    Herunterladen eine Version auswählst oder in der Geräteseite von
    Heizzentrale unter HACS den Schalter für Vorabversionen einschaltest.

## Von Hand

1. Lade auf der Seite
   [Releases](https://github.com/PXLJAKE/ha-heizzentrale/releases) die Datei
   `heizzentrale.zip` der neuesten Version herunter.
2. Entpacke sie nach `config/custom_components/heizzentrale/`.
3. Starte Home Assistant neu.

## Hinzufügen

Gehe zu **Einstellungen**, **Geräte & Dienste**, **Integration hinzufügen**
und suche nach **Heizzentrale**. Gib deiner Anlage einen Namen. Danach geht
es mit der [Einrichtung](einrichtung.md) weiter.

Nach der Installation gibt es links in der Seitenleiste den Eintrag
**Heizzentrale**. Die Dashboard-Karte ist ebenfalls sofort verfügbar, mehr
dazu unter [Hausansicht](hausansicht.md).

## Aktualisieren

Über HACS wie jede andere Integration. Nach einem Update Home Assistant neu
starten und die Seite im Browser einmal neu laden, damit die neue Ansicht
geladen wird.
