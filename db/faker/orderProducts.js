'use strict';

const { amounts: { maxQuantity, maxProductsPerOrder, numProducts, numOrders } } = require('./generatorAmounts.json');

module.exports.generateOrderProducts = () => {

  let orderProducts = [];

  for (let k = 1; k <= numOrders; k++) {
    //for each order
    let order_id = k;
    // randomize the number of products per order up to max
    let uniqueProducts = Math.floor(Math.random() * maxProductsPerOrder) + 1;
    // for each product "slot"
    for (let j = 0; j < uniqueProducts; j++) {
      // choose random product out of the total number of products
      let product_id = Math.floor(Math.random() * numProducts) + 1;
      // randomize the quantity pushed to array (ordered) between 1 and an upper limit
      let qty = Math.floor(Math.random() * maxQuantity) + 1;
      for (let i = 0; i < qty; i++) {
        orderProducts.push({
          product_id,
          order_id,
        });
      }
    }
  }
  return orderProducts;
};
