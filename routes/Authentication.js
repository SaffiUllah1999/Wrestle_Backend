const express = require("express");
const {
  deleteUser,
  updateUser,
  saveUser,
  getUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

const Auth = express.Router();

/* GET TODO */
Auth.post("/login", loginUser);

Auth.get("/getusers", getUsers);

/* ADD TODO */
Auth.post("/register", saveUser);

module.exports = Auth;
