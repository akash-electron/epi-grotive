import { chromium } from "playwright-core";

async function shoot(url, width, out) {
  const browser = await chromium.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  // Scroll through slowly (down then up) to trigger IntersectionObserver
  // reveals + lazy images before capturing
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 150) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    for (let y = h; y >= 0; y -= 150) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log("saved", out);
}

const base = process.argv[2] || "http://localhost:3103/";
await shoot(base, 1440, "/tmp/epig-desktop.png");
await shoot(base, 390, "/tmp/epig-mobile.png");
