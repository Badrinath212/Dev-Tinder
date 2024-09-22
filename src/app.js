const express = require('express');

const { connectionDB } = require('./config/database');

const app = express();

const User = require('./models/user');

const validator = require('validator');

const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');

const { userAuth } = require('./middlewares/auth');

const jwt = require('jsonwebtoken');

app.use(express.json());

app.use(cookieParser());


app.get('/profile', userAuth, async (req, res) => {

    try {
        res.send(req.user);

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password} = req.body;

        if(!email) {
            throw new Error("enter the email");
        }

        if(!validator.isEmail(email)) {
            throw new Error("Invalid email");
        }

        const user = await User.findOne({email});

        if(!user) {
            throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            throw new Error("Invalid credentials");

        } else {

            const user = await User.findOne({ email });

            const token = await jwt.sign({_id : user._id} , '20Sravs02@', { expiresIn : '2h'});

            res.cookie('token', token, { expires: new Date(Date.now() + 8 * 3600000) });

            res.send('login successfull');
        }
    } catch (err) {
        res.status(400).send('Error :' + err.message);
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
