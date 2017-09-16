'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

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
    db.get(`SELECT * FROM orders o
								WHERE o.id = ${id}`, function (err, orderData) {
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

module.exports.dbPostOrder = (orderObj) => {
  // TODO (in ctrlr?) if open order exists for customer, can't do this add to open order
  return new Promise((resolve, reject) => {
    let { customer_user_id, payment_type_id, order_date, product_id, product_qty } = orderObj;
    if (!order_date) order_date = new Date().toISOString();
    db.run(`INSERT INTO orders
        (customer_user_id, payment_type_id, order_date)
        VALUES (${customer_user_id}, ${payment_type_id}, '${order_date}')`, function (err) {
        if (err) {
          return reject(err);
        }
        if (!product_qty) product_qty = 1;
        for (let i = 0; i < product_qty; i++) {
          db.run(`INSERT INTO ordersProducts
            (order_id, product_id)
            VALUES (${this.lastID}, ${product_id})`, function (error) {
              if (error) return reject(error); // TODO need to delete new order, too?
            });
        }
        resolve(this.lastID); // returns ID of new order
      });
  });
};

