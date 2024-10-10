const express = require("express");
const {
  uploadAdminNews,
  getUser,
  loginUser,
  uploadAdminEvents,
  uploadAdminBlogs,
} = require("../controllers/adminController");
const AdminUsers = require("../models/AdminUser");

const Auth = express.Router();

/* GET TODO */
Auth.post("/adminlogin", loginUser);

Auth.post("/adminUploadNews", uploadAdminNews);

Auth.post("/adminUploadEvents", uploadAdminEvents);

Auth.post("/adminUploadBlogs", uploadAdminBlogs);

/* ADD TODO */

module.exports = Auth;
