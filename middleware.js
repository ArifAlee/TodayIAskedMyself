const Entry = require("./models/entry")
const { journalSchema } = require("./schemas");
const ExpressError = require("./utilities/expressError")



module.exports.validateEntry = (req, res, next) => {
  const { error } = journalSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    req.session.previousUrl = req.session.returnTo;
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in")
    return res.redirect("/login")
  }
  next()
}