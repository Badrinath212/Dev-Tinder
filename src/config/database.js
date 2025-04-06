
const mongoose = require("mongoose");

console.log(process.env.DB_CONNECTION_URL);
const connectionDB = async () => {
    await mongoose.connect(
        process.env.DB_CONNECTION_URL
    );
}

module.exports = {
    connectionDB,
}