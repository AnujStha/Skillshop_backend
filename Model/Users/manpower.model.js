const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

let manpowerSchema=new SCHEMA({
    user:{
        type:SCHEMA.Types.ObjectId,
        ref:"user"
    },
    servicesProvided:{
        type:SCHEMA.Types.ObjectId,
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
    availableLocations:{
        type:String
    },
    availableJobs:{
        type:SCHEMA.Types.ObjectId,
        ref:'availableJob'
    }
})
module.exports = mongoose.model('manpower', manpowerSchema);