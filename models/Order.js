'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');
// pragma needed for orderProduct table cascade deletion
db.run('PRAGMA foreign_keys = ON');

module.exports.dbGetAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM orders`, function (err, allOrderData) {
      if (err) {
        return reject(err);
      }
      resolve(allOrderData);
    });
  });
};

module.exports.dbGetOneOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM orders
            WHERE id = ${id}`, function (err, orderData) {
        if (err) {
          return reject(err);
        }
        resolve(orderData);
      });
  });
};

module.exports.dbPutOrder = (order_id, order) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE orders SET `;
    let keys = (Object.keys(order));
    keys.forEach((key) => {
      query += `'${key}' = '${order[key]}',`;
    });
    query = query.slice(0, -1);
    query += ` WHERE id = ${order_id}`;
    db.run(query,
      function (err) {
        if (err) {
          return reject(err);
        }
        else {
          resolve("order updated");
        }
      });
  });
};

module.exports.dbDeleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM orders WHERE id = ${id}`, function (err) {
      if (err) return reject(err);
      resolve({ message: "delete successful", rows_deleted: this.changes });
    });
  });
};

module.exports.dbPostOrder = (customer_user_id, payment_type_id, product_id) => {
  return new Promise((resolve, reject) => {
    // TODO add product_id call to add orderProduct rows
    if (!product_id) return reject('must include product_id');
    if (!payment_type_id) payment_type_id = null;
    let order_date = new Date().toISOString();
    db.run(`INSERT INTO orders
        (customer_user_id, payment_type_id, order_date)
        VALUES (${customer_user_id}, ${payment_type_id}, '${order_date}')`, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID); // returns ID of new order
      });
  });
};

