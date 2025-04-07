const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Burger = sequelize.define('Burger', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Burger;
};
