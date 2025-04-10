const db = require("../models");

exports.showHome = async function (req, res) {
  try {
    const restaurants = await db.restaurant.findAll();
    res.render("pages/home.ejs", { restaurants });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar los restaurantes");
  }
};

exports.getBurgersByRestaurant = async function (req, res) {
  const restaurantId = req.params.id;
  try {
    const restaurant = await db.restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).send("Restaurante no encontrado");

    const burgers = await db.burger.findAll({
      where: { restaurantId }
    });

    res.render("pages/burgerByRestaurant.ejs", { restaurant, burgers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener hamburguesas");
  }
};

exports.getBurgerDetails = async function (req, res) {
  const burgerId = req.params.id;

  try {
    const burger = await db.burger.findByPk(burgerId, {
      include: {
        model: db.restaurant,
        as: 'restaurant'
      }
    });

    if (!burger) return res.status(404).send("Hamburguesa no encontrada");

    res.render("pages/burgerDetails.ejs", { burger });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los detalles de la hamburguesa");
  }
};

