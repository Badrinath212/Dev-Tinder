const express = require('express');

const app = express();

// But it is not good way to place the multiple route handlers in the single route.
app.use('/route', 
    (req, res, next) => {
        res.send("response 1");
        next()
    },
    (req, res, next) => {
        res.send("response 2");
        next();
    }, 
    (req, res, next) => {
        res.send("response 3");
        next();
    },
    (req, res, next) => {
        res.send("response 4");
    }
);

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})