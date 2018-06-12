const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "we have 0 profile" }));

module.exports = router;
