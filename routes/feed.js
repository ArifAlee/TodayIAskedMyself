const express = require("express");
const router = express.Router();
const questions = require("../questions")


const Entry = require("../models/entry");

//for journal icon
const randomQuestion = (req, res, next) => {
  let random = Math.floor(Math.random() * questions.length)
  //add a check to database for duplicate questions
  req.question = questions[random]
  next()
}

router.get("/", randomQuestion, async (req, res) => {
  try {
    const feedEntries = await Entry.find({ status: "public" });
    const question = req.question;
    res.render("feed", {
      question,
      feedEntries,
      pinPartial: "./partials/pins/pin-"
    });
  } catch (error) {
    req.flash("error", "Unable to retrieve entries for feed");
    res.redirect("/");
  }
});

module.exports = router;
