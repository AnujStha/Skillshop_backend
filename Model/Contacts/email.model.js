const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

var emailSchema=new SCHEMA({
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
module.exports = mongoose.model('email', emailSchema);