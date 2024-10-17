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

  title: {
    type: String,
    required: true,
  },

  event_id: {
    type: String,
    required: true,
  },
});

const Wrestler_ApplyEvent = mongoose.model("participantsEvents", userSchema);

module.exports = Wrestler_ApplyEvent;
