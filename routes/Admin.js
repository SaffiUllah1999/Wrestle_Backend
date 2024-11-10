const express = require("express");
const {
  uploadAdminNews,
  getUser,
  loginUser,
  uploadAdminEvents,
  uploadAdminBlogs,
  uploadAdminHallofFame,
  updateWrestle1,
  updateWrestle2,
  
} = require("../controllers/adminController");
const AdminUsers = require("../models/AdminUser");
const {
  deleteWrestlerUser,
  getWrestlerUsers,
  updateWrestlerUser,
  loginWrestlerUser,
  saveWrestlerUser,
  getWrestlerUser,
} = require("../controllers/wrestlerController");
const { GetEventById } = require("../controllers/userController");

const Auth = express.Router();

/* GET TODO */
Auth.post("/adminlogin", loginUser);

Auth.post("/adminUploadNews", uploadAdminNews);

Auth.post("/adminUploadEvents", uploadAdminEvents);

Auth.post("/adminUploadWrestlersHallFame", uploadAdminHallofFame);

Auth.post("/adminUploadBlogs", uploadAdminBlogs);

Auth.post("/adminUpdateUserStatus", updateWrestlerUser);

Auth.post("/adminDeleteWrestler", deleteWrestlerUser);

Auth.post("/adminUpdateWrestler1", updateWrestle1);

Auth.post("/adminUpdateWrestler2", updateWrestle2);

Auth.post("/getEventByID", GetEventById);



/* ADD TODO */

module.exports = Auth;
