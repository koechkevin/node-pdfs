"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Furniture", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            imageUrl: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            facility: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            equipmentId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: "Equipments",
                    key: "id",
                },
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Furniture");
    },
};
