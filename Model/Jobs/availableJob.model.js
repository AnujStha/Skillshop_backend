
const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

var availableJobsSchema=new SCHEMA({
    job:{
        type:SCHEMA.Types.ObjectId,
        ref:'job'
    },
    price:{
        type:Number,
        require:true
    },
    priceType:{
        type:String,
        require:true,
        enum:['hourly','daily','total']
    }
})
module.exports = mongoose.model('availableJobs', availableJobsSchema);