module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/homeController.js");

    router.get("/", controller.showHome);
    router.get("/list/:id", controller.getBurgersByRestaurant);
    router.get("/burger/:id", controller.getBurgerDetails);

    
    app.use("/", router);
}