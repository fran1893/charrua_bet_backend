"use strict";
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Antonio",
          lastname: "Rudiger",
          password: bcrypt.hashSync("12345678", 10),
          email: "antonio@antonio.com",
          workspace_id: 1,
          role: "player",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Walter",
          lastname: "Nelson",
          password: bcrypt.hashSync("12345678", 10),
          email: "walter@walter.com",
          workspace_id: 2,
          role: "player",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alfredo",
          lastname: "Mansala",
          password: bcrypt.hashSync("12345678", 10),
          email: "alfredo@alfredo.com",
          workspace_id: 3,
          role: "player",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Francisco",
          lastname: "Diaz",
          password: bcrypt.hashSync("12345678", 10),
          email: "francisco@francisco.com",
          workspace_id: 1,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Daniel",
          lastname: "Rubial",
          password: bcrypt.hashSync("12345678", 10),
          email: "daniel@daniel",
          workspace_id: 2,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alfonso",
          lastname: "Cuarón",
          password: bcrypt.hashSync("12345678", 10),
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
