const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

let clientSchema=new SCHEMA({
    user:{
        type:SCHEMA.Types.ObjectId,
        ref:"user"
    },
    servicesReceived:[{
        type:SCHEMA.Types.ObjectId,
        ref:"task"
    }],
    location:[String],
})
module.exports = mongoose.model('client', clientSchema);