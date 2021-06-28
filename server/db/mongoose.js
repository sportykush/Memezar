const mongoose = require('mongoose');
require('dotenv').config();
function connect() {
    mongoose
        .connect('mongodb+srv://sportykush:' + process.env.DB_PASS + '@cluster0.bnnbv.mongodb.net/memezar?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
        .then( () => {
            console.log("Connected to the database!");
        })
        .catch( () => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}
module.exports = connect;
