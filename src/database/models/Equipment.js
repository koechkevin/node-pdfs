const { DataTypes } = require("sequelize");

module.exports = sequelize => {
    const Equipment = sequelize.define("Equipments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        facilityName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subCounty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("working", "not working", "obsolete"),
            allowNull: false,
        },
        inventoryNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serialNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yearOfManufacture: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateOfService: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        nextServiceDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        procurementSource: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        depreciationRate: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        mflCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isLease: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        furniture: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        personalNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Equipment;
};
