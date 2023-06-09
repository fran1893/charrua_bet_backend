"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Workspace, { foreignKey: "workspace_id" });
      Payment.hasMany(models.Bet, { foreignKey: "payment_id" });
      Payment.belongsTo(models.Game, { foreignKey: "game_id" });
      Payment.belongsTo(models.Team, { foreignKey: "team_id" });
    }
  }
  Payment.init(
    {
      amount: DataTypes.DECIMAL(11, 2),
      workspace_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
      team_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
    }
  );
  return Payment;
};
