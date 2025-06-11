const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const ejsMate = require("ejs-mate")
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash");
const ExpressError = require("./utilities/expressError");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")

const {storeReturnTo} = require("./middleware")

const userRoute = require("./routes/journal")
const loginRegisterRoute = require("./routes/loginRegister")
const feedRoute = require("./routes/feed")


mongoose .connect("mongodb://127.0.0.1:27017/TodayIAskedMyself")
.then(() => console.log("Connected to TIAM DB"))
.catch((error) => console.log("Error connecting to Rimi DB", error))

app.engine("ejs", ejsMate)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("index")
})



app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "thisisneededandneedstobebetter",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, //extra security
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash())

//Passport for authentication and sessions
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(storeReturnTo)
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()  
}); 


//Middleware for return back to previous url before clicking login button (/login)
// app.use((req, res, next) => {
//   if(req.originalUrl !== "/login" && req.method === "GET"){
//     req.session.returnTo = req.originalUrl;
//   }
//   next()
// })


//ROUTES
app.use("/", loginRegisterRoute)
app.use("/feed", feedRoute)
app.use("/user", userRoute)



app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});


//ERROR HANDLING
app.use((err, req, res, next) => {
  const { message = "Something went wrong", status = 500 } = err;
  if (!err.message) err.message = "Oh no! Something went wrong.";
  res.status(status).render("error", { err });
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})