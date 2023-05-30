const betController = require("../controllers/betController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

// OBTENER TODAS LAS APUESTAS (USUARIO)
router.get("/history-user", verifyToken, isPlayer, betController.historyUser);
// OBTENER TODAS LAS APUESTAS DEL WORKSPACE (ADMIN)
router.get(
  "/history-workspace",
  verifyToken,
  isAdmin,
  betController.historyAdmin
);

module.exports = router;
