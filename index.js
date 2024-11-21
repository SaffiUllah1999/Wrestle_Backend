const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auth = require("./routes/Authentication");
const Admin = require("./routes/Admin");
const Client = require("./routes/Client");
const Wrestler = require("./routes/Wrestler");
const session = require("express-session");

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

const PORT = 3000;
const uri =
  "mongodb+srv://saad:saad123@cluster1.b8xrg.mongodb.net/Wrestlemania?retryWrites=true&w=majority&appName=Cluster1";

// Connect to MongoDB and drop the index after connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected successfully");

    // Drop the unique index on `event_id` in `bookings` collection
    const bookingCollection = mongoose.connection.collection("bookings");
    await bookingCollection.dropIndex("event_id_1").catch((error) => {
      console.log("Index not found or already removed:", error.message);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB:", err);
  });

app.use(
  session({
    secret: "your_session_secret", // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }, // Set `secure: true` in production with HTTPS
  })
);

const cron = require("node-cron"); // for closing the bid automatically
const AdminBidding = require("./models/AdminBidding");
const Franchise = require("./routes/Franchise");

cron.schedule("*/1 * * * *", async () => {
  // Runs every minute
  try {
    const now = new Date();
    const expiredBids = await AdminBidding.updateMany(
      { endTime: { $lte: now }, status: "active" },
      { $set: { status: "closed" } }
    );

    console.log(`${expiredBids.nModified} bids were closed due to expiry.`);
  } catch (error) {
    console.error("Error closing expired bids:", error);
  }
});

/* ROUTES */

app.use(Auth);
app.use(Admin);
app.use(Client);
app.use(Wrestler);
app.use(Franchise)

// Middleware to set up sessions

/* LISTENING */
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
