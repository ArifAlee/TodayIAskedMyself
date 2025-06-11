const express = require("express")
const app = express()
const mongoose = require("mongoose")
const entrySeeds = require("./entrySeeds")
const userSeeds = require("./userSeeds")

const Entry = require("../models/entry")
const User = require("../models/users")

mongoose
  .connect("mongodb://127.0.0.1:27017/TodayIAskedMyself")
  .then(() => console.log("Connected to TIAM DB"))
  .catch((e) => console.log("error connecting to DB", e));

  const seedDB = async function(){

        for (let user of userSeeds) {
            const newUser = new User({...user})
            await newUser.save()
        }

        for(let entry of entrySeeds) {
            const newEntry = new Entry({...entry})
            await newEntry.save()
        }

}

seedDB().then(() => mongoose.connection.close())