import asyncHandler from "../middleware/asyncHandler.js";
import Users from "../models/userModel.js";
import { UserType } from "../utils/customTypes.js";
import generateToken from "../utils/generateToken.js";

//req.user;
//Getting from protect middleware

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    //Generating the jwt to pass it to the user
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

//@desc     Signing Up user
//@route    POST /api/users/
//@access   Public
const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await Users.create({ name, email, password });

    //Generating the jwt
    generateToken(res, newUser._id);

    res.json(newUser);
  } catch (error) {
    let errorMessage = error.message;

    if (errorMessage.includes("E11000")) {
      errorMessage = "Email is already in use!";
    } else if (errorMessage.includes("failed: password:")) {
      errorMessage = "Password must be at least 8 characters long!";
    } else {
      errorMessage = "Invalid user data";
    }

    throw new Error(errorMessage);
  }
});

//@desc     Logout user / Clear cookie
//@route    POST /api/users/logout
//@access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Logged out successfully!" });
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.json(user);
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user && req.body) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  try {
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(404);
    throw new Error("User not found!");
  }
});

//@desc     Get all users
//@route    GET /api/users/
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    const allUsers = await Users.find({});
    res.json(allUsers);
  } else {
    res.status(400).json({ message: "Please log in as admin!" });
  }
});

//@desc     Get user by Id
//@route    GET /api/users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user && req.params.id) {
    try {
      const fetchedUser = await Users.findById(req.params.id);
      res.json(fetchedUser);
    } catch (error) {
      res.status(404);
      throw new Error("User not found!");
    }
  } else {
    res.status(400).json({ message: "Please log in as admin!" });
  }
});

//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user && req.params.id) {
    try {
      const deletedUser = await Users.findByIdAndRemove(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      res.status(404);
      throw new Error("User not found!");
    }
  } else {
    res.status(400).json({ message: "Please log in as admin!" });
  }
});

//@desc     Updating user
//@route    PUT /api/users/:id
//@access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user && req.body) {
    const id = req.params.id;

    try {
      const updatedData: UserType = req.body;

      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(404);
      throw new Error("User not found!");
    }
  } else {
    res
      .status(400)
      .json({ message: "Please log in as admin! or Send Correct Data" });
  }
});

export {
  loginUser,
  signUpUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
