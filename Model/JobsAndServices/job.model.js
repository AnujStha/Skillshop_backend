
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var jobSchema=new Schema({
    manpower:{
        type:Schema.Types.ObjectId,
        ref:'manpower',
        require:true
    },
    jobName:{
        type:String,
        require:true,
    },
    jobCategory:{
        type:String,
        default:"uncategorized"
    },
    tags:[String],
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

let jobModel=Mongoose.model('job',jobSchema)
module.exports = jobModel;