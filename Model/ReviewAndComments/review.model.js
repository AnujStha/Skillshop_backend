const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

let reviewSchema=new SCHEMA({
    reviewer:{
        type:SCHEMA.Types.ObjectId,
        ref:"user"
    },
    review:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
})
module.exports = reviewSchema;