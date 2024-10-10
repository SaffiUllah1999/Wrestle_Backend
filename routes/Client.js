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
  GetAllBlogs
} = require("../controllers/userController");

const Client = express.Router();

/* GET TODO */

Client.get('/GetNews',GetAllNews )
Client.get('/GetEvents', GetAllEvents )
Client.get('/GetBlogs', GetAllBlogs )

module.exports = Client;
