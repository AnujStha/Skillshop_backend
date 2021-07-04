const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

let serviceHistory=new SCHEMA({
    job:{
        type:SCHEMA.Types.ObjectId,
        ref:'job'
    },
    status:{
        type:String,
        enum:['running','pending','completed','cancelled']
    },
    manpower:{
        type:SCHEMA.Types.ObjectId,
        ref:"manpower"
    },
    client:{
        type:SCHEMA.Types.ObjectId,
        ref:"client"
    },
    review:{
        type:SCHEMA.Types.ObjectId,
        ref:"review"
    }
})
module.exports = mongoose.model('serviceHistory', serviceHistory);