"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "workspaces",
      [
        {
          name: "Bet Barcelona",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apuestas Uruguay",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bet Estados Unidos",
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