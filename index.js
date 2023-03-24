const playwright = require("playwright-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async (event, context) => {
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://instagram.com");
  const pageTitle = await page.title();
  await browser.close();

  console.log(`Page title: ${pageTitle}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ pageTitle }),
  };
};
