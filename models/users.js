const mongoose = require("mongoose");
const {Schema} = mongoose;
const Entries = require("./entry")
const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new Schema ({
    email: {
        type:String,
        required: true,
        unique:true,
    },
    entries: [
        {
            type: Schema.Types.ObjectId,
            ref: "Entries"
        }
    ]
})

mongoose.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)