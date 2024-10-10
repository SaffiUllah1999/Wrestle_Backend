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

const AdminNews = mongoose.model("news", userSchema);

module.exports = AdminNews;
