"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "teams",
      [
        {
          name: "Real Madrid",
          logo_url:"http://localhost:3000/media/shields/real_madrid.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Atlético de madrid",
          logo_url:"http://localhost:3000/media/shields/atletico.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chelsea FC",
          logo_url:"http://localhost:3000/media/shields/chelsea.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Leeds United",
          logo_url:"http://localhost:3000/media/shields/leeds.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Arsenal",
          logo_url:"http://localhost:3000/media/shields/arsenal.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AFC Bournemount",
          logo_url:"http://localhost:3000/media/shields/bournemount.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("teams", {
      [Op.or]: [
        { name: "Real Madrid" },
        { name: "Atlético de madrid" },
        { name: "Chelsea FC" },
        { name: "Leeds United" },
        { name: "Arsenal" },
        { name: "AFC Bournemount" },
      ],
    });
  },
};
