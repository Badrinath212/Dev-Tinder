const express = require('express');
const { connectionDB } = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', messageRouter);

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
