const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());


const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
const Auth = require("./routes/Authentication");
const Admin = require("./routes/Admin")
const Client = require("./routes/Client");
const Wrestler = require("./routes/Wrestler");
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
app.use(Admin);
app.use(Client)
app.use(Wrestler)

/* LISTENING */
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
