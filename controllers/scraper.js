const puppeteer = require('puppeteer')
const mailer = require('../services/mailer').transporter;


exports.getScreenShot = async (req, res) => {
    const { address } = req.query;
    // web address you want to screenshot , Default is medium.com
    const webAddress = `https://${(req.query.address || 'medium')}.com`;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(webAddress);
        await page.screenshot({ path: `./assets/snapshot.png` });
        await browser.close();
        res.send('screenshot saved');
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getNews = async (req, res) => {
    const { address } = req.query;
    const webAddress = `https://${(address || 'news.ycombinator')}.com`;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${webAddress}`, { waitUntil: 'networkidle2' });
        await page.pdf({ path: `./assets/news.pdf`, format: 'A4' });

        await browser.close();
        res.send('File saved');
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};


exports.sendEmail = async (req, res) => {
    const attachments = [{ filename: 'snapshot.png', path: __dirname + '/../assets/snapshot.png', contentType: 'application/png' }];
    const mailOptions = {
        from: process.env.email, // sender address
        to: 'Abimbola130@gmail.com', // list of receivers
        subject: 'Snapshot', // Subject line
        attachments,
        // html: '<p>Your html here</p>'// plain text body
    };
    mailer.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.send('File sent')
        }
    });
};

exports.scrapeTwittter = async (req, res) => {
    let ret = [];
    const { search } = req.query;
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto(`https://twitter.com/search?f=tweets&vertical=default&q=${search}&src=typd`);
        //set viewport for the autoscroll function
        await page.setViewport({
            width: 1200,
            height: 800
        });

        //scroll until twitter is done lazy loading
        // await autoScroll(page);
        //scrape the tweets
        const tweets = await page.evaluate(function () {
            //constant selector for the actual tweets on the screen
            const TWEET_SELECTOR = '.js-stream-tweet';

            //grab the DOM elements for the tweets
            let elements = Array.from(document.querySelectorAll(TWEET_SELECTOR));

            //create an array to return
            let ret = [];

            //get the info from within the tweet DOM elements
            for (var i = 0; i < elements.length; i += 1) {
                //object to store data
                let tweet = {};

                //get text of tweet
                const TWEET_TEXT_SELECTOR = ".tweet-text";
                tweet.text = elements[i].querySelector(TWEET_TEXT_SELECTOR).textContent;

                //get timestamp
                const TWEET_TIMESTAMP_SELECTOR = '.tweet-timestamp';
                tweet.timestamp = elements[i].querySelector(TWEET_TIMESTAMP_SELECTOR).getAttribute('title');

                //get tweet id
                const TWEET_ID_SELECTOR = 'data-tweet-id';
                tweet.id = elements[i].getAttribute(TWEET_ID_SELECTOR);

                //get likes/retweets
                const ACTIONS_SELECTOR = ".ProfileTweet-actionCountForPresentation";
                let actions = elements[i].querySelectorAll(ACTIONS_SELECTOR);

                //loop through the DOM elements for the actions
                for (var j = 0; j < actions.length; j += 1) {
                    //for some reason, retweets are the 2nd action and likes are the 4th
                    tweet.retweets = actions[1].innerHTML ? actions[1].innerHTML : 0;
                    tweet.likes = actions[3].innerHTML ? actions[3].innerHTML : 0;
                }

                //add tweet data to return array
                ret.push(tweet);
            }
            return ret;
        });

        //add to csv
        ret.push(tweets);
        //close the page
        await page.close();
        //close the browser
        await browser.close();
        res.send(ret);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};