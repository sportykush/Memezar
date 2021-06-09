const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memeschema= new Schema({
    name:{
        type: String,
        required : true
    },
    caption:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    reg_time: {
        type: String,
        default: null
    },
    reg_date: {
        type: String,
        default: null
    }
    
});
const Memezar = mongoose.model('memezar', memeschema);
module.exports = Memezar;
