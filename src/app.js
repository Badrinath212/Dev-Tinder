const express = require('express');

const app = express();

const { userAuth } = require("./middlewares/auth");

app.post("/user/login" , (req,res) => {
    res.send("welcome to the application");
})

app.use("/user", userAuth,(req, res, next) => {
        res.send("welcome to the application");
    }
)

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})