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
  age: {
    type:String,
  },
  bio: {
    type:String,
  },
  achievements: {
    type:String,
  },
  password: {
    type: String,
    required: true,
  },
  profileStatus: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Wrestler_Users = mongoose.model("wrestlerUsers", userSchema);

module.exports = Wrestler_Users;
