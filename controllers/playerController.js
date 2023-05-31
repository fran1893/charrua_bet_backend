const { Player, User } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { errorMsg, successMsg } = require("../_util/messages");

const playerController = {};

// GET PLAYER INFO
playerController.getPlayerInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user_id);

    const player = await Player.findByPk(user.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include:{
        model: User,
        attributes: {
          exclude: ["password","createdAt", "updatedAt"]
        }
      }
    });

    sendSuccsessResponse(res, 200, player);
  } catch (error) {
    return sendErrorResponse(res, 500, errorMsg.user.GET);
  }
};

// UPDATE BALANCE OF A PLAYER (ADMIN)
playerController.updateBalance = async (req, res) => {
  try {
    const player_id = req.params.id_player;
    const { balance } = req.body;
    const player = await Player.findByPk(player_id);
    const user = await User.findByPk(player.user_id);

    if (user.workspace_id == req.user_workspace) {
      const updateBalance = await Player.update(
        { balance: balance },
        { where: { id: player_id } }
      );

      if (updateBalance == 1) {
        return sendSuccsessResponse(res, 200, successMsg.balance.UPDATE);
      } else {
        return sendErrorResponse(res, 404, errorMsg.balance.REQUIRED);
      }
    } else {
      sendErrorResponse(res, 404, errorMsg.authorization.NOAUTH);
    }
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.balance.UPDATE);
  }
};

module.exports = playerController;
