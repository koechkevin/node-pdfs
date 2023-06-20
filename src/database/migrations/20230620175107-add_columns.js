"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add columns to Equipments table
        await queryInterface.addColumn("Equipments", "mflCode", {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.addColumn("Equipments", "isLease", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        });

        await queryInterface.addColumn("Equipments", "furniture", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });

        await queryInterface.addColumn("Equipments", "personalNumber", {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.addColumn("Equipments", "phoneNumber", {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.changeColumn("Equipments", "status", {
            type: Sequelize.ENUM("working", "not working", "obsolete"),
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remove added columns from Equipments table
        await queryInterface.removeColumn("Equipments", "mflCode");
        await queryInterface.removeColumn("Equipments", "isLease");
        await queryInterface.removeColumn("Equipments", "furniture");
        await queryInterface.removeColumn("Equipments", "personalNumber");
        await queryInterface.removeColumn("Equipments", "phoneNumber");
        await queryInterface.changeColumn("Equipments", "status", {
            type: Sequelize.ENUM("working", "not working"),
            allowNull: false,
        });
    },
};
