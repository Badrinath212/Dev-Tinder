const express = require('express');

const { connectionDB } = require('./config/database');

const app = express();

const User = require('./models/user');

app.use(express.json());

app.patch('/user/:userId', async (req, res) => {

    const userId = req.params.userId;

    try {
        const ALLOWED_UPDATES = [
            "age", "photoUrl", "about", "skills", "gender"
        ];

        const isUpdatedAllowed = Object.keys(req.body).every((key) => (
            ALLOWED_UPDATES.includes(key)
        ));

        if(!isUpdatedAllowed){
            throw new Error("Update cannnot be allowed!");
        }

        if(req.body.hasOwnProperty("skills") && req.body.skills.length>10){
            throw new Error("skills cannot be more than 10");
        }

        if(req.body.hasOwnProperty("about") && req.body.about.length>200){
            throw new Error("description length cannot be more than 200 words");
        }

        const user = await User.findOneAndUpdate({_id : userId}, req.body, {
            returnDocument : 'before',
            runValidators : true
        });
        res.send("updated sucessfully");
    } catch (err) {
        res.status(400).send("UPDATION FAILED : " + err.message);
    }
})

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted sucessfully");
    } catch (err) {
        res.status(400).send("something went wrong!");
    }
});

app.get('/user', async (req, res) => {
    const emailId = req.body.email;
    try {
        const users = await User.findOne({email : emailId});
        if(users.length === 0){
            res.status(404).send("user not found");
        } else{
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("somthing went wrong");
    }
});

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong!");
    }
})


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
