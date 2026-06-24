const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Test the 3D website
  await page.goto(`file://${path.resolve('/app/website/index.html')}`);
  await page.waitForTimeout(1000); // Wait for initial render and animations
  await page.screenshot({ path: '/app/website_screenshot.png' });
  console.log("Website screenshot saved to /app/website_screenshot.png");

  await browser.close();
})();
