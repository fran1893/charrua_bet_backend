const paymentController = require("../controllers/paymentController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();

// ADD PAYMENT TO A GAME
router.post("/create", verifyToken, isAdmin, paymentController.addPayment);
// UPDATE PAYMENT ON A GAME
router.put(
  "/update/:payment_id",
  verifyToken,
  isAdmin,
  paymentController.updatePayment
);
// DELETE PAYMENT
router.delete(
  "/delete/:payment_id",
  verifyToken,
  isAdmin,
  paymentController.deletePayment
);
// GET ALL PAYMENTS FROM A GAME BY ID
router.get("/game-payments/:game_id", verifyToken, paymentController.getGamePayments);

// GET ALL PAYMENTS OF THE WORKSPACE
router.get("/info", verifyToken, paymentController.getPayments);

module.exports = router;
