const express = require('express');

const app = express();

app.put("/user", (req,res) => {
    res.send("sucessfully updated");
})

app.post("/user", (req,res) => {
    res.send("sucessfully updated");
})

app.get("/user", (req,res) => {
    res.send({FirstName : "Chandra", LastName : "Badrinath Reddy"});
})

app.delete("/user", (req,res) => {
    res.send("data deleted!");
})

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})