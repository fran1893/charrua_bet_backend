const express = require("express");
const router = express.Router();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const betRouter = require("./routes/bets");
const playerRouter = require("./routes/player");
const paymentRouter = require("./routes/payment");
const gameRouter = require("./routes/game");
const teamRouter = require("./routes/team");

/* home page */
router.use("/", indexRouter);

/* authentication */
router.use("/auth", authRouter);

/* bets */
router.use("/bets", betRouter);

/* players */
router.use("/player", playerRouter);

/* payments */
router.use("/payments", paymentRouter);

/* games */
router.use("/games", gameRouter);

/* teams */
router.use("/teams", teamRouter);

module.exports = router;
