
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const ContactNumber=require("../Contacts/contactNumber.model")
const Email=require('../Contacts/email.model')

let userSchema = new Schema(
  {
    userName: {
      unique: true,
      require: true,
      type: String,
    },
    firstName: String,
    middleName:String,
    lastName: String,
    passwordHash: {
      require: true,
      type: String
    },
    permanentAddress: {
      type: String,
      required:true,
    },
    tempAddress: [String],
    gender: {
      type: String,
      default:"notSpecified",
      enum: ["male", "female", "others","notSpecified"],
    },
    primaryContactNumber: {
      type:ContactNumber,
      require:true,
      default:()=>({})
    },
    contactNumbers:[{
      type:ContactNumber,
      default:()=>([])
    }],
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