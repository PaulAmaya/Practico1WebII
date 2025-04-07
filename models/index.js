const { sequelize } = require("../config/db.config");
const burger = require("./burgerModel")(sequelize);
const restaurant = require("./restaurantModel")(sequelize);

burger.hasMany(restaurant, { 
    foreignKey: "restaurantId", 
    sourceKey: "id",
    as: "burgers"
});
restaurant.belongsTo(burger, { 
    foreignKey: "restaurantId", 
    as: "restaurant"
});

module.exports = {
    burger,
    restaurant,
    sequelize,
    Sequelize: sequelize.Sequelize,
};
