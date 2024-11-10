const express = require("express");
const {
  deleteUser,
  updateUser,
  saveUser,
  getUser,
  loginUser,
  getUsers,
  GetAllNews,
  GetAllEvents,
  GetAllBlogs,
  GetHallFame,
  BookSeats,
  GetAllBookingsByEmail,
} = require("../controllers/userController");

const Client = express.Router();

/* GET TODO */

Client.get("/GetNews", GetAllNews);
Client.get("/GetHallFame", GetHallFame);
Client.get("/GetEvents", GetAllEvents);
Client.get("/GetBlogs", GetAllBlogs);
Client.post("/Bookseats", BookSeats);
Client.post("/GetAllBookings", GetAllBookingsByEmail);

module.exports = Client;
