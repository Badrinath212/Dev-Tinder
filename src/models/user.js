
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 20
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value) {
            if(!['male','female','others'].includes(value.toLowerCase())){
                throw new Error("gender data is not valid!");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKBLMAiBYl34kLI5EWfGIlIf3nAenFcx6krT8J8uxiYb1TQfEMiuLXvB_7azZoF7ZBHDU&usqp=CAU",
    },
    about : {
        type : String,
        default : "This is a default description"
    },
    skills : {
        type : [ String ]
    },
},{ timestamps : true});

const User = mongoose.model("User", userSchema);

module.exports = User;