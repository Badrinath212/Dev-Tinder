const express = require('express');

const { connectionDB } = require('./config/database');

const app = express();

connectionDB()
    .then( () => {
        console.log("Database connnection sucessfully......");
        app.listen(5000, () => {
            console.log(`Server is listening on port 5000`);
        });
    })
    .catch (() => {
        console.log("Database cannot be connected!!");
    });
