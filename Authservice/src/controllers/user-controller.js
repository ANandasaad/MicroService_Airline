const { UserService } = require("../services/index.js");

const userService = new UserService();

const create = async (req, res, next) => {
  try {
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode;
    return res.status(statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
const userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const signIn = await userService.signIn(email, password);
    res.json({
      success: true,
      message: "User signed in successfully",
      data: signIn,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    res.json({
      success: true,
      message: "User is authenticated successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
const isAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const response = await userService.isAdmin(req.body.userId);
    res.json({
      success: true,
      message: "Successfully fetched  whether the user is admin or not",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
  getById,
  userSignIn,
  isAuthenticated,
  isAdmin,
};
