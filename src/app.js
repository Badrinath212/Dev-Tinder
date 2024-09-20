const express = require('express');

const { connectionDB } = require('./config/database');

const app = express();

const User = require('./models/user');

app.use(express.json());

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User sucessfully registered!");
    }catch (err) {
        res.status(400).send("Error while saving the Data!"+err.message);
    }
})


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
