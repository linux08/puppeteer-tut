const puppeteer = require('puppeteer')
const mailer = require('../services/mailer').transporter;


exports.getScreenShot = async (req, res) => {
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
        console.log('error', err.message);
        res.status(500).send(err.message);
    }
};


exports.sendEmail = async (req, res) => {
    var attachments = [{ filename: 'snapshot.png', path: __dirname + '/../assets/snapshot.png', contentType: 'application/png' }];
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