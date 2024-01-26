const express = require("express");
const router = express.Router();

const {sendOTP, signUp, login, changePassword} = require("../controllers/auth");
const { auth } = require("../middlewares/Auth");
const{resetPasswordToken, passwordReset} = require("../controllers/ResetPassword")

router.post("/sendotp",sendOTP);
router.post("/signup",signUp);
router.post("/login",login);

router.post("/changePassword",auth,changePassword);
router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",passwordReset);

module.exports = router;