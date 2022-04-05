const express = require("express");
const { nanoid } = require("nanoid");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/short").get(function (req, res) {
	console.log('/short')
	let db_connect = dbo.getDb("users");
	db_connect
		.collection("records")
		.find({})
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you get a single record by id
recordRoutes.route("/short/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect
		.collection("records")
		.findOne(myquery, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

recordRoutes.route("/short/add").post(function (req, response) {
	let db_connect = dbo.getDb();

	let payload = {
		_id:  req.body.short ? req.body.short : nanoid(7),
		long: req.body.long,
	}
	
	let res_payload = {
		earl: '',
		status: ''
	};

	db_connect.collection("urls").insertOne(payload, (err, res) => {
		if (err && err.code == 11000) {		
			console.log(`DuplicateKeyError: /short/add/ ${payload._id} -> ${payload.long}`);	
			if (req.body.short) {
				res_payload = {earl: req.body.short, status: 'earl_taken'};
			}
			else {							
				res_payload = {earl: '', status: 'collision_error'};	
			}							
		}
		else if (err) {
			console.log(`UnknowenError: /short/add/ ${payload._id} -> ${payload.long}`);
			res_payload = {earl:'', status: 'unknowen_error'};
		}
		else {
			res_payload = {earl: payload._id, status: 'success'};
			console.log(`Added: ${payload._id} -> ${payload.long}`);
		}
		response.json(res_payload);
	});			
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			person_name: req.body.person_name,
			person_position: req.body.person_position,
			person_level: req.body.person_level,
		},
	};
	db_connect
		.collection("records")
		.updateOne(myquery, newvalues, function (err, res) {
			if (err) throw err;
			console.log("1 document updated");
			response.json(res);
		});
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("records").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = recordRoutes;