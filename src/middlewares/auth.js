
const userAuth = (req, res, next) => {

    const token = "badri";

    const isAuthorized = token === "badri";

    if(!isAuthorized) {

        res.status(401).send("your are un-authorized!");

    } else {

        next();

    }
};

module.exports = {
    userAuth,
}