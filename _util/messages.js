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
    NOTFOUND: "Bets not found",
  },
  balance: {
    UPDATE: "Error updating balance",
    REQUIRED: "Complete balance field correctly",
  },
  payment: {
    CREATE: "Error creating payment",
    UPDATE: "Error updating payment",
    DELETE: "Error deleting payment",
    GETALL: "Error retreiving all payments",
    NOTFOUND: "Payment not found",
    REQUIERED: "Complete payment fields correctly",
  },
  games: {
    CREATE: "Error creating game",
    UPDATE: "Error updating game",
    DELETE: "Error deleting game",
    GETALL: "Error retreiving all games",
    NOTFOUND: "Game not found",
    REQUIERED: "Complete game fields correctly",
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
    LOGIN: "User login successfull",
  },
  bet: {
    CREATE: "Bet created successfully",
    UPDATE: "Bet updated successfully",
    DELETE: "Bet deleted successfully",
  },
  balance: {
    UPDATE: "Updated balance successfully",
  },
  payment: {
    CREATE: "Payment created successfully",
    UPDATE: "Payment updated successfully",
    DELETE: "Payment deleted successfully",
  },
  games: {
    CREATE: "Game created successfully",
    UPDATE: "Game updated successfully",
    DELETE: "Game deleted successfully",
  }
};

module.exports = {
  errorMsg,
  successMsg,
};
