const mongoose = require("mongoose");
const { Schema } = mongoose;


const entrySchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  entry: {
    type: String,
    required: true,
  },
  question: {
    type:[String]
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    enum: [
      "random",
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
    ],
  },
  status: {
    type: String,
    required: true,
  },
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;

//ADD COLOR AND PUBLIC
