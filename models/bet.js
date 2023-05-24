'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bet.init({
    amount: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bet',
  });
  return Bet;
};