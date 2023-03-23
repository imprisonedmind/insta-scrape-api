const express = require('express');
const bodyParser = require('body-parser');
const playwright = require('playwright-aws-lambda');

const app = express();
app.use(bodyParser.json());

app.post('/instagram', async (req, res) => {
  try {
    const link = req.body.link;

    if (!link.includes('instagram')) {
      return res.status(400).json({error: 'Not an Instagram link'});
    }

    const browser = await playwright.launchChromium({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    page.setDefaultTimeout(240000);

    await page.goto(link);

    const imgClass = 'img.x5yr21d.xu96u03.x10l6tqk.x13vifvy.x87ps6o.xh8yej3';
    const descClass = 'h1._aacl._aaco._aacu._aacx._aad7._aade';

    const image = await page.waitForSelector(imgClass);
    const imageUrl = await image.getAttribute('src');

    const desc = await page.waitForSelector(descClass);
    const descText = await desc.innerText();

    await browser.close();

    return res.status(200).json({imageUrl, descText});
  } catch (error) {
    console.error(error);
    return res.status(400).json({error: error.message});
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
