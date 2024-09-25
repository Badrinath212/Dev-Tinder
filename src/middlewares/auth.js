
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if(!token) {
            throw new Error('Token not valid!!!!');
        }

        const decodedObj = await jwt.verify( token, '20Sravs02@');
        const user = await User.findById( decodedObj._id );

        if(!user){
            throw new Error('user not found!');
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
};

module.exports = {
    userAuth,
}