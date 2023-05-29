"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Antonio",
          lastname: "Rudiger",
          password: "12345678",
          email: "antonio@antonio.com",
          workspace_id: 1,
          role: "player",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Walter",
          lastname: "Nelson",
          password: "12345678",
          email: "walter@walter.com",
          workspace_id: 2,
          role: "player",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alfredo",
          lastname: "Mansala",
          password: "12345678",
          email: "alfredo@alfredo.com",
          workspace_id: 3,
          role: "player",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Francisco",
          lastname: "Diaz",
          password: "12345678",
          email: "francisco@francisco.com",
          workspace_id: 1,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Daniel",
          lastname: "Rubial",
          password: "12345678",
          email: "daniel@daniel",
          workspace_id: 2,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alfonso",
          lastname: "Cuarón",
          password: "12345678",
          email: "alfonso@alfonso",
          workspace_id: 3,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      [Op.or]: [{ workspace_id: 1 }, { workspace_id: 2 }, { workspace_id: 3 }],
    });
  },
};
