const AdminUsers = require("../models/AdminUser");
const Users = require("../models/Users");
const AdminNews = require("../models/AdminNews");
const AdminEvents = require("../models/AdminEvents");
const AdminBlogs = require("../models/AdminBlogs");
const Wrestler_Hall = require("../models/WrestlerHallfame");
const Products = require("../models/Products");
const AdminBidding = require("../models/AdminBidding");



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
  const { title, image, description } = req.body; // Destructure the fields directly

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
      title: title,
      image: image,
      description: description,
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const uploadAdminEvents = async (req, res) => {
  const { title, image, description, seats, venue } = req.body; // Destructure the venue field

  try {
    // Create the new event
    const newEvent = await AdminEvents.create({
      title: title,
      image: image,
      description: description,
      seats: seats,
      venue: venue, // Include the venue in the event creation
      wrestle1: "",
      wrestle2: "",
    });
    console.log("Event added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating event");
  }
};

const deleteAdminNews = async (req, res) => {
  const { eventId } = req.params; // Get the event ID from the route parameters

  console.log(req.params)

  try {
    // Find the event by ID
    const event = await AdminNews.findByIdAndDelete(eventId);

    if (!event) {
      // If event not found, return a 404 error
      return res.status(404).json({ status: false, message: "Event not found" });
    }

    // Delete the event
    // await event.destroy();

    console.log(`Event with ID ${event.title} deleted successfully!`);
    res.status(200).json({ status: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ status: false, message: "Error deleting event" });
  }
};


const deleteAdminEvent = async (req, res) => {
  const { eventId } = req.params; // Get the event ID from the route parameters

  console.log(req.params)

  try {
    // Find the event by ID
    const event = await AdminEvents.findByIdAndDelete(eventId);

    if (!event) {
      // If event not found, return a 404 error
      return res.status(404).json({ status: false, message: "Event not found" });
    }

    // Delete the event
    // await event.destroy();

    console.log(`Event with ID ${eventId} deleted successfully!`);
    res.status(200).json({ status: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ status: false, message: "Error deleting event" });
  }
};

const uploadAdminHallofFame = async (req, res) => {
  const { name, image, weight, success_rate } = req.body; // Destructure the fields directly

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

    const newUser = await Wrestler_Hall.create({
      name: name,
      image: image,
      weight: weight,
      success_rate: success_rate,
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const uploadAdminBlogs = async (req, res) => {
  const { title, image, description } = req.body; // Destructure the fields directly

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
      title: title,
      image: image,
      description: description,
    });
    console.log("User added successfully!");
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const deleteAdminBlogs = async (req, res) => {
  const { eventId } = req.params; // Get the event ID from the route parameters

  console.log(req.params)

  try {
    // Find the event by ID
    const event = await AdminBlogs.findByIdAndDelete(eventId);

    if (!event) {
      // If event not found, return a 404 error
      return res.status(404).json({ status: false, message: "Event not found" });
    }

    // Delete the event
    // await event.destroy();

    console.log(`Event with ID ${event.title} deleted successfully!`);
    res.status(200).json({ status: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ status: false, message: "Error deleting event" });
  }
};

const updateWrestle1 = async (req, res) => {
  const { _id, name } = req.body;

  try {
    // Check if the event exists
    const event = await AdminEvents.findById(_id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    // Update wrestle1
    event.wrestle1 = name;

    await event.save();

    console.log("Wrestle1 updated successfully!");
    res.status(200).json({ status: true, message: "Wrestle1 updated." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating wrestle1");
  }
};

const updateWrestle2 = async (req, res) => {
  const { _id, name } = req.body;

  try {
    // Check if the event exists
    const event = await AdminEvents.findById(_id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    // Update wrestle1
    event.wrestle2 = name;

    await event.save();

    console.log("Wrestle2 updated successfully!");
    res.status(200).json({ status: true, message: "Wrestle2 updated." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating wrestle1");
  }
};

const addProducts = async (req, res) => {
  try {
    const { name, price,image, category } = req.body;
    const date_Added = new Date().toISOString(); // Set the date added to the current date

    const product = new Products({
      name,
      price,
      image,
      category,
      date_Added,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding product", details: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
};

const createBid = async (req, res) => {
  const { wrestleName, image, startingBid, duration } = req.body; // `duration` in minutes

  try {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000); // Calculate end time

    const newBid = await AdminBidding.create({
      wrestleName,
      startingBid,
      image,
      currentBid: startingBid, // Initialize current bid
      startTime,
      endTime,
    });

    res.status(201).json({
      success: true,
      message: "Bid created successfully",
      data: newBid,
    });
  } catch (error) {
    console.error("Error creating bid:", error);
    res.status(500).json({ success: false, message: "Bid creation failed" });
  }
};

const getBidsByWrestleName = async (req, res) => {
  const { wrestleName } = req.query; // Get `wrestleName` from query parameters

  try {
    if (!wrestleName) {
      return res.status(400).json({
        success: false,
        message: "wrestleName query parameter is required",
      });
    }

    // Find bids with the given wrestleName
    const bids = await AdminBidding.find({ wrestleName });

    if (bids.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No bids found for wrestleName: ${wrestleName}`,
      });
    }

    res.status(200).json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bids",
    });
  }
};

const getBid = async (req, res) => {
  try {
    const bid = req.bid; // Retrieved by middleware
    res.status(200).json({ success: true, data: bid });
  } catch (error) {
    console.error("Error retrieving bid:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const checkBidStatus = async (req, res, next) => {
  const { bidId } = req.params;

  try {
    const bid = await AdminBidding.findById(bidId);

    if (!bid) {
      return res.status(404).json({ success: false, message: "Bid not found" });
    }

    const now = new Date();

    if (now > bid.endTime) {
      if (bid.status !== "closed") {
        // Update the bid status to closed
        bid.status = "closed";
        await bid.save();
      }
      return res.status(400).json({
        success: false,
        message: "Bidding time has expired",
      });
    }

    req.bid = bid; // Attach the bid to the request for further use
    next();
  } catch (error) {
    console.error("Error checking bid status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllBids = async (req, res) => {
  try {
    // Fetch all bids from the database
    const bids = await AdminBidding.find({});

    if (bids.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bids found",
      });
    }

    res.status(200).json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.error("Error fetching all bids:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bids",
    });
  }
};

const placeBid = async (req, res) => {
  const { _id, currentBid } = req.body;

  console.log(req.body)

  try {
    // Validate inputs
    if (!_id || !currentBid) {
      return res.status(400).json({
        success: false,
        message: "Bid ID and bid amount are required",
      });
    }

    // Fetch the current bid
    const existingBid = await AdminBidding.findById(_id);

    if (!existingBid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    // Check if the bid is still active
    const currentTime = new Date();
    if (currentTime > existingBid.endTime) {
      return res.status(400).json({
        success: false,
        message: "Bidding time has ended",
      });
    }

    // Validate bid amount
    if (Number(currentBid) <= Number(existingBid.currentBid)) {
      return res.status(400).json({
        success: false,
        message: "Bid amount must be higher than the current bid",
      });
    }

    // Update the current bid
    existingBid.currentBid = currentBid;
    await existingBid.save();

    res.status(200).json({
      success: true,
      message: "Bid placed successfully",
      data: existingBid,
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({
      success: false,
      message: "Error placing bid",
    });
  }
};





module.exports = {
  getBid,
  checkBidStatus,
  getUser,
  loginUser,
  getUser,
  uploadAdminHallofFame,
  uploadAdminNews,
  uploadAdminEvents,
  uploadAdminBlogs,
  updateWrestle1,
  updateWrestle2,
  addProducts,
  deleteAdminEvent,
  getAllProducts,
  createBid,
  getBidsByWrestleName,
  getAllBids,
  deleteAdminNews,
  deleteAdminBlogs,
  placeBid
};
