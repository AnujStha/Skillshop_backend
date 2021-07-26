const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const User=require("./user.model")
const AvailableServices=require("../JobsAndServices/availableService.model")

let manpowerSchema=new Schema({
    user:{
        type:User,
        default:()=>({}),
        require:true,
        unique:true
    },
    servicesProvided:{
        type:Schema.Types.ObjectId,
        ref:"tasksHistory"
    },
    citizenshipImage:String,
    availableDays:[{
        type:String,
        enum:['sun','mon','tue','wed','thu','fri','sat']
    }],
    currentStatus:{
        type:String,
        enum:['available','busy','unavailable']
    },
    availableLocations:[String],
    availableJobs:[{
        type:Schema.Types.ObjectId,
        ref:'job'
    }]
})
const ManpowerModel=Mongoose.model('manpower', manpowerSchema);
module.exports = ManpowerModel;