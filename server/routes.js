const express = require("express");
const router = express.Router();

// About page route.
router.get("/about", function (req, res) {
    res.send("About this wiki");
});

module.exports = router;
