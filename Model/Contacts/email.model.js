const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var emailSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    isValidated:{
        type:Boolean,
        default:false,
    }
},
{
    timestamps:true
})
const emailModel=Mongoose.model('email', emailSchema);
module.exports = emailModel