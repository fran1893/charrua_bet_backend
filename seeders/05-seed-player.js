"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "players",
      [
        {
          balance: 200,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          balance: 600,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          balance: 0,
          user_id: 3,
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
