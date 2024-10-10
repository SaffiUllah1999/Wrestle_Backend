const AdminUsers = require("../models/AdminUser");
const Users = require("../models/Users");
const AdminNews = require("../models/AdminNews");
const AdminEvents = require("../models/AdminEvents");
const AdminBlogs = require("../models/AdminBlogs");

/* GET ALL TODOS */
const getUser = async (req, res) => {
  const todo = await Users.find();
  res.send(todo);
};

/* SAVE A TODO */

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("email");

  // Validate input
  if (!email || !password) {
    return res.status(400).send({ Error: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(401).send({ Error: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = password === user.password ? true : false;
    if (!isMatch) {
      return res.status(401).send({ Error: "Invalid email or password" });
    }

    // Create a JWT token (customize the payload as needed)
    // const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
    //   expiresIn: "1h", // Token expiration time
    // });

    // Send the token and user info (excluding password)
    res.status(200).json({
      status: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const uploadAdminNews = async (req, res) => {
  const {  title, image, description } = req.body; // Destructure the fields directly

  // const name = req.body.name

  // console.log("User registration data:", name);

  try {
    // Check for existing user
    // const existingUser = await Users.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).send({ Error: "Email Already Exists!" });
    // }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user

    const newUser = await AdminNews.create({
     
      title : title,
      image : image,
      description : description,
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const uploadAdminEvents = async (req, res) => {
  const {  title, image, description } = req.body; // Destructure the fields directly

  // const name = req.body.name

  // console.log("User registration data:", name);

  try {
    // Check for existing user
    // const existingUser = await Users.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).send({ Error: "Email Already Exists!" });
    // }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user

    const newUser = await AdminEvents.create({
     
      title : title,
      image : image,
      description : description,
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const uploadAdminBlogs = async (req, res) => {
  const {  title, image, description } = req.body; // Destructure the fields directly

  // const name = req.body.name

  // console.log("User registration data:", name);

  try {
    // Check for existing user
    // const existingUser = await Users.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).send({ Error: "Email Already Exists!" });
    // }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user

    const newUser = await AdminBlogs.create({
     
      title : title,
      image : image,
      description : description,
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

module.exports = { getUser, loginUser, getUser,uploadAdminNews,uploadAdminEvents,uploadAdminBlogs };
