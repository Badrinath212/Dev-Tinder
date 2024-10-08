
const express = require('express');
const { validateSignUp } = require('../utils/validate');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const validator = require('validator');

authRouter.post('/signup', async (req, res) => {
    try {

        validateSignUp(req);

        const { firstName, lastName, email, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User({
            firstName,
            lastName,
            email,
            password : passwordHash
        });

        await user.save();
        const token = await user.getJWT();
        res.cookie('token', token, { expires: new Date(Date.now() + 8 * 3600000) });
        res.json({message: "user registered sucessfully", data: user});

    } catch (err) {
        res.status(400).send('ERROR: ' + err.messsage);
    }
});

authRouter.post('/login', async (req, res) => {
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

        const isValidPassword = await user.validatePassword( password );

        if(!isValidPassword) {
            throw new Error("Invalid credentials");

        } else {

            const token = await user.getJWT();

            res.cookie('token', token, { expires: new Date(Date.now() + 8 * 3600000) });

            res.send(user);
        }
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

authRouter.post('/logout', async (req, res) => {
    res.cookie('token', null, {
        expires : new Date(Date.now())
    });
    res.send('logout sucessfully!');
})

module.exports = authRouter;