require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port } = require('./config');
const database = require('./config/database');
const route = require('./routes');

const startServer = async () => {
    try {
        const app = express();
        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());

        app.use(route)
        await database.connect();
        app.listen(port, () => {
            console.log(`App is running on ${port}!`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();