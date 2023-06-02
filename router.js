const express = require("express");
const router = express.Router();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const betRouter = require("./routes/bets");
const playerRouter = require("./routes/player");
const paymentRouter = require("./routes/payment");

/* home page */
router.use("/", indexRouter);

/* authentication */
router.use("/auth", authRouter);

/* bets */
router.use("/bets", betRouter);

/* players */
router.use("/player", playerRouter);

/* players */
router.use("/payments", paymentRouter);

module.exports = router;
