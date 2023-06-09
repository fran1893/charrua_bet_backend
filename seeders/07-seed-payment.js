"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "payments",
      [
        // REAL MADRID VS ATLETICO (WSPACE 1)
        {
          amount: 2.5,
          workspace_id: 1,
          game_id: 1,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 1.5,
          workspace_id: 1,
          game_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // CHELSEA VS LEEDS (WSPACE 1)
        {
          amount: 1.5,
          workspace_id: 1,
          game_id: 2,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 4.5,
          workspace_id: 1,
          game_id: 2,
          team_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // ARSENAL VS BOURNEMOUNT (WSPACE 1)
        {
          amount: 1.5,
          workspace_id: 1,
          game_id: 3,
          team_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 3.5,
          workspace_id: 1,
          game_id: 3,
          team_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // REAL MADRID VS ATLETICO (WSPACE 2)
        {
          amount: 3.5,
          workspace_id: 2,
          game_id: 1,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 1.3,
          workspace_id: 2,
          game_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // CHELSEA VS LEEDS (WSPACE 2)
        {
          amount: 1.6,
          workspace_id: 2,
          game_id: 2,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 2.5,
          workspace_id: 2,
          game_id: 2,
          team_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // ARSENAL VS BOURNEMOUNT (WSPACE 2)
        {
          amount: 1.5,
          workspace_id: 2,
          game_id: 3,
          team_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 2.5,
          workspace_id: 2,
          game_id: 3,
          team_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },


        // REAL MADRID VS ATLETICO (WSPACE 3)
        {
          amount: 4.5,
          workspace_id: 3,
          game_id: 1,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 1.2,
          workspace_id: 3,
          game_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // CHELSEA VS LEEDS (WSPACE 3)
        {
          amount: 1.7,
          workspace_id: 3,
          game_id: 2,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 5.5,
          workspace_id: 3,
          game_id: 2,
          team_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // ARSENAL VS BOURNEMOUNT (WSPACE 3)
        {
          amount: 1.8,
          workspace_id: 3,
          game_id: 3,
          team_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 6.5,
          workspace_id: 3,
          game_id: 3,
          team_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payments", {
      [Op.or]: [{ workspace_id: 1 }, { workspace_id: 2 }, { workspace_id: 3 }],
    });
  },
};
