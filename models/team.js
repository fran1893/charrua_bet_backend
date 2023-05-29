"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.hasMany(models.Game, { foreignKey: "home_team_id" });
      Team.hasMany(models.Game, { foreignKey: "away_team_id" });
      Team.hasMany(models.Bet, { foreignKey: "team_id" });
    }
  }
  Team.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Team",
      tableName: "teams"
    }
  );
  return Team;
};
