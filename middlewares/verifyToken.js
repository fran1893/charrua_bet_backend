const { getTokenFromHeader, decodedToken } = require("../_util/token");
const { sendErrorResponse } = require("../_util/sendResponse");
const { errorMsg } = require("../_util/messages");

const verifyToken = (req, res, next) => {
  const token = getTokenFromHeader(req.headers);

  if (!token) {
    return sendErrorResponse(res, 401, errorMsg.token.NOTFOUND);
  }

  try {
    const decoded = decodedToken(token);

    req.user_id = decoded.user_id;
    req.user_role = decoded.user_role;
    req.user_workspace = decoded.user_workspace;

    next();
  } catch (error) {
    sendErrorResponse(res, 400, errorMsg.token.NOTVALID, error);
  }
};

module.exports = verifyToken;
