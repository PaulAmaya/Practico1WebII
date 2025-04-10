module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/burgerController.js");

    router.get("/", controller.listAllBurgers);
    router.get("/create", controller.createBurger);
    router.post("/create", controller.insertBurger);
    router.get("/:id", controller.getBurgerUpdate);
    router.post("/:id", controller.postBurgerUpdate);
    router.post("/:id/delete", controller.deleteBurger);

    app.use("/burgers", router);

};
