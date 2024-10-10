const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

});

const AdminEvents = mongoose.model("events", userSchema);

module.exports = AdminEvents;
