const express = require("express");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const { generateToken } = require("../token");

const CLIENT_URL = process.env.CLIENT_URL;

const userRouter = express.Router();
dotenv.config();

// REGISTER

userRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const password = req.body.password_1;
    const { username, email, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send({ message: "User already exist" });
      // throw new Error("User already exists");
    } else {
      const salt = 10;
      const hashPassword = await bcrypt.hash(password, salt);
      if (hashPassword) {
        const user = new User({
          username,
          email,
          phone,
          password: hashPassword,
        });
        if (user) {
          const result = await user.save();
          res.status(201).json({
            _id: result._id,
            username: result.username,
            email: result.email,
          });
        } else {
          res.status(400);
          throw new Error("Invalid User Data");
        }
      } else {
        res.status(500);
        throw new Error("Internal server error");
      }
    }
  })
);

// LOGIN

userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(user);
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        res.status(200);
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          token: generateToken(user._id),
          createdAt: user.createdAt,
        });
      } else {
        res.status(400).send({ message: "Invalid Password!" });
      }
    } else {
      res.status(404).send({ message: "Email does not exist!" });
    }
  })
);

// UPDATE PASSWORD
userRouter.post("/update/:id/password", async (req, res) => {
  const { password } = req.body;
  const id = req.params.id;

  const user = await User.findById(id);

  if (user) {
    const hashRounds = 10;
    const hashedPassword = await bcrypt.hash(password, hashRounds);

    if (hashedPassword) {
      user.password = hashedPassword;

      const updatedUser = await user.save();

      if (updatedUser) {
        res.status(200).json(updatedUser);
      }
    }
  } else {
    res.status(400).json({ message: "Invalid request!" });
  }
});

// // UPDATE PROFILE
// userRouter.put(
//   "/profile",
//   protect,
//   asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       const pass = req.body.password;
//       const saltRounds = 10;
//       const hashPassword = await bcrypt.hash(pass, saltRounds);

//       user.name = req.user.name || user.name;
//       user.password = hashPassword || user.password;

//       const updatedUser = await user.save();

//       res.json(updatedUser);
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   })
// );

module.exports = { userRouter };
