module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurants", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        logo: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false,
    });

    return Restaurant;
};