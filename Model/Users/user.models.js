
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

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
      type: String
    },
    tempAddress: [String],
    primaryContactNumber: {
      type:Schema.Types.ObjectId,
      ref:"contactNumber",
      require:true
    },
    contactNumbers:[{
      type:Schema.Types.ObjectId,
      ref:"contactNumber"
    }],
    gender: {
      type: String,
      enum: ["male", "female", "others","notSpecified"],
      default:"notSpecified"
    },
    email: {
      type: String,
      unique: true,
      sparse: true
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
const userModel = Mongoose.model("user", userSchema);
module.exports = userModel;