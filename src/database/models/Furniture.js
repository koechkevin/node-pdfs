const { DataTypes } = require("sequelize");

const Furniture = sequelize =>
    sequelize.define(
        "Furniture",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            facility: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            equipmentId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "Equipment",
                    key: "id",
                },
            },
        },
        {
            tableName: "Furniture",
            timestamps: false,
        },
    );

Furniture.associate = models => {
    Furniture.belongsTo(models.Equipment, {
        foreignKey: "equipmentId",
    });
};

module.exports = Furniture;
