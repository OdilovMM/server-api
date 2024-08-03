const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    minLength: 3,
    maxLength: 15,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "seller"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
