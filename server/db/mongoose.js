const mongoose = require('mongoose');
function connect() {
    mongoose
        .connect('mongodb+srv://sportykush:9826956831@cluster0.bnnbv.mongodb.net/memezar?retryWrites=true&w=majority', { useUnifiedTopology: true })
        .then( () => {
            console.log("Connected to the database!");
        })
        .catch( () => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}
module.exports = connect;