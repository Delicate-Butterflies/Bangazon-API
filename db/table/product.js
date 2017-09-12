'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite', (err) => { 
    if(err) 
        console.log('Error:',err.toString());
    console.log('Connected');
});

//product_type table needs to be created before product table.
module.exports.createProductsTable = () => {
  db.run('CREATE TABLE products( id INTEGER PRIMARY KEY, product_type_id INTEGER, price REAL, title TEXT, description TEXT, original_quantity INTEGER, seller_user_id INTEGER, FOREIGN KEY(seller_user_id) REFERENCES product_type(id))', (err) => {
    if(err)
      console.log(err.toString());
  });
}