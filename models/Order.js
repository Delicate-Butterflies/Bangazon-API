'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
  dbGetAllOrders: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM orders`, (err, allOrderData) => {
        if (err) return reject(err);
        console.log(allOrderData);
        resolve(allOrderData);
      });
    });
  },

  dbGetOneOrder: (id) => {
    return new Promise((resolve, reject) => {
      // TODO change employee and department to employees and departments
      db.get(`SELECT * FROM orders o
								WHERE o.id = ${id}`, (err, orderData) => {
          if (err) return reject(err);
          console.log(orderData);
          resolve(orderData);
        });
    });
  }

};
