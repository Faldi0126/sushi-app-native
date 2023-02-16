'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = require('../db/ingredients.json');
    let dataResult = data.map(el => {
      const iniData = (el.name).map(e => {
        const data2 = {
          name: e, itemId: el.itemId, createdAt: new Date(),
          updatedAt: new Date()
        }
        return data2
      })
      return iniData
    })
    dataResult = dataResult.flat()
    await queryInterface.bulkInsert('Ingredients', dataResult);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Ingredients', {}, {});
  }
};
