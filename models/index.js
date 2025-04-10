const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.burger = require("./burgerModel.js")(sequelize, Sequelize);
db.restaurant = require("./restaurantModel.js")(sequelize, Sequelize);

db.burger.belongsTo(db.restaurant, { 
    foreignKey: "restaurantId",
    as: "restaurant"
});
db.restaurant.hasMany(db.burger, { as: "burger" });

module.exports = db;