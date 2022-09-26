const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("userModel", userSchema);
