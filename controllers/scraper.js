const puppeteer = require('puppeteer')


exports.getScreenShot = async (req, res) => {
    const webAddress = `https://${(req.query.address || 'medium')}.com`;
    console.log('webAddress', webAddress);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(webAddress);
        await page.screenshot({ path: `./assets/snapshot.png` });

        await browser.close();
        res.send('screenshot saved');
    }
    catch (err) {
        console.log('error', err.message);
        res.status(500).send(err.message);
    }
};
