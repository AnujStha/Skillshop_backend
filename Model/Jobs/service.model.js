
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

var availableServicesSchema=new Schema({
    job:{
        type:Schema.Types.ObjectId,
        ref:'job'
    },
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
module.exports = Mongoose.model('availableServices', availableServicesSchema);