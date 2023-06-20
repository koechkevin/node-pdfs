"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Equipments", "value", {
            type: Sequelize.INTEGER,
        });
        await queryInterface.addColumn("Equipments", "depreciationRate", {
            type: Sequelize.INTEGER,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Equipments", "value");
        await queryInterface.removeColumn("Equipments", "depreciationRate");
    },
};
