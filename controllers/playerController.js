const { Player, User } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");

const playerController = {};

playerController.getPlayerInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user_id);

    const player = await Player.findByPk(user.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    sendSuccsessResponse(res, 200, player);
  } catch (error) {
    return sendErrorResponse(res, 500, errorMsg.user.GET);
  }
};

module.exports = playerController;
