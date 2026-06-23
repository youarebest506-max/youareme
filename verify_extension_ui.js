const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Test the popup
  await page.goto(`file://${path.resolve('/app/FocusFirst/popup.html')}`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/app/popup_screenshot.png' });
  console.log("Popup screenshot saved to /app/popup_screenshot.png");

  // Test the dashboard
  await page.goto(`file://${path.resolve('/app/FocusFirst/dashboard.html')}`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/app/dashboard_screenshot.png' });
  console.log("Dashboard screenshot saved to /app/dashboard_screenshot.png");

  // Test the blocked screen
  await page.goto(`file://${path.resolve('/app/FocusFirst/blocked.html')}`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/app/blocked_screenshot.png' });
  console.log("Blocked screen screenshot saved to /app/blocked_screenshot.png");

  await browser.close();
})();
