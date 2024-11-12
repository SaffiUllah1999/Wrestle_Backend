const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image :{
    type: String,
    required: true,
  },

  category: {
    type: String,
    require: true,
  },
  date_Added: {
    type: String,
  },
});

const Products = mongoose.model("products", userSchema);

module.exports = Products;
