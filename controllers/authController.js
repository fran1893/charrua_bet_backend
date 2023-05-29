const { User } = require("../models");

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
    });

    sendSuccsessResponse(res, 200, {
      message: "User login succesfull",
      token: token,
      role: user.role,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMsg.authorization.LOGINFAILED, error);
  }
};
module.exports = authController;
