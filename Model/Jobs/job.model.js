const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var jobSchema=new Schema({
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
module.exports = Mongoose.model('job', jobSchema);