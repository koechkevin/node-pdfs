"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Alter the column data type
        await queryInterface.changeColumn("Equipments", "value", {
            type: Sequelize.FLOAT,
        });
        await queryInterface.changeColumn("Equipments", "depreciationRate", {
            type: Sequelize.FLOAT,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Revert the column data type to INTEGER
        await queryInterface.changeColumn("Equipments", "value", {
            type: Sequelize.INTEGER,
        });
        await queryInterface.changeColumn("Equipments", "depreciationRate", {
            type: Sequelize.INTEGER,
        });
    },
};
