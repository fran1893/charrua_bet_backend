const playerController = require("../controllers/playerController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

// GET PLAYER INFO
router.get("/info", verifyToken, isPlayer, playerController.getPlayerInfo);
// UPDATE PLAYER BALANCE (ADMIN)
router.put("/balance/:id_player", verifyToken, isAdmin, playerController.updateBalance);

module.exports = router;
