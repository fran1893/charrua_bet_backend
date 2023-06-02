const { Payment, Workspace, Bet, Game, Team } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");

const paymentController = {};

paymentController.addPayment = async (req, res) => {
  try {
    const { amount, game_id } = req.body;

    await Payment.create({
      amount: amount,
      workspace_id: req.user_workspace,
      game_id: game_id,
    });

    sendSuccsessResponse(res, 200, successMsg.payment.CREATE);
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.payment.CREATE, error);
  }
};

module.exports = paymentController;
