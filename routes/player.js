const playerController = require("../controllers/playerController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

// GET PLAYER INFO
router.get("/info", verifyToken, isPlayer, playerController.getPlayerInfo);
// GET ALL PLAYERS INFO BY WORKSPACE (ADMIN)
router.get(
  "/players_info",
  verifyToken,
  isAdmin,
  playerController.getAllPlayers
);
// UPDATE PLAYER BALANCE (ADMIN)
router.put(
  "/balance/:id_player",
  verifyToken,
  isAdmin,
  playerController.updateBalance
);
// DELETE PLAYER (ADMIN)
router.delete(
  "/delete/:id_player",
  verifyToken,
  isAdmin,
  playerController.deletePlayer
);

module.exports = router;
