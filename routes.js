const express = require('express');
const router = express.Router();
const Scraper = require('./controllers/scraper.js');

router.get('/snapshot', Scraper.getScreenShot);
router.get('/scrape-twitter', Scraper.scrapeTwittter);
router.get('/get-news', Scraper.getNews);

router.post('/sendemail', Scraper.sendEmail);


module.exports = router;