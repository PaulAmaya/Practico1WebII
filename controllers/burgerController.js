const db = require("../models");
const path = require("path");

exports.listAllBurgers = function (req, res) {
    db.burger.findAll({
        include: {
            model: db.restaurant,
            as: 'restaurant'
        }
    }).then(burger => {
        res.render('burgers/list.ejs', { burger });
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener hamburguesas');
    });
};



exports.createBurger = async function (req, res) {
    try {
        const restaurants = await db.restaurant.findAll();
        res.render("burgers/form.ejs", { burger: null, restaurants });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el formulario de hamburguesa");
    }
};


exports.insertBurger = async function (req, res) {
    const image = req.files ? req.files.image : null;
    const { name, description, price, restaurantId } = req.body;

    try {
        // Crear la hamburguesa sin la imagen todavía
        const burger = await db.burger.create({
            name,
            description,
            price,
            restaurantId,
            image: null
        });

        if (image) {
            const imagePath = path.join(__dirname, '../public/images/burgers/', `${burger.id}.jpg`);
            await image.mv(imagePath);
            burger.image = `/images/burgers/${burger.id}.jpg`;
            await burger.save();
        }

        res.redirect("/burgers/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al insertar la hamburguesa");
    }
};


exports.getBurgerUpdate = function (req, res) {
    const burgerId = req.params.id;

    db.burger.findByPk(burgerId).then(burger => {
        if (!burger) {
            return res.status(404).send('Hamburguesa no encontrada');
        }
        res.render('burgers/edit.ejs', { burger });
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener la hamburguesa');
    });
};


exports.postBurgerUpdate = function (req, res) {
    const burgerId = req.params.id;
    const { name, price, description } = req.body;
    const image = req.files ? req.files.image : null;

    db.burger.findByPk(burgerId).then(burger => {
        if (!burger) {
            return res.status(404).send('Hamburguesa no encontrada');
        }
        burger.name = name;
        burger.price = price;
        burger.description = description;

        if (image) {
            const path = __dirname + '/../public/images/burgers/' + burgerId + '.jpg';
            image.mv(path, function (err) {
                if (err) {
                    return res.render('personas/uploadProfile.ejs', { errors: { message: 'Error al subir la imagen' }});
                }
            });
        }

        return burger.save();
    }).then(burger => {
        res.redirect(`/burgers`);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error al actualizar la hamburguesa');
    });
};

exports.deleteBurger = async function (req, res) {
    const burgerId = req.params.id;
    try {
        const burger = await db.burger.findByPk(burgerId);
        if (!burger) return res.status(404).send("Hamburguesa no encontrada");

        await burger.destroy();
        res.redirect(`/burgers/`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar la hamburguesa");
    }
};
