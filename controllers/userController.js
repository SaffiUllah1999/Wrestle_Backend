const AdminUsers = require("../models/AdminUser");
const AdminNews = require("../models/AdminNews");
const Users = require("../models/Users");
const AdminEvents = require("../models/AdminEvents");
const AdminBlogs = require("../models/AdminBlogs");
const Wrestler_Hall = require("../models/WrestlerHallfame");
const UserBooking = require("../models/UserBooking");

/* GET ALL TODOS */
const getUser = async (req, res) => {
  const todo = await Users.find();
  res.send(todo);
};

// Function to drop the unique email index
const dropEmailIndex = async () => {
  try {
    await UserBooking.collection.dropIndex("email_1");
    console.log("Dropped email unique index.");
  } catch (error) {
    if (error.codeName === 'IndexNotFound') {
      console.log("Index not found, nothing to drop.");
    } else {
      console.error("Error dropping index:", error);
    }
  }
};

// Call the function when starting the server
dropEmailIndex();

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

const GetHallFame = async (req, res) => {
  try {
    const users = await Wrestler_Hall.find({}); // Fetch all users from the database
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

const GetEventById = async (req, res) => {
  try {
    const eventId = req.params._id; // Get the event ID from the request parameters
    const event = await AdminEvents.findById(eventId); // Fetch the event from the database using _id
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" }); // If no event found, send 404 response
    }

    res.status(200).json(event); // Send the found event as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Send an error response if something goes wrong
  }
};


const GetAllBlogs = async (req, res) => {
  try {
    const users = await AdminBlogs.find({}); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Send an error response if something goes wrong
  }
};

const BookSeats = async (req, res) => {
 
  const { _id, name, email, seats } = req.body;

  try {
    // Find the event by ID
    const event = await AdminEvents.findById(_id);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check for seat availability
    if (event.seats < seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Update the available seats
    console.log(_id, name, email, seats, "Left Seats:", event.seats);
    event.seats -= seats;
    await event.save();

    // Check for existing booking
    const existingBooking = await UserBooking.findOne({ email, event_id: _id });
    if (existingBooking) {
      return res.status(400).json({  message: "You have already booked seats for this event." });
    }

    // Create a new booking with the current date in YYYY-MM-DDXX:XX format
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace("T", "").slice(0, 13) + ":" + currentDate.getMinutes().toString().padStart(2, '0'); // Format YYYY-MM-DDHH:MM

    const newBooking = await UserBooking.create({
      name,
      email,
      event_id: _id,
      seats: seats,
      date: formattedDate, // Use the formatted date
    });

    // Respond with success message and booking details
    res.status(201).json({ status:true, message: "Seats booked successfully", booking: newBooking });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error booking seats", error: error.message });
  }
};




const GetAllBookingsByEmail = async (req, res) => {
  console.log(req.body);
  const { email } = req.body; // Get the email from the route parameters

  try {
    // Fetch all bookings for the specified email
    const bookings = await UserBooking.find({ email }); // Optionally populate event details

    console.log(bookings);

    // Check if there are any bookings for the email
    if (bookings.length === 0) {
      return res
        .status(400)
        .json({ message: "No bookings found for this email." });
    }

    // Respond with the list of bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error retrieving bookings", error: error.message });
  }
};

module.exports = {
  GetHallFame,
  deleteUser,
  updateUser,
  saveUser,
  getUser,
  loginUser,
  getUsers,
  GetAllNews,
  GetAllEvents,
  GetAllBlogs,
  BookSeats,
  GetAllBookingsByEmail,
  GetEventById
};
