
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

let userSchema = new Schema(
  {
    userName: {
      unique: true,
      required: true,
      type: String
    },
    firstName: String,
    lastName: String,
    password: {
      required: true,
      type: String
    },
    address: {
      permanentAddress: {
        type: String
      },
      tempAddress: {
        type: Array
      }
    },
    primaryContactNumber: {
      type:Schema.Types.ObjectId,
      ref:"contactNumber"
    },
    contactNumbers:[{
      type:Schema.Types.ObjectId,
      ref:"contactNumber"
    }],
    gender: {
      type: String,
      enum: ["male", "female", "others"]
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