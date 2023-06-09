"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.belongsTo(models.User, { foreignKey: "user_id" });
      Player.hasMany(models.Bet, { foreignKey: "player_id" });
    }
  }
  Player.init(
    {
      balance: DataTypes.DECIMAL(11, 2),
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Player",
      tableName: "players"
    }
  );
  return Player;
};
