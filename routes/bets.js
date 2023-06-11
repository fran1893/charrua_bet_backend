const betController = require("../controllers/betController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

// GET ALL BEYS (PLAYER)
router.get("/history-user", verifyToken, isPlayer, betController.historyUser);
// GET ALL WORKSPACE BETS (ADMIN)
router.get(
  "/history-workspace",
  verifyToken,
  isAdmin,
  betController.historyAdmin
);
// MAKE A BET (PLAYER)
router.post("/bet", verifyToken, isPlayer, betController.makeBet);
// GET BET BY ID
router.get("/bet/:bet_id", verifyToken, betController.geBetById);
// FINALIZE A BET BY ID
router.put("/bet/finalize/:bet_id", verifyToken, isPlayer, betController.finalizeBet);

module.exports = router;
