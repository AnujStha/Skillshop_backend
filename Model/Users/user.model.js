
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const ContactNumber=require("../Contacts/contactNumber.model")
const Email=require('../Contacts/email.model')

let userSchema = new Schema(
  {
    userName: {
      unique: true,
      require: true,
      type: String
    },
    firstName: String,
    middleName:String,
    lastName: String,
    password: {
      required: true,
      type: String
    },
    permanentAddress: {
      type: String,
      require:true
    },
    tempAddress: [String],
    primaryContactNumber: {
      type:ContactNumber,
      require:true,
      default:()=>({})
    },
    contactNumbers:[{
      type:ContactNumber,
      default:()=>([])
    }],
    gender: {
      type: String,
      enum: ["male", "female", "others","notSpecified"],
      default:"notSpecified"
    },
    email: {
      type: Email,
    },
    dob: Date,
    active: {
      type: Boolean,
      default: false
    },
    online: {
      type: Boolean,
      default: false
    },
    images: String,
  },
  {
    timestamps: true
  }
);
// const userModel = Mongoose.model("user", userSchema);
module.exports = userSchema;