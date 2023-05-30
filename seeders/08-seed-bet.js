"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "bets",
      [
        {
          amount: 100,
          player_id: 1,
          game_id: 1,
          team_id: 1,
          payment_id: 1,
          workspace_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 200,
          player_id: 2,
          game_id: 1,
          team_id: 1,
          payment_id: 2,
          workspace_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 100,
          player_id: 2,
          game_id: 2,
          team_id: 4,
          payment_id: 2,
          workspace_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bets", {
      [Op.or]: [{ player_id: 1 }, { player_id: 2 }],
    });
  },
};
