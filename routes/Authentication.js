const express = require("express");
const {
  deleteUser,
  updateUser,
  saveUser,
  getUser,
  loginUser,
} = require("../controllers/userController");

const Auth = express.Router();

/* GET TODO */
Auth.post("/login", loginUser);

/* ADD TODO */
Auth.post("/register", saveUser);

module.exports = Auth;
