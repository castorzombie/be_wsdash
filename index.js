const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/database');

const app = express();

dbConnection();

app.use( cors({ origin: true }) );

app.use( express.static('public') );

app.use( express.json() );

app.use( '/api/auth', require('./routes/auth') );

app.use( '/api/settings', require('./routes/settings') );

app.use( '/api/coins', require('./routes/coins') );

app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});
