const { Payment, Workspace, Bet, Game, Team } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");
const { where } = require("sequelize");

const paymentController = {};

// ADD PAYMENT TO A GAME
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

// UPDATE PAYMENT ON A GAME
paymentController.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.payment_id;
    const { amount } = req.body;
    const workspace_id = req.user_workspace;
    const payment = await Payment.findByPk(paymentId);

    if (workspace_id == payment.workspace_id) {
      const updatePayment = await Payment.update(
        { amount: amount },
        { where: { id: paymentId } }
      );
      if (updatePayment == 1) {
        return sendSuccsessResponse(res, 200, successMsg.payment.UPDATE);
      } else {
        return sendErrorResponse(res, 400, errorMsg.payment.REQUIERED);
      }
    } else {
      sendErrorResponse(res, 401, errorMsg.authorization.NOAUTH);
    }
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.payment.UPDATE, error);
  }
};

// DELETE PAYMENT
paymentController.deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.payment_id;
    const workspace_id = req.user_workspace;
    const payment = await Payment.findByPk(paymentId);

    if (workspace_id == payment.workspace_id) {
      const deletePayment = await Payment.destroy({ where: { id: paymentId } });

      if (deletePayment == 1) {
        return sendSuccsessResponse(res, 200, successMsg.payment.DELETE);
      } else {
        return sendErrorResponse(res, 400, errorMsg.payment.REQUIERED);
      }
    } else {
      sendErrorResponse(res, 401, errorMsg.authorization.NOAUTH);
    }
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.payment.DELETE, error);
  }
};

module.exports = paymentController;
