'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reimburse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      employeeName: {
        type: Sequelize.STRING
      },
      departement: {
        type: Sequelize.STRING
      },
      bussinessPurpose: {
        type: Sequelize.STRING
      },
      reimburseProof: {
        type: Sequelize.STRING
      },
      totalCost: {
        type: Sequelize.FLOAT
      },
      approverId: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      dateFrom: {
        type: Sequelize.DATE
      },
      dateTo: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reimburse');
  }
};