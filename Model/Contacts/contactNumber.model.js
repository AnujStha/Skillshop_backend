const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var contactNumberSchema=new Mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    isValidated:{
        type:Boolean,
        default:false,
    },
    isPrimary:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
})
module.exports = Mongoose.model('contactNumber', contactNumberSchema);