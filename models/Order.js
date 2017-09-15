'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbGetAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM orders`, (err, allOrderData) => {
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
								WHERE o.id = ${id}`, (err, orderData) => {
        if (err) {
          return reject(err);
        }
        resolve(orderData);
      });
  });
};

module.exports.dbPostOrder = (newOrder) => { // pruduct_id,
  return new Promise((resolve, reject) => {
    let { customer_user_id, payment_type_id, order_date } = newOrder;
    if (!order_date) order_date = new Date().toISOString();
    db.run(`INSERT INTO orders
        (customer_user_id, payment_type_id, order_date)
        VALUES (${customer_user_id}, ${payment_type_id}, '${order_date}')`,
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve("New Order Added");
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
    db.run(query, function (err) {
      if (err) {
        reject(err);
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

//post
//productid, buyerid
//promise
db.run(`INSERT INTO orders
        VALUES (null, date('now'), null, ${buyerid}`, function (err) {
    if (err) { }
    console.log('row ID', this.lastID);
    db.run(`INSERT INTO ordersProducts
                  values(null, ${this.lastID}, ${order.product_id})`)
  })

        //if open order exists,can't do this add to open order
