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
          logo_url:"https://charruabetbackend-production.up.railway.app//media/shields/real_madrid.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Atlético de madrid",
          logo_url:"https://charruabetbackend-production.up.railway.app//media/shields/atletico.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chelsea FC",
          logo_url:"https://charruabetbackend-production.up.railway.app//media/shields/chelsea.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Leeds United",
          logo_url:"https://charruabetbackend-production.up.railway.app//media/shields/leeds.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Arsenal",
          logo_url:"https://charruabetbackend-production.up.railway.app//media/shields/arsenal.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AFC Bournemount",
          logo_url:"https://charruabetbackend-production.up.railway.app//media/shields/bournemount.png",
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
