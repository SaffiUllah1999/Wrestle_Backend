const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  wrestleName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  startingBid: {
    type: String,
    required: true,
  },
  currentBid: {
    type: String,
  },
  closingBid : {
    type: String,
  },
  startTime: {
    type: Date,
    required: true, // When bidding starts
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: true, // When bidding ends
  },
  status: {
    type: String,
    enum: ["active", "closed"], // Bidding status
    default: "active",
  },

});

const AdminBidding = mongoose.model("bidding", userSchema);

module.exports = AdminBidding;
