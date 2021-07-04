const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

var contactNumberSchema=new MONGOOSE.Schema({
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
module.exports = mongoose.model('contactNumber', contactNumberSchema);