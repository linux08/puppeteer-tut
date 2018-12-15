// import environmental variables from our .env file
require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const routes = require('./routes');
const cron = require("node-cron");
const mailer = require('./services/mailer').transporter;
const tasks = require('./tasks');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);

if (major < 7 || (major === 7 && minor <= 5)) {
    console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
    process.exit();
}



app.set('port', (process.env.PORT || 3000));



// 0 0 0 * * *

//send user news update from ycombinator everyday
cron.schedule('0 */01 * * * *', async function () {
    try {
        await tasks.getNews();
        const attachments = [{ filename: 'snapshot.png', path: __dirname + '/assets/snapshot.png', contentType: 'application/png' }];
        const mailOptions = {
            from: process.env.email, // sender address
            to: 'Abimbola130@gmail.com', // list of receivers
            subject: 'Y-Combinator news daily updates', // Subject line
            attachments,
            // html: '<p>Your html here</p>'// plain text body
        };
        mailer.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err.message)
            }
            else {
                console.log('sent');
            }
        });
        console.log('send news to user email');
    }
    catch (err) {
        console.log(err.message);
    }

});




app.use('/', routes);

const server = app.listen(app.get('port'), () => {
    console.log('server up and running', server.address().port);
});