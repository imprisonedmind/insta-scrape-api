const playwright = require('playwright-aws-lambda');

export default async function handler(req, res) {
  let browser = null;

  const link = req.body.link;
  if (!link.includes('instagram')) {
    throw new Error('Not an Instagram link');
  }

  try {
    browser = await playwright.launchChromium({headless: true});
    const context = await browser.newContext();

    const page = await context.newPage()
    await page.goto(link);

    // const imgClass = 'img.x5yr21d.xu96u03.x10l6tqk.x13vifvy.x87ps6o.xh8yej3'
    const descClass = 'h1._aacl._aaco._aacu._aacx._aad7._aade'

    // const image = await page.waitForSelector(imgClass)
    // const imageUrl = await image.getAttribute('src')
    const description = await page.waitForSelector(descClass)
    const descriptionText = await page.$eval(descClass, (el) =>
        el.innerText);

    await browser.close();
    res.status(200).json({description});
  } catch (error) {
    console.error(error);
    res.status(400).json({error: error.message});
  }
}
