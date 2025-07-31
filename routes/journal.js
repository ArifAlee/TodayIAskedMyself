const express = require("express");
const router = express.Router();
const { validateEntry, isLoggedIn } = require("../utilities/middleware");
const questions = require("../questions")
const User = require("../models/users");
const Entry = require("../models/entry");

const randomQuestion = (req, res, next) => {
  let random = Math.floor(Math.random() * questions.length)
  //add a check to database for duplicate questions
  req.question = questions[random]
  next()
}

const randomColor = (req, res, next) => {
  const colors = [
      "#a3cfbb",
      "#9ec5fe",
      "#ffe69c",
      "#cfe2ff",
      "#e2e3e5",
      "#d1e7dd",
      "#cff4fc",
      "#fff3cd",
      "#f8d7da",
      "#9eeaf9",
      "#f1aeb5",
      "#e9ecef",
    ]
    let random = Math.floor(Math.random() * colors.length)
    if(req.body?.journal?.color === "random") {
      req.body.journal.color = colors[random];
    }
    next()
}

router
  .route("/:username/journal")
  .get(isLoggedIn, randomQuestion, async (req, res) => {
    const { username } = req.params;
    const journalEntries = (await Entry.find({ username: username })).reverse();
    const entries = journalEntries.map(entry => entry.decryptEntry())
    req.session.user = username;
    const question = req.question
    res.render("journal", {entries, question });
  })
  .post(isLoggedIn, randomColor, validateEntry, async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username });
    const journal = req.body.journal;
    const entry = new Entry(journal);
    user.entries.push(entry);
    await entry.save();
    req.flash("success", "New journal entry added!");
    res.redirect(`/user/${entry.username}/journal`);
  });

router
  .route("/:username/journal/:entryId")
  .put(isLoggedIn, validateEntry, async (req, res) => {
    const { entryId, username } = req.params;
    const journal = req.body.journal;
    try{
    await Entry.findByIdAndUpdate(
      entryId,
      { ...journal },
      {runValidators:true, new: true}
    );
    console.log(journal)
    req.flash("success", "Entry updated")
    res.redirect(`/user/${username}/journal`);
    } catch(error) {
      req.flash("error", "Something went wrong, could not edit")
      return res.redirect(`/user/${username}/journal`)
    }
  })
  .delete(isLoggedIn, async (req, res) => {
    const { username, entryId } = req.params;
    try {
      await Entry.findByIdAndDelete(entryId);
      req.flash("success", "Entry deleted");
      res.redirect(`/user/${username}/journal`);
    } catch (error) {
      req.flash("error", "Something went wrong, could not delete");
      res.redirect(`/user/${username}/journal`);
    }
  });

module.exports = router; 
