const { placeBid } = require("../controllers/adminController");
const { FranchiseloginUser } = require("../controllers/franchiseController");
const express = require("express");
const Franchise = express.Router();
Franchise.post("/franchiselogin", FranchiseloginUser);
Franchise.post("/placeBid", placeBid);

module.exports = Franchise;
