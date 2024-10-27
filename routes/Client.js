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
  BookSeats
} = require("../controllers/userController");

const Client = express.Router();

/* GET TODO */

Client.get('/GetNews',GetAllNews )
Client.get('/GetHallFame',GetHallFame )
Client.get('/GetEvents', GetAllEvents )
Client.get('/GetBlogs', GetAllBlogs )
Client.get('/Bookseats', BookSeats )


module.exports = Client;
