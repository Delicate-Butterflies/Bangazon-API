'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbGetAllProducts = () => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT * FROM products`, (err, productdata) => {
      if(err) reject(err);
      resolve(productdata);
    });
  });
};

module.exports.dbGetSingleProduct = (id) => {
  return new Promise( (resolve, reject) => {
    db.get(`SELECT * FROM products
            WHERE id = ${id}`, (err, productdata) => {
      if(err) reject(err);
      resolve(productdata);
    });
  });
};

module.exports.dbPostProduct = (newProduct) => {
  return new Promise((resolve, reject) => {
      let { product_type_id, price, title, description, original_quantity, seller_user_id } = newProduct;
      db.run(`INSERT INTO products(product_type_id, price, title, description, original_quantity, seller_user_id)
      VALUES('${product_type_id}', '${price}', '${title}', '${description}', '${original_quantity}', '${seller_user_id}')`, (err) => {
          if (err) reject(err);
          resolve("New field inserted");
      });
  });
};

module.exports.dbDeleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM products WHERE id = ${id}`, function(err) {
      if(err) reject(err);
      resolve({message: "delete successful", rows_deleted: this.changes});
    });
  });
};

module.exports.dbPutProduct = (req, product_id) => {
  let product = req.body;
  return new Promise( (resolve, reject) => {
    let query = `UPDATE products SET `;
    let keys = (Object.keys(product));
    keys.forEach( (key) => {
      query += `"${key}" = "${product[key]}",`;
    });
    query = query.slice(0,-1);
    query += ` WHERE id = ${product_id}`;
    db.run(query, function(err) {
      if(err) {
        reject(err);
      }
      else {
        resolve({message: "product updated", rows_deleted: this.changes});
      }
    });
  });
};