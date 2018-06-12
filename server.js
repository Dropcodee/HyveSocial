const express = require("express");
const mongoose = require("mongoose");
const users = require("./Routes/api/users");
const profile = require("./Routes/api/profile");
const posts = require("./Routes/api/posts");

const app = express();

const db = require("./config/keys").mongoURI;

app.get("/", (req, res) => {
  res.send("Hello baby");
});

// CONNECTION TO MONGODB
mongoose
  .connect(db)
  .then(() => console.log("connection sucessful"))
  .catch(err => console.log(err));
// END OF CONNECTION

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
