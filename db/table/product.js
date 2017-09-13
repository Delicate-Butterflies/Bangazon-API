'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite', (err) => { 
    if(err) 
        console.log('Error:',err.toString());
    console.log('Connected');
});

//product_type table needs to be created before product table.
module.exports = (products) => {
    // return new Promise ((resolve, reject) => {
    db.serialize( () => {
            db.run(`DROP TABLE IF EXISTS product`);
            db.run(`CREATE TABLE IF NOT EXISTS product( 
                    id INTEGER PRIMARY KEY, 
                    product_type_id INTEGER, 
                    price REAL, 
                    title TEXT, 
                    description TEXT, 
                    original_quantity INTEGER, 
                    seller_user_id INTEGER, 
                    FOREIGN KEY(seller_user_id) REFERENCES product_type(id))`);
            products.forEach( (product) => {
                db.run(`INSERT INTO product(product_type_id, price, title, description, original_quantity, seller_user_id)
                    VALUES('${product.type_id}', '${product.price}', '${product.title}', '${product.description}', '${product.original_quantity}', '${product.seller_user_id}')`, (err, data) => {
                        if(err)
                            console.log(err.toString());
                        else
                            console.log(data);
                            // resolve(data);
                    });
                });
            });
    // })
}