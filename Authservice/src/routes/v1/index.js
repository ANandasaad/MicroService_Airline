const express = require("express");
const UserController = require("../../controllers/user-controller.js");
const { AuthRequestValidation } = require("../../middlewares/index.js");
const router = express.Router();

router.get("/auth",(req,res)=>{
  return res.json({
     message:"auth services"
   })
 })
router.post(
  "/signup",
  AuthRequestValidation.validateUserAuth,
  UserController.create
);
router.post(
  "/signIn",
  AuthRequestValidation.validateUserAuth,
  UserController.userSignIn
);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.get(
  "/isAdmin",
  AuthRequestValidation.validateIsAdminRequest,
  UserController.isAdmin
);

module.exports = router;
