const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./Routes/api/users");
const profile = require("./Routes/api/profile");
const posts = require("./Routes/api/posts");

const app = express();

const db = require("./config/keys").mongoURI;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// end of body parser middleware

// PASSPORT MIDDLEWARE
app.use(passport.initialize());

// PASSPORT CONFIG USING THE JWT STRATEGY
require("./config/passport")(passport);
// END OF PASSPORT MIDDLEWARE

// CONNECTION TO MONGODB
mongoose
	.connect(db)
	.then(() => console.log("Mongodb connection successful"))
	.catch(err => console.log(err));
// END OF CONNECTION

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
const port = process.env.PORT || 3002;
// End of Routes

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
