const AdminUsers = require("../models/AdminUser");
const AdminNews = require("../models/AdminNews");
const Wrestler_Users = require("../models/Wrestler_Users");
const AdminEvents = require("../models/AdminEvents");
const AdminBlogs = require("../models/AdminBlogs");
const Wrestler_ApplyEvent = require("../models/Wrestler_ApplyEvent");

/* GET ALL TODOS */
const getWrestlerUser = async (req, res) => {
  const todo = await Wrestler_Users.find();
  res.send(todo);
};

/* SAVE A TODO */
const saveWrestlerUser = async (req, res) => {
  const { name, email, password, image } = req.body; // Destructure the fields directly

  // const name = req.body.name

  // console.log("User registration data:", name);

  try {
    // Check for existing user
    const existingUser = await Wrestler_Users.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ Error: "Email Already Exists!" });
    }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user

    const newUser = await Wrestler_Users.create({
      name: name,
      email: email,
      password: password,
      image : image,
      profileStatus : "0" // 0 for notApproved & 1 for approved profile
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const loginWrestlerUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("email");

  // Validate input
  if (!email || !password) {
    return res.status(400).send({ Error: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await Wrestler_Users.findOne({ email });
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
    console.log(user)
    res.status(200).json({
      status: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        status: user.profileStatus
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

/* UPDATE TODO */

const updateWrestlerUser = async (req, res) => {
  const { email, status } = req.body;

  // Validate input
  if (!email || status === undefined) {
    return res.status(400).send({ Error: "Email and status are required" });
  }

  try {
    // Find the user by email and update their profile status
    const updatedUser = await Wrestler_Users.findOneAndUpdate(
      { email },
      { profileStatus: status },
    );

    if (!updatedUser) {
      return res.status(404).send({ Error: "User not found" });
    }

    // Send the updated user info (excluding password)
    res.status(200).json({
      status: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileStatus: updatedUser.profileStatus,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getWrestlerUsers = async (req, res) => {
  try {
    const users = await Wrestler_Users.find({}); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Send an error response if something goes wrong
  }
};

/* DELETE TODO */
const deleteWrestlerUser = async (req, res) => {
  const { email } = req.body;
  Wrestler_Users.findOneAndDelete(email)
    .then(() => res.send("Todo deleted successfully"))
    .catch((err) => console.log(err));
};

const participateWrestleEvent = async (req, res) => {
  const { _id, name, email , image } = req.body;


  try {
    // Check if the event exists
    const event = await AdminEvents.findById(_id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    // Check if the wrestler is already in the participants list
    const existingParticipant = event.participants.find(participant => participant.name === name);
    if (existingParticipant) {
      return res.status(409).send({ error: "Wrestler already participating" });
    }

    // Add wrestler name and email to participants
    event.participants.push({ name, email,image });

    await event.save();

    console.log("Wrestler added to participants successfully!");
    res.status(200).json({ status: true, message: "Wrestler added to event." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding wrestler to participants");
  }
};







module.exports = {
  deleteWrestlerUser,
  getWrestlerUsers,
  updateWrestlerUser,
  loginWrestlerUser,
  saveWrestlerUser,
  getWrestlerUser,
  participateWrestleEvent
};
