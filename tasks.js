const puppeteer = require('puppeteer');

exports.getNews = async () => {
    const webAddress = `https://news.ycombinator.com`;

    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto(`${webAddress}`, { waitUntil: 'networkidle2' });
        await page.pdf({ path: `./assets/news.pdf`, format: 'A4' });
        await browser.close();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};