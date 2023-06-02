const paymentController = require("../controllers/paymentController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();

router.post("/create", verifyToken, isAdmin, paymentController.addPayment);

module.exports = router;
