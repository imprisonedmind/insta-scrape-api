const playwright = require('playwright-aws-lambda');

exports.handler = async (event) => {
  const link = event.link;
  if (!link.includes('instagram')) {
    throw new Error('Not an Instagram link');
  }

  try {
    const browser = await playwright.launchChromium({headless: true});
    const context = await browser.newContext();

    const page = await context.newPage();
    page.setDefaultTimeout(60000)
    await page.goto(link);

    const imgClass = 'img.x5yr21d.xu96u03.x10l6tqk.x13vifvy.x87ps6o.xh8yej3';
    const descClass = 'h1._aacl._aaco._aacu._aacx._aad7._aade';

    const image = await page.waitForSelector(imgClass);
    const imageUrl = await image.getAttribute('src')

    const desc = await page.waitForSelector(descClass);
    const descText = await desc.innerText()

    await browser.close();

    return {
      statusCode: 200,
      body: JSON.stringify({imageUrl, descText}),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify({error: error.message}),
    };
  }
};
