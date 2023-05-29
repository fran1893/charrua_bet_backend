"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "administrators",
      [
        {
          user_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("administrators", {
      [Op.or]: [{ user_id: 4 }, { user_id: 5 }, { user_id: 6 }],
    });
  },
};
