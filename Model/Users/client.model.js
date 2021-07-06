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
    availableLocation:[String],
})
const ClientModel=Mongoose.model('client', clientSchema);
module.exports = ClientModel;