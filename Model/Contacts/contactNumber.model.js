const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var contactNumberSchema=new Schema({
    number:{
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
const contactNumber=Mongoose.model('contactNumber', contactNumberSchema);
module.exports = contactNumber;