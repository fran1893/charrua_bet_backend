const gameController = require("../controllers/gameController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

// GET ALL GAMES
router.get("/get_all", gameController.getAll);

module.exports = router;
