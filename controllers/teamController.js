const { Team, Game } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");

const teamController = {};

teamController.getAll = async (req, res) => {
  try {
    const teams = await Team.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    sendSuccsessResponse(res, 200, teams);
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.teams.GETALL);
  }
};

module.exports = teamController;
