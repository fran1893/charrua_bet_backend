"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "teams",
      [
        {
          name: "Real Madrid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Atlético de madrid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chelsea FC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Leeds United",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Arsenal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AFC Bournemount",
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
