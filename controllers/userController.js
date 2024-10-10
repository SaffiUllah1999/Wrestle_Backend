const AdminUsers = require("../models/AdminUser");
const AdminNews = require('../models/AdminNews')
const Users = require("../models/Users");
const AdminEvents = require("../models/AdminEvents");

/* GET ALL TODOS */
const getUser = async (req, res) => {
  const todo = await Users.find();
  res.send(todo);
};

/* SAVE A TODO */
const saveUser = async (req, res) => {
  const { name, email, password } = req.body; // Destructure the fields directly

  // const name = req.body.name

  // console.log("User registration data:", name);

  try {
    // Check for existing user
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ Error: "Email Already Exists!" });
    }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user

    const newUser = await Users.create({
      name: name,
      email: email,
      password: password,
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("email");

  // Validate input
  if (!email || !password) {
    return res.status(400).send({ Error: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await Users.findOne({ email });
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

/* UPDATE TODO */
const updateUser = async (req, res) => {
  const { _id, text } = req.body;
  Users.findByIdAndUpdate(_id, { text })
    .then(() => res.send("Todo updated successfully"))
    .catch((err) => console.log(err));
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({}); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Send an error response if something goes wrong
  }
};

/* DELETE TODO */
const deleteUser = async (req, res) => {
  const { _id } = req.body;
  Users.findByIdAndDelete(_id)
    .then(() => res.send("Todo deleted successfully"))
    .catch((err) => console.log(err));
};

const GetAllNews = async (req, res) => {
  try {
    const users = await AdminNews.find({}); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Send an error response if something goes wrong
  }
};

const GetAllEvents = async (req, res) => {
  try {
    const users = await AdminEvents.find({}); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Send an error response if something goes wrong
  }
};

module.exports = {
  deleteUser,
  updateUser,
  saveUser,
  getUser,
  loginUser,
  getUsers,
  GetAllNews,
  GetAllEvents
};
