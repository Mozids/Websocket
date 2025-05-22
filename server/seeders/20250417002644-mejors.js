'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('majors', [
    {
      name: 'Pengembangan Perangkat Lunak dan Gim',
      alias: 'PPLG',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Teknik Komputer dan Jaringan',
      alias: 'TJKT',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Teknik Sepeda Motor dan Bisnis Sepeda Motor',
      alias: 'TBSM',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Hotel & Restaurant',
      alias: 'HR',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
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
