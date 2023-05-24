"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "games",
      [
        {
          home_team_id: 1,
          away_team_id: 2,
          result: "away",
          finished: "true",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          home_team_id: 3,
          away_team_id: 4,
          result: "home",
          finished: "true",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          home_team_id: 5,
          away_team_id: 6,
          result: "no result",
          finished: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};