require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port } = require("./config");

const startServer = async () => {
    try {
        const app = express();
        app.use(cors());
        app.use(morgan('dev'));
        
        app.listen(port, () => {
            console.log('App is running!');
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();