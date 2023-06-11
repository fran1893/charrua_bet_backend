const { Payment, Workspace, Bet, Game, Team } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");

const paymentController = {};

// ADD PAYMENT TO A GAME
paymentController.addPayment = async (req, res) => {
  try {
    const { amount, game_id, team_id } = req.body;

    await Payment.create({
      amount: amount,
      workspace_id: req.user_workspace,
      game_id: game_id,
      team_id: team_id,
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

// GET ALL PAYMENTS FROM A GAME BY ID
paymentController.getGamePayments = async (req, res) => {
  try {
    const gameId = req.params.game_id;
    const workspace_id = req.user_workspace;

    const gamePayments = await Payment.findAll({
      where: { workspace_id: workspace_id, game_id: gameId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Team,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (gamePayments.length > 0) {
      sendSuccsessResponse(res, 200, gamePayments);
    } else {
      sendErrorResponse(
        res,
        500,
        "There are no payments on that game or game does not exists"
      );
    }
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.payment.GETALL, error);
  }
};

// GET ALL PAYMENTS FROM THE WORKSPACE
paymentController.getPayments = async (req, res) => {
  try {
    const workspace_id = req.user_workspace;

    const payments = await Payment.findAll({
      where: { workspace_id: workspace_id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Game,
          attributes: {
            exclude: ["home_team_id", "away_team_id", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Team,
              as: "home_team",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Team,
              as: "away_team",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: Team,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    sendSuccsessResponse(res, 200, payments);
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.payment.GETALL);
  }
};

module.exports = paymentController;
