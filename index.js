const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async (event, context) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
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
