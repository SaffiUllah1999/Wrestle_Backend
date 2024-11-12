const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auth = require("./routes/Authentication");
const Admin = require("./routes/Admin");
const Client = require("./routes/Client");
const Wrestler = require("./routes/Wrestler");

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

/* ROUTES */
app.use(Auth);
app.use(Admin);
app.use(Client);
app.use(Wrestler);

/* LISTENING */
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
