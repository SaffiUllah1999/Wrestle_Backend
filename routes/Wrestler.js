const express = require("express");
const {
  deleteWrestlerUser,
  getWrestlerUsers,
  updateWrestlerUser,
  loginWrestlerUser,
  saveWrestlerUser,
  getWrestlerUser,
  participateWrestleEvent,
} = require("../controllers/wrestlerController");
const { getEventsByWrestlerEmail, UpdateProfile, getWrestleProfile } = require("../controllers/adminController");

const Wrestler = express.Router();

/* GET TODO */

/* GET TODO */
Wrestler.post("/Wrestlerlogin", loginWrestlerUser);

Wrestler.get("/Wrestlergetusers", getWrestlerUser);

/* ADD TODO */
Wrestler.post("/Wrestlerregister", saveWrestlerUser);

Wrestler.post("/WrestlerParticipate", participateWrestleEvent);

Wrestler.post("/getWrestlerMatches", getEventsByWrestlerEmail);

Wrestler.post("/updateProfile",UpdateProfile)

Wrestler.post("/getWrestleProfile",getWrestleProfile)

// Wrestler.get("/GetNews", GetAllNews);
// Wrestler.get("/GetEvents", GetAllEvents);
// Wrestler.get("/GetBlogs", GetAllBlogs);

module.exports = Wrestler;
