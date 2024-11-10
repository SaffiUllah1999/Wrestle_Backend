const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  event_id: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    require: true,
  },
  date : {
    type: String,
  }
});

const UserBooking = mongoose.model("booking", userSchema);

module.exports = UserBooking;
