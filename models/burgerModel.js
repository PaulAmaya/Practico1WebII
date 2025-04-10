
module.exports =  (sequelize, Sequelize) => {

    const Burger = sequelize.define("burger", {
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.FLOAT,
        },
        description: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        restaurantId: {
            type: Sequelize.INTEGER,
            
        },
    }, {
        timestamps: false,
    });

    return Burger;
};
