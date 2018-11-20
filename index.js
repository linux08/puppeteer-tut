const express = require('express');
const app = express();
const routes = require('./routes');

app.set('port', (process.env.PORT || 3000));

(() => {
    app.get("/", (req, res) => {
        console.log('API alive and kicking')
        res.status(200).send('Welcome to our restful API');
    });
})();




app.use('/', routes);

const server = app.listen(app.get('port'), () => {
    console.log('server up and running', server.address().port);
});