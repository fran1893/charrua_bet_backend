const {
  Player,
  User,
  Bet,
  Payment,
  Workspace,
  Game,
  Team,
} = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");

const betController = {};

// SHOW BET HISTORY USER
betController.historyUser = async (req, res) => {
  try {
    let player = await Player.findOne({
      where: { user_id: req.user_id },
    });

    let bets = await Bet.findAll({
      where: { player_id: player.id },
      attributes: {
        exclude: [
          "player_id",
          "game_id",
          "team_id",
          "payment_id",
          "workspace_id",
          "createdAt",
          "updatedAt",
        ],
      },
      include: [
        {
          model: Payment,
          attributes: {
            exclude: [
              "id",
              "workspace_id",
              "game_id",
              "team_id",
              "createdAt",
              "updatedAt",
            ],
          },
          include: {
            model: Team,
            attributes: {
              exclude: ["logo_url", "id", "createdAt", "updatedAt"],
            },
          },
        },
        {
          model: Workspace,
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
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
                exclude: ["logo_url", "createdAt", "updatedAt"],
              },
            },
            {
              model: Team,
              as: "away_team",
              attributes: {
                exclude: ["logo_url", "createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: Team,
          attributes: {
            exclude: ["logo_url", "id", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (!bets) {
      return sendErrorResponse(res, 404, errorMsg.bet.NOTFOUND);
    }

    sendSuccsessResponse(res, 200, bets);
  } catch (error) {
    return sendErrorResponse(res, 500, errorMsg.bet.GETALL, error);
  }
};

// GET BET BY ID
betController.geBetById = async (req, res) => {
  try {
    const betId = req.params.bet_id;
    const bet = await Bet.findByPk(betId, {
      attributes: {
        exclude: [
          "player_id",
          "game_id",
          "team_id",
          "payment_id",
          "workspace_id",
          "createdAt",
          "updatedAt",
        ],
      },
      include: [
        {
          model: Payment,
          attributes: {
            exclude: [
              "id",
              "workspace_id",
              "game_id",
              "team_id",
              "createdAt",
              "updatedAt",
            ],
          },
          include: {
            model: Team,
            attributes: {
              exclude: ["logo_url", "id", "createdAt", "updatedAt"],
            },
          },
        },
        {
          model: Workspace,
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
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
                exclude: ["logo_url", "createdAt", "updatedAt"],
              },
            },
            {
              model: Team,
              as: "away_team",
              attributes: {
                exclude: ["logo_url", "createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: Team,
          attributes: {
            exclude: ["logo_url", "id", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (!bet) {
      return sendErrorResponse(res, 404, errorMsg.bet.NOTFOUND);
    }
    sendSuccsessResponse(res, 200, bet);
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.bet.GET, error);
  }
};

// SHOW BET HISTORY OF THE WORKSPACE (ADMIN)
betController.historyAdmin = async (req, res) => {
  try {
    const bets = await Bet.findAll({
      where: { workspace_id: req.user_workspace },
      attributes: {
        exclude: [
          "player_id",
          "game_id",
          "team_id",
          "payment_id",
          "workspace_id",
          "createdAt",
          "updatedAt",
        ],
      },
      include: [
        {
          model: Player,
          attributes: {
            exclude: ["user_id", "balance", "createdAt", "updatedAt"],
          },
          include: {
            model: User,
            attributes: ["name", "email"],
          },
        },
        {
          model: Payment,
          attributes: {
            exclude: [
              "id",
              "workspace_id",
              "game_id",
              "createdAt",
              "updatedAt",
            ],
          },
        },
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
                exclude: ["logo_url", "createdAt", "updatedAt"],
              },
            },
            {
              model: Team,
              as: "away_team",
              attributes: {
                exclude: ["logo_url", "createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: Team,
          attributes: {
            exclude: ["id", "logo_url", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (!bets) {
      return sendErrorResponse(res, 404, errorMsg.bet.NOTFOUND);
    }

    sendSuccsessResponse(res, 200, bets);
  } catch (error) {
    return sendErrorResponse(res, 500, errorMsg.bet.GETALL, error);
  }
};

// MAKE A BET (PLAYER)
betController.makeBet = async (req, res) => {
  try {
    const { amount, game_id, team_id, payment_id } = req.body;
    const workspace_id = req.user_workspace;
    const player = await Player.findOne({
      where: { user_id: req.user_id },
    });

    const newBet = await Bet.create({
      amount: amount,
      player_id: player.id,
      game_id: game_id,
      team_id: team_id,
      payment_id: payment_id,
      workspace_id: workspace_id,
    });

    return sendSuccsessResponse(res, 200, successMsg.bet.CREATE);
  } catch (error) {
    return sendErrorResponse(res, 500, errorMsg.bet.CREATE, error);
  }
};

// FINALIZE A BET BY ID
betController.finalizeBet = async (req, res) => {
  try {
    const betId = req.params.bet_id;
    const userId = req.user_id;

    const bet = await Bet.findByPk(betId);
    const player = await Player.findOne({
      where: { user_id: userId },
    });
    // Check if bet belongs to player
    if (bet.player_id == player.id) {
      const updateGame = await Game.update(
        { result: "home", finished: "true" },
        { where: { id: bet.game_id } }
      );

      const payment = await Payment.findOne({
        where: { id: bet.payment_id },
      });
      const game = await Game.findOne({
        where: { id: bet.game_id },
      });

      // Check if player won or lost
      if (game.home_team_id == bet.team_id) {
        const amount = +player.balance + bet.amount * payment.amount;
        const addBalance = await Player.update(
          { balance: amount },
          { where: { id: player.id } }
        );
        if (addBalance == 1) {
          sendSuccsessResponse(res, 200, {message: successMsg.bet.WONBET, new_balance: amount});
        } else {
          sendErrorResponse(res, 500, errorMsg.balance.UPDATE);
        }
      } else if (game.home_team_id != bet.team_id) {
        const amount = +player.balance - bet.amount;
        const deductBalance = await Player.update(
          { balance: amount },
          { where: { id: player.id } }
        );

        if (deductBalance == 1) {
          sendSuccsessResponse(res, 200, {message: successMsg.bet.LOSTBET, new_balance: amount});
        } else {
          sendErrorResponse(res, 500, errorMsg.balance.UPDATE);
        }
      }
    }
  } catch (error) {
    sendErrorResponse(res, 500, "Unable to finalize bet", error);
  }
};

module.exports = betController;
