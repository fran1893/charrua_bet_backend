'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "payments",
      [
        {
          amount: 2.5,
          workspace_id: 1,
          game_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 1.5,
          workspace_id: 2,
          game_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 2,
          workspace_id: 3,
          game_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
