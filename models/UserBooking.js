const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  event_id: {
    type: String,
    required: true,
    unique: true,
  },
  seats: {
    type: Number,
    require: true,
  },
});

const UserBooking = mongoose.model("booking", userSchema);

module.exports = UserBooking;
