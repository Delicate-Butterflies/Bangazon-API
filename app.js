'use strict';

let express = require('express');
let app = express();
let routes = require('./routes/');
require('dotenv').config();

app.use('/api/v1/', routes);

app.use( (req, res, next) => {
	let err = new Error('Not found!');
	err.status = 404;
	next();
});

app.use( (err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: 'Unsuccessful',
		err: err
	});
});

let port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});