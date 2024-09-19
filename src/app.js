const express = require('express');

const app = express();

const { userAuth } = require("./middlewares/auth");

app.use("/user", (req, res, next) => {
        throw new Error("haha");
        res.send("welcome to the application");
    }
);

app.use("/", (err, req, res, next) => {
    res.status(500).send("please contact administator!");
})

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})