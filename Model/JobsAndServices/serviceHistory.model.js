const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;
const ReviewSchema=require('./../ReviewAndComments/review.model')

let serviceHistory=new SCHEMA({
    job:{
        type:SCHEMA.Types.ObjectId,
        ref:'job'
    },
    status:{
        type:String,
        enum:['running','pending','completed','cancelled','waitingAccept']
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
        type:ReviewSchema,
    }
})
module.exports = mongoose.model('serviceHistory', serviceHistory);