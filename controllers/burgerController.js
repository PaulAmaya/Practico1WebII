const db = require("../models/");
const path = require("path");

exports.getBurgerList = async (req, res) => {
    const burgers = await db.Burger.findAll({ include: db.Restaurant });
    res.render("pages/burgers/list.ejs", { burgers });
};

exports.getBurgerCreate = async (req, res) => {
    const restaurants = await db.Restaurant.findAll();
    res.render("pages/burgers/form.ejs", { burger: null, restaurants });
};

exports.postBurgerCreate = async (req, res) => {
    const { name, price, description, restaurantId } = req.body;
    let photoPath = "";

    if (req.files?.photo) {
        const image = req.files.photo;
        const imageName = Date.now() + path.extname(image.name);
        photoPath = `/images/${imageName}`;
        const savePath = path.join(__dirname, "..", "public", "images", imageName);
        await image.mv(savePath);
    }

    await db.Burger.create({ name, price, description, photo: photoPath, restaurantId });
    res.redirect("/burgers");
};

exports.getBurgerUpdate = async (req, res) => {
    const { id } = req.params;
    const burger = await db.Burger.findByPk(id);
    const restaurants = await db.Restaurant.findAll();
    if (!burger) return res.redirect("/burgers");

    res.render("pages/burgers/form.ejs", { burger, restaurants });
};

exports.postBurgerUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, restaurantId } = req.body;

    const burger = await db.Burger.findByPk(id);
    if (!burger) return res.redirect("/burgers");

    if (req.files?.photo) {
        const image = req.files.photo;
        const imageName = Date.now() + path.extname(image.name);
        burger.photo = `/images/${imageName}`;
        const savePath = path.join(__dirname, "..", "public", "images", imageName);
        await image.mv(savePath);
    }

    burger.name = name;
    burger.price = price;
    burger.description = description;
    burger.restaurantId = restaurantId;
    await burger.save();

    res.redirect("/burgers");
};

exports.deleteBurger = async (req, res) => {
    const { id } = req.params;
    const burger = await db.Burger.findByPk(id);
    if (!burger) return res.redirect("/burgers");
    await burger.destroy();
    res.redirect("/burgers");
};
