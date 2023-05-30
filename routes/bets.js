const betController = require("../controllers/betController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

router.get("/history-user", verifyToken, isPlayer, betController.historyUser)

module.exports = router;
