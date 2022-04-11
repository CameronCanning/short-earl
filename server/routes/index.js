const express = require("express");
const { nanoid } = require("nanoid");
const Earl = require('../models/earl');
const User = require('../models/user');
const router = express.Router();

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

router.route("/earl/:id").get((req, res) => {
	let query = { _id: req.params.id};
	Earl.findById(query, (err, earl) => {
			if (err) throw err;	
			if (!earl) {
				console.log(`GET failed: ${req.params.id}`);
				res.status(404).end();
			}
			else {
				console.log(earl);
				res.json(earl);
			}
		});
});

router.route("/earl/add").post(function (req, response) {
	console.log(req.body);
	let res_payload = {
		earl: '',
		status: ''
	};
	const payload = new Earl({
		_id:  req.body.short ? req.body.short : nanoid(7),
		url: req.body.long,
	}) 
	payload.save().then(savedEarl => {
		response.json({earl: savedEarl._id, status: 'success'});
	})
	.catch((err) => {
		console.log(err.message);
		if (err.code == 11000) {		
			if (req.body.short) {
				res_payload = {earl: req.body.short, status: 'earl_taken'};
			}
			else {							
				res_payload = {earl: '', status: 'collision_error'};	
			}							
		}
		else{
			res_payload = {earl:'', status: 'unknowen_error'};
		}
		response.json(res_payload);
	})			
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