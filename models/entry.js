const mongoose = require("mongoose");
const { Schema } = mongoose;
const {encrypt, decrypt} = require("../utilities/encryptor")

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
  type: String,
  required: true
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

entrySchema.pre("save", function(next){
  if(this.isModified("entry")){
    this.entry = encrypt(this.entry);
  }
  next();
})

entrySchema.methods.decryptEntry = function(){
  if (this.entry) {
    try {
      this.entry = decrypt(this.entry);
    } catch (err) {
      console.error("Decryption failed for entry ID:", this._id, err);
    }
  }
  return this;
}


const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;

//ADD COLOR AND PUBLIC
