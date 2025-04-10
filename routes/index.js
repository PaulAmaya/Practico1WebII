module.exports = app => {
    require("./burgerRoutes")(app);
    require("./restaurantRoutes")(app);
    require("./homeRoutes")(app);
}