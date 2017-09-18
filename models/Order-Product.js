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

module.exports.dbOrderProductsWithInfo = (order_id) => {
  return new Promise((resolve, reject) => {
    //select (and count) rows that match order id, join with product info for those product ids
    db.all(`
      SELECT op.product_id, count(op.product_id) as quantity, p.title, p.price
      FROM ordersProducts op
      JOIN products p
      WHERE op.order_id = ${order_id}
      AND op.product_id = p.id
      GROUP BY op.product_id`, function (err, orderProductData) {
        if (err) reject(err);
        resolve(orderProductData);
      });
  });
};
