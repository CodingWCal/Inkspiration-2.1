const express = require("express");
const app = express();
const port = process.env.PORT || 2121
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const commentRoutes = require("./routes/comments");
const projectRoutes = require("./routes/projects");

//Use .env file in config folder, had to change for render hosting settings
// require("dotenv").config({ path: "./config/.env" });
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening, added comment n art projects
app.use("/", mainRoutes);
app.use("/comment", commentRoutes);
app.use("/project", projectRoutes);


//Server Running
app.listen(port, () => {
  console.log("Server is running on 2121, you better catch it!");
});

//Test Users w Projects Added:
//calvindemo@ink.com
//123456789

//calvindemo2@ink.com
//1234
