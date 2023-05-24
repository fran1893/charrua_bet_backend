"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.hasMany(models.Bet, { foreignKey: "game_id" });
    }
  }
  Game.init(
    {
      home_team_id: DataTypes.STRING,
      away_team_id: DataTypes.STRING,
      result: DataTypes.ENUM("home", "away", "draw", "no result"),
      finished: DataTypes.ENUM("true", "false"),
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
