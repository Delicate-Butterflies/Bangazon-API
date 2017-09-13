'use strict';

const { Router } = require('express');
const router = Router();

function makeRoutes(tableName) {
	router.use(require(`./api/v1/${tableName}`));
	router.use(require(`./api/v1/${tableName}/:id`));
	router.use(require(`./api/v1/${tableName}/add-new`));
	router.use(require(`./api/v1/${tableName}/:id/edit`));
}

function makeRoutesWithDelete(tableName) {
	router.use(require(`./api/v1/${tableName}`));
	router.use(require(`./api/v1/${tableName}/:id`));
	router.use(require(`./api/v1/${tableName}/add-new`));
	router.use(require(`./api/v1/${tableName}/:id/edit`));
	router.use(require(`./api/v1/${tableName}/:id/delete`));
}

// employee (GET, POST, PUT)
makeRoutes("employee");
console.log(makeRoutes("employee"));
// department (GET, POST, PUT)
makeRoutes("department");
// computer (GET, POST, PUT, DELETE)
makeRoutesWithDelete("computer");
// training program (GET, POST, PUT, DELETE)
makeRoutesWithDelete("training-program");
// user (GET, POST, PUT)
makeRoutes("user");
// product type (GET, POST, PUT, DELETE)
makeRoutesWithDelete("product-type");
// product (GET, POST, PUT, DELETE)
makeRoutes("product");
// order (GET, POST, PUT, DELETE)
makeRoutesWithDelete("order");
// payment type (GET, POST, PUT, DELETE)
makeRoutesWithDelete("payment-type");

module.exports = router;