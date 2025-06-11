const express = require("express");
const router = express.Router()
const passport = require("passport")
const User = require("../models/users")


router.route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post(passport.authenticate("local", {failureFlash:true, failureRedirect:"/login"}) , async(req, res) => {
        const { username } = req.body;
        req.flash("success", `Welcome back ${username}`)
        res.redirect(`/user/${username}/journal`);
    })

router.route("/register")
    .get((req, res) => {
        res.render("register")
    })
    .post(async(req, res, next) => {
        const {username, email, password} = req.body;
        const user = new User({username, email})
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (error) => {
            if (error) return next(error);
            req.flash("success", "Welcome to Rimi, your personal journal")
            res.redirect(`/user/${username}/journal`)
        })
    })

  router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
    if (err) return next(err);
    // const redirectUrl = res.locals.returnTo || res.locals.previousUrl || `/feed`
    req.flash("success", "You've been logged out");
    res.redirect("/feed");
  });
})


    module.exports = router;