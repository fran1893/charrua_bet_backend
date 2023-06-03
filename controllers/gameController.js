const { Bet, Payment, Team, Game } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");

const gameController = {};

// GET ALL GAMES
gameController.getAll = async (req, res) => {
  try {
    const games = await Game.findAll({
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
    });
    sendSuccsessResponse(res, 200, games);
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.games.GETALL);
  }
};

module.exports = gameController;
