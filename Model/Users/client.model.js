const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

let clientSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    servicesReceived:[{
        type:Schema.Types.ObjectId,
        ref:"task"
    }],
    location:[String],
})
module.exports = Mongoose.model('client', clientSchema);