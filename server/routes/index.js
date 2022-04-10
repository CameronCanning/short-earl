const express = require("express");
const { nanoid } = require("nanoid");

const router = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


/**This section will help you get a list of all the records.
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
*/

router.route("/short/:id").get(function (req, res) {
	let db_connect = dbo.getDb();
	let myquery = { _id: req.params.id};
	db_connect
		.collection("urls")
		.findOne(myquery, (err, result) => {
			if (err) throw err;		
			res.json(result);
		});
});

router.route("/short/add").post(function (req, response) {
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
			res_payload = {earl: res.insertedId, status: 'success'};
			console.log(`Added: ${res.insertedId} -> ${payload.long}`);
		}
		response.json(res_payload);
	});			
});



// This section will help you delete a record
router.route("/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("records").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.json(obj);
	});
});

module.exports = router;