const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  
  username: {
    type: String,
   
  },
  password: {
    type: String,

  },
});

const FranchiseUser = mongoose.model("franchise", userSchema);

module.exports = FranchiseUser;
