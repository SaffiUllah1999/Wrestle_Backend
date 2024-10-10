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

const AdminBlogs = mongoose.model("blogs", userSchema);

module.exports = AdminBlogs;
