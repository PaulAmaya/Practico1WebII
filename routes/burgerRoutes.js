module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/burger.controller.js");

    router.get("/", controller.getBurgerList);
    router.get("/create", controller.getBurgerCreate);
    router.post("/create", controller.postBurgerCreate);
    router.get("/:id", controller.getBurgerUpdate);
    router.post("/:id", controller.postBurgerUpdate);
    router.post("/:id/delete", controller.deleteBurger);

    app.use("/burgers", router);
};
