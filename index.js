const playwright = require("playwright-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async (event, context) => {
  const {link} = event

  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto(link,{waitUntil: "networkidle"});

  const pageTitle = await page.title();
  const img = await page.$(".x5yr21d.xu96u03.x10l6tqk.x13vifvy.x87ps6o.xh8yej3")
  const imgUrl = await img.getAttribute('src')

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({pageTitle, imgUrl}),
  };
};
