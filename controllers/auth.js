const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render('login.ejs', { message: req.flash('loginMessage') });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render('signup.ejs', { message: req.flash('signupMessage') });
};

exports.postSignup = async (req, res, next) => {
  console.log("Signup route hit or not:", req.body); //console log for signup route bugs
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 1 }))
    validationErrors.push({
      msg: "Password must be at least 1 character long",
    });

  if (validationErrors.length) {
    console.log("Validation error:", validationErrors);//logging for errors during new signup
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const existingUser = await User.findOne({ //existing user to find, checks for req email and UNIQUE username, and if already exists
      $or: [
        { email: req.body.email },
        { userName: req.body.userName }
      ]
});


    if (existingUser) {
      console.warn("User already exists:", existingUser.email); //console log for existing user
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    }

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save() //debugging console logs for saving users
      .then(() => console.log("New User was saved:", user.email)) 
      .catch(err => console.error("Error saving user:", err));

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging user after trying signup:", err);
        return next(err);
      }
      console.log("User logged in correctly:", user.email);
      res.redirect("/profile");
    });
  } catch (err) {
      console.error("Signup failed:", err);
    return next(err);
  }
};

//changed findOne and added in async await for PostSignUp ^

// exports.postSignup = (req, res, next) => {
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email))
//     validationErrors.push({ msg: "Please enter a valid email address." });
//   if (!validator.isLength(req.body.password, { min: 8 }))
//     validationErrors.push({
//       msg: "Password must be at least 8 characters long",
//     });
//   // if (req.body.password !== req.body.confirmPassword)
//   //   validationErrors.push({ msg: "Passwords do not match" });

//   if (validationErrors.length) {
//     req.flash("errors", validationErrors);
//     return res.redirect("../signup");
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   const user = new User({
//     userName: req.body.userName,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   User.findOne(
//     { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
//     (err, existingUser) => {
//       if (err) {
//         return next(err);
//       }
//       if (existingUser) {
//         req.flash("errors", {
//           msg: "Account with that email address or username already exists.",
//         });
//         return res.redirect("../signup");
//       }
//       user.save((err) => {
//         if (err) {
//           return next(err);
//         }
//         req.logIn(user, (err) => {
//           if (err) {
//             return next(err);
//           }
//           res.redirect("/profile");
//         });
//       });
//     }
//   );
// };
