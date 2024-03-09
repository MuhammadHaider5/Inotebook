const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUsers = require("../middleware/fetchUsers")
const JWT_SECRET = "HaiderkisecretKey";
// ROUTE 1: Create a Users using: POST "/api/auth/createUsers" . Login not required
router.post(
  "/createUsers",
  [
    body("name", "Enter A Valid Name").isLength({ min: 4 }),
    body("email", "Enter Your Valid Email").isEmail(),
    body("password", "Paswword must be atleast 6 character:").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user with this email is already exists
    try {
      let users = await Users.findOne({ email: req.body.email });
      if (users) {
        return res.status(400).json({success, error: "This email is already exists" });
      }
      // weak password convert in to secure password using hash algo to prevent from the hacker:
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create new users
      users = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: users.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      success = true;
      res.json({success, authToken });
      //   res.json(users);
      // cathes errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
    // .then(user => res.json(user)).catch(err=> {console.log(err)
    //     res.json({error:"please Enter the uniqe value",message: err.message})})
    // res.send(req.body);
  }
);
// ROUTE 2: Authentication of Users using: POST "/api/auth/login" . Login not required
router.post(
  "/login",
  [
    body("email", "Enter Your Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let users = await Users.findOne({ email });
      if (!users) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, users.password);
      if (!passwordcompare) {
        success = false
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }
      const data = {
        users: {
          _id: users.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error occured");
    }
  }
);
// ROUTE 3: Get loggedin Users Details using: POST "/api/auth/getusers" . Login Required
router.post(
  "/getUsers", fetchUsers, async (req, res) => {
    try {
      userId = req.user;
      const users = await Users.findById(userId).select("-password");
      res.send(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error occured");
    }
  }
);
module.exports = router;
