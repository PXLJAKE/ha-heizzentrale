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
  ];
  const browser = await chromium.launch();
  for (const [name, viewport, query] of jobs) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
    page.on("pageerror", (error) => console.log(name, "ERROR", error.message));
    page.on("console", (message) => {
      if (message.type() === "error") console.log(name, message.text());
    });
    await page.goto(base + query);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: !name.startsWith("raum") });
    await page.close();
  }
  await browser.close();
})();
