// Takes demo screenshots of the card with invented values.
// Usage: serve the repository root on port 8765, then run
//   node frontend/demo/screenshots.cjs <output directory>
const { chromium } = require("playwright");

(async () => {
  const out = process.argv[2] || ".";
  const base = "http://127.0.0.1:8765/frontend/demo/index.html";
  const jobs = [
    ["hausansicht-tablet-hell", { width: 1024, height: 900 }, ""],
    ["hausansicht-tablet-dunkel", { width: 1024, height: 900 }, "?theme=dark&select=pump:pg"],
    ["hausansicht-handy", { width: 390, height: 844 }, ""],
    ["raum-angeklickt", { width: 1024, height: 900 }, "?select=room:r4"],
    ["raum-angeklickt-handy", { width: 390, height: 844 }, "?select=room:r9"],
    ["einrichtung-leer", { width: 390, height: 844 }, "?empty=1"],
    ["einrichtung-unterwegs", { width: 1024, height: 900 }, "?view=settings&partial=1"],
    ["einstellungen", { width: 1024, height: 900 }, "?view=settings"],
    ["einstellungen-handy-dunkel", { width: 390, height: 844 }, "?view=settings&theme=dark"],
    ["zeitplaene-abwesenheit", { width: 1024, height: 900 }, "?view=settings", "heizzentrale-control"],
    ["zeitplan-bearbeiten-handy", { width: 390, height: 844 }, "?view=settings&edit=schedule", "heizzentrale-control"],
    ["haus-anordnen", { width: 1024, height: 900 }, "?arrange=1"],
    ["haus-anordnen-handy", { width: 390, height: 844 }, "?arrange=1&theme=dark"],
    ["ofen-bearbeiten", { width: 1024, height: 900 }, "?view=settings&edit=stove", "heizzentrale-control"],
    ["abwesenheit-bearbeiten", { width: 1024, height: 900 }, "?view=settings&edit=rule&theme=dark", "heizzentrale-control"],
  ];
  const browser = await chromium.launch();
  for (const [name, viewport, query, part] of jobs) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
    page.on("pageerror", (error) => console.log(name, "ERROR", error.message));
    page.on("console", (message) => {
      if (message.type() === "error") console.log(name, message.text());
    });
    await page.goto(base + query);
    await page.waitForTimeout(1100);
    if (part) {
      await page.locator(part).screenshot({ path: `${out}/${name}.png` });
      await page.close();
      continue;
    }
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: !name.startsWith("raum") });
    await page.close();
  }
  await browser.close();
})();
