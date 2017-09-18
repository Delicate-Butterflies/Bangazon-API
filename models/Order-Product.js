'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbPostOrderProduct = (orderObj, order_id) => {
  return new Promise((resolve, reject) => {
    let { product_id, product_qty } = orderObj;
    if (!product_qty) product_qty = 1;
    for (let i = 0; i < product_qty; i++) {
      db.run(`INSERT INTO ordersProducts
            (order_id, product_id)
            VALUES (${order_id}, ${product_id})`, function (err) {
          if (err) return reject(err); // TODO need to delete new order, too?
        });
    }
    resolve(`${product_qty} quantity of product ${product_id} added to order ${order_id} `);
  });
};

module.exports.dbgetOrderProducts = (order_id) => {
  return new Promise((resolve, reject) => {
    db.get(`
      SELECT product_id,
      count(product_id) as quantity
      FROM ordersProducts
      WHERE order_id = ${order_id}`, function (err, orderProductData) {
        if (err) reject(err);
        resolve(orderProductData);
      });
  });
};
