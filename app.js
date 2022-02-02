require('dotenv').config();
require('./cronjobs');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const route = require('./routes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(fileUpload({
    createParentPath: true,
}));
app.use(express.json());

app.use(route);

module.exports = app;