const express = require('express');
const app = express();


require('dotenv').config();
require('./configuration/db')();
require('./configuration/routes')(app, express);


const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}`))