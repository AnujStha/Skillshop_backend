const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const User=require("./user.model")

let clientSchema=new Schema({
    user:{
        type:User,
        default:()=>({}),
        require:true
    },
    servicesReceived:[{
        type:Schema.Types.ObjectId,
        ref:"task"
    }],
    availableLocation:[String],
})
const ClientModel=Mongoose.model('client', clientSchema);
module.exports = ClientModel;