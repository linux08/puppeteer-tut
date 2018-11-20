// import environmental variables from our .env file
require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const routes = require('./routes');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);

if (major < 7 || (major === 7 && minor <= 5)) {
    console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
    process.exit();
}


app.set('port', (process.env.PORT || 3000));

// (() => {
//     app.get("/", (req, res) => {
//         console.log('API alive and kicking')
//         res.status(200).send('Welcome to our restful API');
//     });
// })();




app.use('/', routes);

const server = app.listen(app.get('port'), () => {
    console.log('server up and running', server.address().port);
});