'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');

module.exports = (orders, products) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS orderProducts`);
      const totalProducts = products.length;
      db.run(`CREATE TABLE orderProducts (
      id INTEGER PRIMARY KEY,
      product_id INTEGER NOT NULL,
      order_id INTEGER NOT NULL,
      FOREIGN KEY(product_id) REFERENCES product(id),
      FOREIGN kEY(order_id) REFERENCES orders(id))`);
      orders.forEach((order) => {
        let order_id = orders.indexOf(order) + 1;
        let randomProduct = Math.floor(Math.random() * totalProducts) + 1;
        let qty = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < qty; i++) {
          db.run(`INSERT INTO orderProducts (product_id, order_id)
            VALUES('${randomProduct}', ${order_id})`, (err, data) => {
              if (err)
                return reject(err);
              resolve("Done");
            });
        }
      });
    });
  });
};
