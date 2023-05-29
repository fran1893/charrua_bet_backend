"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "teams",
          key: "id",
        },
      },
      away_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "teams",
          key: "id",
        },
      },
      result: {
        type: Sequelize.ENUM("home", "away", "draw", "no result"),
        defaultValue: "no result",
      },
      finished: {
        type: Sequelize.ENUM("true", "false"),
        defaultValue: "false",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("games");
  },
};
