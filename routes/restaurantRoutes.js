module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/restaurantController.js");

    router.get("/", controller.getRestaurantList);
    router.get("/create", controller.getRestaurantCreate);
    router.post("/create", controller.postRestaurantCreate);
    router.get("/:id", controller.getRestaurantUpdate);
    router.post("/:id", controller.postRestaurantUpdate);
    router.post("/:id/delete", controller.deleteRestaurant);

    app.use("/restaurants", router);
};