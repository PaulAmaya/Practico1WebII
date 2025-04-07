const db = require('../config/db');

const Restaurant = {
  create: async (restaurant) => {
    const { name, address, logo } = restaurant;
    const [result] = await db.query(
      'INSERT INTO restaurants (name, address, logo) VALUES (?, ?, ?)',
      [name, address, logo]
    );
    return { id: result.insertId, ...restaurant };
  }
};

module.exports = Restaurant;
