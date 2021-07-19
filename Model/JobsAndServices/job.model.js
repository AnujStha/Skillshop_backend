const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var jobSchema=new Schema({
    jobName:{
        type:String,
        require:true,
        unique:true
    },
    jobCategory:{
        type:String,
        require:true,
        default:"uncategorized"
    },
    tags:[String]
})
let jobModel=Mongoose.model('job', jobSchema);
module.exports = jobModel;