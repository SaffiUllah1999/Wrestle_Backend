const express = require("express");
const {
  uploadAdminNews,

  getUser,
  loginUser,
} = require("../controllers/adminController");
const AdminUsers = require("../models/AdminUser");

const Auth = express.Router();

/* GET TODO */
Auth.post("/adminlogin", loginUser);

Auth.post("/adminUploadNews", uploadAdminNews);


/* ADD TODO */


module.exports = Auth;
