const express = require("express");
const {
  deleteUser,
  updateUser,
  saveUser,
  getUser,
  loginUser,
  getUsers,
  GetAllNews
} = require("../controllers/userController");

const Client = express.Router();

/* GET TODO */

Client.get('/GetNews',GetAllNews )

module.exports = Client;
