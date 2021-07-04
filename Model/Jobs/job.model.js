const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

var jobSchema=new SCHEMA({
    jobName:{
        type:String,
        require:true
    },
    jobCategory:{
        type:String,
        require:true
    },
    tags:[String]
})
module.exports = mongoose.model('job', jobSchema);