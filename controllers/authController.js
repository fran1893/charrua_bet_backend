const { User, Player } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { hash, compareHash } = require("../_util/hash");
const { generateToken } = require("../_util/token");
const { isPasswordValidLength } = require("../_util/util");
const { errorMsg, successMsg } = require("../_util/messages");

const authController = {};

// LOGIN USUARIO
authController.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, errorMsg.authorization.REQUIERED);
  }

  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return sendErrorResponse(res, 404, errorMsg.authorization.BADCREDENTIALS);
    }
    const isValidPassword = compareHash(password, user.password);

    if (!isValidPassword) {
      return sendErrorResponse(res, 404, errorMsg.authorization.BADCREDENTIALS);
    }

    const token = generateToken({
      user_id: user.id,
      user_role: user.role,
      user_name: user.name,
      user_workspace: user.workspace_id,
    });

    sendSuccsessResponse(res, 200, {
      message: successMsg.authorization.LOGIN,
      token: token,
      role: user.role,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.authorization.LOGINFAILED, error);
  }
};

// REGISTRAR USUARIO (ADMIN)
authController.register = async (req, res) => {
  const { name, email, lastname, password } = req.body;
  const workspace_id = req.user_workspace;

  if (!isPasswordValidLength(password)) {
    return sendErrorResponse(res, 400, errorMsg.user.PASSWORDLEN);
  }

  const encryptedPassword = hash(password);

  const newUser = {
    name,
    lastname,
    password: encryptedPassword,
    email,
    workspace_id: workspace_id,
    role: "player",
  };

  try {
    let newPlayer = await User.create(newUser);
    await Player.create({ user_id: newPlayer.id, balance: 0 });
    sendSuccsessResponse(res, 201, successMsg.user.CREATE);
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.user.CREATE, error);
  }
};

module.exports = authController;
