'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbGetAllPaymentTypes = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM payment_types`, (err, allPaymentTypesData) => {
      if (err) return reject(err);
      resolve(allPaymentTypesData);
    });
  });
};

module.exports.dbGetOnePaymentType = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM payment_types WHERE id = ${id}`, (err, singlePaymentTypeData) => {
      if (err) return reject(err);
      resolve(singlePaymentTypeData);
    });
  });
};

module.exports.dbPutPaymentType = (req, payment_type_id) => {
  let payment_type = req.body;
  return new Promise((resolve, reject) => {
    let query = `UPDATE payment_types SET `;
    let keys = (Object.keys(payment_type));
    keys.forEach((key) => {
      query += `"${key}" = "${payment_type[key]}",`;
    });
    query = query.slice(0, -1);
    query += ` WHERE id = ${payment_type_id}`;
    db.run(query, function (err) {
      if (err) return reject(err);
      resolve({ message: "payment_type updated", rows_updated: this.changes });
    });
  });
};

module.exports.dbDeleteOnePaymentType = (id) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM orders WHERE payment_type_id = ${id}`, (err, data) => {
      if (err) return reject(err);
      if (data.length === 0) {
        db.run(`DELETE FROM payment_types WHERE id = ${id}`, function (err) {
          if (err)
            return reject(err);
          resolve({ message: "delete successful", rows_deleted: this.changes });
        });
      }
      else
        return reject("Cannot delete this Data, It has Orders associated with it");
    });
  });
};

module.exports.dbPostPaymentType = (paymentTypeReq) => {
  let paymentType = paymentTypeReq;
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO payment_types(customer_user_id, type, account_number)
            VALUES(${paymentType.customer_user_id}, '${paymentType.type}', '${paymentType.account_number}')`, function (err) {
        if (err) return reject(err);
        resolve({ message: "new payment type successfully added", new_payment_type_id: this.lastID });
      });
  });
};
