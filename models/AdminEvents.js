const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  wrestle1: {
    type: String,
  },
  wrestle2: {
    type: String,
  },
  participants: [{ name: String, email: String }]
});

const AdminEvents = mongoose.model("events", userSchema);

module.exports = AdminEvents;
