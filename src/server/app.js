const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const validateAddress = require('./routes/validate-address-api');
const validateUser = require('./routes/validate-user-api');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/api', validateAddress);
app.use('/api', validateUser);



app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});



module.exports = app;