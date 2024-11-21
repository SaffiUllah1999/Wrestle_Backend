const FranchiseUser = require("../models/FranchiseUser");

const FranchiseloginUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).send({ Error: "Email and password are required" });
    }
  
    try {
      // Find the user by email
      const user = await FranchiseUser.findOne({username});

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
          username: user.username,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };

  module.exports = {
    FranchiseloginUser,
  };