const express = require("express");
const router = express.Router();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

/* home page */
router.use("/", indexRouter);

/* authentication */
router.use("/auth", authRouter);

module.exports = router;
