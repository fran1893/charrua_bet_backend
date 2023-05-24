"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bet.belongsTo(models.Player, { foreignKey: "player_id" });
      Bet.belongsTo(models.Game, { foreignKey: "game_id" });
      Bet.belongsTo(models.Game, { foreignKey: "team_id" });
      Bet.belongsTo(models.Game, { foreignKey: "payment_id" });
    }
  }
  Bet.init(
    {
      amount: DataTypes.DECIMAL(11, 2),
      player_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
      team_id: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bet",
    }
  );
  return Bet;
};
