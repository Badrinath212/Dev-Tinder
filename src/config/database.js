
const mongoose = require("mongoose");

const connectionDB = async () => {
    await mongoose.connect(
        "mongodb+srv://chandrabadrinathreddy:2XtRypUdYlVAkejb@node.vzfpw.mongodb.net/"
    );
}

module.exports = {
    connectionDB,
}