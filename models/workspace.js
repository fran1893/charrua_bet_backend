"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Workspace.hasMany(models.User, { foreignKey: "workspace_id" });
      Workspace.hasMany(models.Payment, { foreignKey: "workspace_id" });
      Workspace.hasMany(models.Bet, {foreignKey: "workspace_id"})
    }
  }
  Workspace.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Workspace",
      tableName: "workspaces"
    }
  );
  return Workspace;
};
