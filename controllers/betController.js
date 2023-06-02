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
              "createdAt",
              "updatedAt",
            ],
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
            exclude: ["id", "createdAt", "updatedAt"],
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
            exclude: ["id", "createdAt", "updatedAt"],
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

module.exports = betController;
