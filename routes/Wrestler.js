const express = require("express");
const {
  deleteWrestlerUser,
  getWrestlerUsers,
  updateWrestlerUser,
  loginWrestlerUser,
  saveWrestlerUser,
  getWrestlerUser,
} = require("../controllers/wrestlerController");

const Wrestler = express.Router();

/* GET TODO */

/* GET TODO */
Wrestler.post("/Wrestlerlogin", loginWrestlerUser);

Wrestler.get("/Wrestlergetusers", getWrestlerUser);

/* ADD TODO */
Wrestler.post("/Wrestlerregister", saveWrestlerUser);

// Wrestler.get("/GetNews", GetAllNews);
// Wrestler.get("/GetEvents", GetAllEvents);
// Wrestler.get("/GetBlogs", GetAllBlogs);

module.exports = Wrestler;
