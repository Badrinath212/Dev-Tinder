const express = require('express');

const app = express();

app.use('/test', (req,res) => {
    res.send('Hello World!');
})

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})