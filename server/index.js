const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('./configs/cors.config.js');
const allRoutes = require('./routes/all.router.js');
const sessionConfig = require('./configs/session.config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Session Middleware
app.use(sessionConfig());

//Add CORS headers
app.use(cors);

//Router Middleware
app.use(allRoutes);

app.all('*',  (req, res) => {    
    res.status(404).send('Url not found');
});

console.log('Will start on port 3000')
app.listen(3000);