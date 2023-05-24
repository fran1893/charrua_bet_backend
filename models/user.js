"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Workspace, { foreignKey: "workspace_id" });
      User.hasOne(models.Player, { foreignKey: "user_id" });
      User.hasOne(models.Administrator, { foreignKey: "user_id" });
      User.hasMany(models.Bet, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      workspace_id: DataTypes.INTEGER,
      role: DataTypes.ENUM("admin", "player"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
