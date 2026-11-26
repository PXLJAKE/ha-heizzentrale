# Heizzentrale

Home Assistant custom integration that coordinates a hydronic heating system:
heat source, buffer, circuits and rooms. Early development, not ready for use.

Status: read only. You can describe your plant in the UI (heat source, buffer,
circuits, rooms), get the spread per circuit as sensors and see everything in
the house view card. The integration does not switch anything yet.

Add the card to a dashboard with:

```yaml
type: custom:heizzentrale-house-card
```

- License: Apache-2.0
- Changes: see [CHANGELOG.md](CHANGELOG.md)
- Frontend sources: `frontend/` (Lit, built with esbuild into
  `custom_components/heizzentrale/frontend/`)
