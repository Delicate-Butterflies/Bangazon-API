'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbGetAllPaymentTypes = () => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT * FROM payment_types`, (err, allPaymentTypesData) => {
      if(err) reject(err);
      resolve(allPaymentTypesData);
    });
  });
};

module.exports.dbGetOnePaymentType = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM payment_types WHERE id = ${id}`, (err, singlePaymentTypeData) => {
      if(err) reject(err);
      resolve(singlePaymentTypeData);
    });
  });
};

module.exports.dbDeleteOnePaymentType = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM payment_types WHERE id = ${id}`, function(err){
      if (err) reject(err);
      resolve({ message: "delete successful", rows_deleted: this.changes });
    });
  });
};

module.exports.dbPostPaymentType = (paymentTypeReq) => {
  let paymentType = paymentTypeReq;
  return new Promise( (resolve, reject) => {
    db.run(`INSERT INTO payment_types(customer_user_id, type, account_number)
            VALUES(${paymentType.customer_user_id}, '${paymentType.type}', '${paymentType.account_number}')`, function(err) {
      if(err) {
        reject(err);
      }
      else {
        resolve({ message: "new payment type successfully added", new_payment_type_id: this.lastID});
      }
    });
  });
};