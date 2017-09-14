'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
  dbGetAllOrders: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM orders`, (err, allOrderData) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(allOrderData);
        resolve(allOrderData);
      });
    });
  },

  dbGetOneOrder: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM orders o
								WHERE o.id = ${id}`, (err, orderData) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(orderData);
          resolve(orderData);
        });
    });
  },

  dbPostOrder: (newOrder) => {
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
  },

  dbPutOrder: (id) => {
    return new Promise((resolve, reject) => {
      // TODO change employee and department to employees and departments
      db.get(`SELECT * FROM orders o
								WHERE o.id = ${id}`, (err, orderData) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(orderData);
          resolve(orderData);
        });
    });
  },

  dbDeleteOrder: (id) => {
    return new Promise((resolve, reject) => {
      // TODO change employee and department to employees and departments
      db.get(`SELECT * FROM orders o
								WHERE o.id = ${id}`, (err, orderData) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(orderData);
          resolve(orderData);
        });
    });
  }

};
