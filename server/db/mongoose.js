const mongoose = require('mongoose');
function connect() {
    mongoose
        .connect('mongodb+srv://sportykush:<password>@cluster0.bnnbv.mongodb.net/memezar?retryWrites=true&w=majority', { useUnifiedTopology: true })
        .then( () => {
            console.log("Connected to the database!");
        })
        .catch( () => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}
module.exports = connect;
