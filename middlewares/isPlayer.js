const { errorMsg } = require("../_util/messages");
const { sendErrorResponse } = require("../_util/sendResponse");

const isPlayer = (req, res, next) => {
   const { user_role } = req;

   if (user_role != "player") {
      return sendErrorResponse(res, 403, errorMsg.authorization.NOAUTH);
   } else next();
};

module.exports = isPlayer;