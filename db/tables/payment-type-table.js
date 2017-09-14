'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite', (err) => { 
    if(err) 
        console.log('Error:',err.toString());
    console.log('Connected');
});

module.exports = (payments) => {
  return new Promise ((resolve, reject) => {
  db.serialize( () => {
          db.run(`DROP TABLE IF EXISTS payment_type`);
          db.run(`CREATE TABLE payment_type (
            id INTEGER PRIMARY KEY, 
            customer_user_id INTEGER,
            type INTEGER,
            account_number TEXT, FOREIGN KEY(customer_user_id) REFERENCES user(id))`);
          payments.forEach( (payment) => {
              db.run(`INSERT INTO payment(customer_user_id, payment_id, payment_date)
                  VALUES('${payment.customer_user_id}', '${payment.type}', '${payment.account_number}')`, (err, data) => {
                      if(err)
                          console.log(err.toString());
                      resolve("Done");
                  });
              });
          });
  })
}