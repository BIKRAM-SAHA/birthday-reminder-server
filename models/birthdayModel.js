const mongoose = require("mongoose");

const birthdaySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill required Details"],
    unique: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: [true],
  },
  dob: {
    type: Date,
    required: [true, "Please fill required Details"],
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("birthdayModel", birthdaySchema);
