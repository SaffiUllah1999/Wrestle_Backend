const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  success_rate: {
    type: String,
    required: true,
  },
});

const Wrestler_Hall = mongoose.model("wrestlerHall_of_fame", userSchema);

module.exports = Wrestler_Hall;
