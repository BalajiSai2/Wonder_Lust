const express=require('express');
const router = express.Router();
const User=require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const userController=require("../controllers/users.js");

router
    .route("/signup")
    .get( userController.renderSignupForm)
    .post( wrapAsync(userController.signup));


router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    userController.login);


router.get("/logout",userController.logout)

module.exports=router;


// router.get("/signup", userController.renderSignupForm);
// router.post("/signup", wrapAsync(userController.signup));
// router.get("/login", userController.renderLoginForm);
//before login we need to store redirect url other wise passport clears it
// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local", {
//         failureFlash: true,
//         failureRedirect: "/login",
//     }),
//     userController.login);