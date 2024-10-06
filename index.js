const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
const Auth = require("./routes/Authentication");
dotenv.config();

const PORT = 3000;

const uri =
  "mongodb+srv://saad:saad123@cluster1.b8xrg.mongodb.net/Wrestlemania?retryWrites=true&w=majority&appName=Cluster1";
/* MONGODB URL */
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect !");
  });

/* ROUTES */
app.use(Auth);

/* LISTENING */
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
