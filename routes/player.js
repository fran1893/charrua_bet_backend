const playerController = require("../controllers/playerController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

router.get("/info", verifyToken, isPlayer, playerController.getPlayerInfo);

module.exports = router;
