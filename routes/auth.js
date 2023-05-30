const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();

// LOGIN
router.post("/login", authController.login);
// REGISTER PLAYER (ADMIN)
router.post("/register",verifyToken, isAdmin, authController.register);

module.exports = router;
