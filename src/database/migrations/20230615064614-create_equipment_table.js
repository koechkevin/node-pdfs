"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Equipments", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            facilityName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            subCounty: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            department: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM("working", "not working"),
                allowNull: false,
            },
            inventoryNo: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            make: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            serialNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            manufacturer: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            yearOfManufacture: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            dateOfService: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            nextServiceDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            supplier: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            procurementSource: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Equipments");
    },
};
//# sourceMappingURL=20230615060549-create_equipment_table.js.map
