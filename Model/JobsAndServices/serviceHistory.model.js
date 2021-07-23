const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

let serviceHistorySchema=new SCHEMA({
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
    review:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
})
let serviceHistory=MONGOOSE.model('serviceHistory', serviceHistorySchema);
module.exports = serviceHistory;