const global = require("../config/global");

const passMinLen = global.user.passwordMinLength;

const errorMsg = {
  user: {
    CREATE: "Error creating user",
    UPDATE: "Error updating user",
    DELETEALL: "Error deleting all users",
    DELETE: "Error deleting user",
    GETALL: "Error retreiving all users",
    GET: "Error retreiving user",
    NOTFOUND: "User not found",
    PASSWORDLEN: "Password length can not be less than " + passMinLen,
  },
  token: {
    NOTFOUND: "No authorization token was found",
    NOTVALID: "Invalid token",
  },
  authorization: {
    NOAUTH: "Dont have permission",
    BADCREDENTIALS: "Bad credentials",
    REQUIERED: "Email and Password are required",
    LOGINFAILED: "User login failed",
  },
  bet: {
    CREATE: "Error creating bet",
    UPDATE: "Error updating bet",
    DELETE: "Error deleting bet",
    GETALL: "Error retreiving bet history",
    GET: "Error retreiving bet",
    NOTFOUND: "Bets not found"
  }
};

const successMsg = {
  user: {
    CREATE: "User created succsessfully",
    UPDATE: "User updated succesfully",
    DELETEALL: "All users deleted succesfully",
    DELETE: "User deleted successfully",
  },
  authorization: {
    LOGIN: "User login successfull"
  },
  bet: {
    CREATE: "Bet created successfully",
    UPDATE: "Bet updated successfully",
    DELETE: "Bet deleted successfully",
  }
};

module.exports = {
  errorMsg,
  successMsg,
};
