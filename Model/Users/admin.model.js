const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const User=require("./user.model")

let adminSchema=new Schema({
    user:{
        type:User,
        default:()=>({}),
        require:true
    },
    //todo: admin attributes
})
const AdminModel=Mongoose.model('admin', adminSchema);
module.exports = AdminModel;