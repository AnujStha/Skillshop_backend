const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

let manpowerSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
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
        ref:'availableJob'
    }]
})
const ManpowerModel=Mongoose.model('manpower', manpowerSchema);
module.exports = ManpowerModel;