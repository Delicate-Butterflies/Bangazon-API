'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite', (err) => { 
    if(err) 
        console.log('Error:',err.toString());
    console.log('Connected');
});

module.exports = (orders) => {
  return new Promise ((resolve, reject) => {
  db.serialize( () => {
          db.run(`DROP TABLE IF EXISTS order`);
          db.run(`CREATE TABLE order (
            id INTEGER PRIMARY KEY, 
            customer_user_id INTEGER,
            payment_type_id INTEGER,
            order_date TEXT, FOREIGN KEY(customer_user_id) REFERENCES user(id))`);
          users.forEach( (order) => {
              db.run(`INSERT INTO order(customer_user_id, payment_type_id, order_date)
                  VALUES('${order.customer_user_id}', '${order.payment_type_id}', '${order.order_date}')`, (err, data) => {
                      if(err)
                          console.log(err.toString());
                      resolve("Done");
                  });
              });
          });
  })
}