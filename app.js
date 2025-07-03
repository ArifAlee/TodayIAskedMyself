if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sanitizeV5 = require("./utilities/mongoSanitizeV5.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utilities/expressError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users");
const helmet = require("helmet");
const questions = require("./questions");
const MongoStore = require("connect-mongo");

const { storeReturnTo } = require("./utilities/middleware");

const userRoute = require("./routes/journal");
const loginRegisterRoute = require("./routes/loginRegister");
const feedRoute = require("./routes/feed");

const dbUrl =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/TodayIAskedMyself";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to TIAM DB"))
  .catch((error) => console.log("Error connecting to Rimi DB", error));

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(sanitizeV5({ replaceWith: "_" }));

const secret = process.env.SECRET || "mveMjsu9p";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  secret,
});
store.on("error", (error) => {
  console.log("error connecting session to mongodb", error);
});

const sessionConfig = {
  store,
  name: "_tiam",
  secret: "tgyhtcRGc2cv",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, //extra security
    // secure:true  ---uncomment when live in production
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

//allow cross origin scripts
const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
];
const fontSrcUrls = [
  "https://fonts.gstatic.com/",
  "https://use.fontawesome.com/",
];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dzm6syibq/",
        "https://images.unsplash.com/",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

//Passport for authentication and sessions
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(storeReturnTo);
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.questionsArray = questions;
  next();
});

//Middleware for return back to previous url before clicking login button (/login)
// app.use((req, res, next) => {
//   if(req.originalUrl !== "/login" && req.method === "GET"){
//     req.session.returnTo = req.originalUrl;
//   }
//   next()
// })

const question = (q) => q[Math.floor(Math.random() * q.length)];

//ROUTES
app.use("/", loginRegisterRoute);
app.use("/feed", feedRoute);
app.use("/user", userRoute);
//HOME ROUTE
app.get("/", (req, res) => {
  const q = question(questions);
  res.render("home", { question: q });
});
app.post("/", (req, res) => {
  req.session.homeJournal = req.body;
  res.redirect("/register")
})

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
  console.log("LISTENING ON PORT 3000");
});
