
const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

let userSchema = new SCHEMA(
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
      type:SCHEMA.Types.ObjectId,
      ref:"contactNumber"
    },
    contactNumbers:[{
      type:SCHEMA.Types.ObjectId,
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
const userModel = MONGOOSE.model("user", userSchema);
module.exports = userModel;