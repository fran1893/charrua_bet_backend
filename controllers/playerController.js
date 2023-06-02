const { Player, User, Bet } = require("../models");
const { Op } = require("sequelize");

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
      include: {
        model: User,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });

    sendSuccsessResponse(res, 200, player);
  } catch (error) {
    return sendErrorResponse(res, 500, errorMsg.user.GET);
  }
};
// GET ALL PLAYERS INFO FROM THE SAME WORSKPACE  (ADMIN)
playerController.getAllPlayers = async (req, res) => {
  try {
    const players = await User.findAll({
      where: { workspace_id: req.user_workspace, id: { [Op.ne]: req.user_id } },
      attributes: {
        exclude: ["password", "workspace_id", "role", "createdAt", "updatedAt"],
      },
      include: {
        model: Player,
        attributes: {
          exclude: ["user_id", "createdAt", "updatedAt"],
        },
      },
    });
    return sendSuccsessResponse(res, 200, players);
  } catch (error) {
    return sendErrorResponse(res, 500, errorMsg.user.GETALL);
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
    sendErrorResponse(res, 500, errorMsg.balance.UPDATE, error);
  }
};

// DELETE PLAYER (ADMIN)
playerController.deletePlayer = async (req, res) => {
  try {
    const id_player = req.params.id_player;
    const player = await Player.findByPk(id_player);
    const user = await User.findByPk(player.user_id);

    if (user.workspace_id == req.user_workspace) {
      const deletePlayerBets = await Bet.destroy({
        where: { player_id: player.id },
      });
      const deletePlayer = await Player.destroy({ where: { id: id_player } });
      const deleteUser = await User.destroy({ where: { id: user.id } });

      if (deletePlayer == 1 && deleteUser == 1 && deletePlayerBets == 1) {
        sendSuccsessResponse(res, 200, successMsg.user.DELETE);
      } else {
        sendErrorResponse(res, 404, errorMsg.user.DELETE, error);
      }
    } else {
      sendErrorResponse(res, 403, errorMsg.authorization.NOAUTH);
    }
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.user.DELETE, error);
  }
};

module.exports = playerController;
