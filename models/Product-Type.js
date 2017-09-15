'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');
db.run(`PRAGMA foreign_keys = ON`);

module.exports.dbGetAllProductType = () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM product_types`, (err, productTypeData) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(productTypeData);
        }
      })
    })
  };
  module.exports.dbGetOneProductType = (id) => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM product_types WHERE id = ${id}`, (err, productTypeData) => {
        if(err) {
          reject(err);
        }
        else
          resolve(productTypeData);
      })
    })
  };
  module.exports.dbPostProductType = (req) => {
    let type = req.body;
    return new Promise( (resolve, reject) => {
      db.run(`INSERT INTO product_types(name)
      VALUES('${type.name}')`, (err, productTypeData) => {
        if(err) {
          reject(err);
        }
        else {
          resolve("productTypeData");
        }
      })
    })
  };

  module.exports.dbPutProductType = (req, product_type_id) => {
    let product = req.body;
    console.log("product_type_id", product_type_id);
    console.log(product);
    return new Promise( (resolve, reject) => {
      db.run(`UPDATE product_types SET 'name' = '${product.name}' WHERE id = ${product_type_id}`, (err, EditedproductTypeData) => {
        if(err)
          reject(err);
        resolve("EditedproductTypeData");
      })
  });
};

  module.exports.dbDeleteProductType = (id) => {
    console.log("id-db", id);
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM products WHERE product_type_id = ${id}`, (err, data) => {
        if(err) reject(err);
          console.log("this.changes", data);
        if(data.length === 0)
        {
          db.run(`DELETE FROM product_types WHERE id = ${id}`, function(err) {
            if(err)
              reject(err);
            resolve({message: "delete successful", rows_deleted: this.changes});
          });
        }
        else
          reject("Cannot delete this Data, It has Products associated with it");
      })
    });
  }
