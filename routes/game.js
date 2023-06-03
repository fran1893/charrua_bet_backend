const gameController = require("../controllers/gameController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const isPlayer = require("../middlewares/isPlayer");

const router = require("express").Router();

router.get("/get_all", gameController.getAll);

module.exports = router;
