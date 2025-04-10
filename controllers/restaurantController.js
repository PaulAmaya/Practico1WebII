const db = require("../models");
const path = require("path");

exports.getRestaurantList = function (req, res) {
    db.restaurant.findAll()
        .then(restaurants => {
            res.render('restaurants/list.ejs', { restaurants });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error al obtener restaurantes');
        });
};

exports.getRestaurantCreate = function (req, res) {
    res.render('restaurants/form.ejs', { restaurant: null });
};

exports.postRestaurantCreate = function (req, res) {
    const logo = req.files ? req.files.logo : null;

    db.restaurant.create({
        name: req.body.name,
        address: req.body.address,
        logo: null
    }).then(restaurant => {
        if (logo) {
            const imagePath = path.join(__dirname, '../public/images/restaurants/', `${restaurant.id}.jpg`);
            logo.mv(imagePath, function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error al mover el logo');
                }
                restaurant.logo = `/images/restaurants/${restaurant.id}.jpg`;
                return restaurant.save().then(() => res.redirect('/restaurants'));
            });
        } else {
            res.redirect('/restaurants');
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error al crear el restaurante');
    });
};

exports.getRestaurantUpdate = function (req, res) {
    const restaurantId = req.params.id;

    db.restaurant.findByPk(restaurantId)
        .then(restaurant => {
            if (!restaurant) {
                return res.status(404).send('Restaurante no encontrado');
            }
            res.render('restaurants/form.ejs', { restaurant });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error al obtener el restaurante');
        });
};

exports.postRestaurantUpdate = function (req, res) {
    const restaurantId = req.params.id;
    const { name, address } = req.body;
    const logo = req.files ? req.files.logo : null;

    db.restaurant.findByPk(restaurantId)
        .then(restaurant => {
            if (!restaurant) {
                return res.status(404).send('Restaurante no encontrado');
            }

            restaurant.name = name;
            restaurant.address = address;

            if (logo) {
                const imagePath = path.join(__dirname, '../public/images/restaurants/', `${restaurant.id}.jpg`);
                logo.mv(imagePath, function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error al subir el logo');
                    }
                });
            }

            return restaurant.save().then(() => {
                res.redirect('/restaurants');
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error al actualizar el restaurante');
        });
};

exports.deleteRestaurant = async function (req, res) {
    const restaurantId = req.params.id;
    try {
        const restaurant = await db.restaurant.findByPk(restaurantId);
        if (!restaurant) return res.status(404).send("Restaurante no encontrado");

        await restaurant.destroy();
        res.redirect('/restaurants');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el restaurante');
    }
};
