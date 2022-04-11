const express = require("express");
const { nanoid } = require("nanoid");
const Earl = require('../models/earl');
const router = express.Router();



router.route("/earl/:id").get((req, res) => {
	let query = { _id: req.params.id};
	Earl.findById(query, (err, earl) => {
			if (err) throw err;	
			if (!earl) {
				console.log(`GET failed: ${req.params.id}`);
				res.status(404).end();
			}
			else {
				console.log(`GET failed: ${earl}`);
				res.json({url: earl.url});
			}
		});
});

router.route("/earl/add").post((req, response) => {
	let res_payload = {
		earl: '',
		status: ''
	};
	const payload = new Earl({
		_id:  req.body.short ? req.body.short : nanoid(7),
		url: req.body.long,
	}) ;

	payload.save()
	.then(savedEarl => {
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

router.route('/earl/update').put((req, res) => {
	let currEarl = req.params.earl;
	let newEarl = req.params.newEarl;
	if (currEarl && newEarl) {
		Earl.findById({ _id: currEarl})
			.then(earl => {
				earl._id = newEarl
				earl.save()
				.catch((err) => {
					console.log(err);

				})
			})
			.catch((err) =>
			{
				console.log(err)
			});
	}
	else {
		res.status(400).end();
	}
});

router.route("/earl/:id").delete((req, response) => {
	Earl.deleteOne({_id: req.body.short})
	.then(response.status(200).end())
	.catch((err) => {
		console.log(err);
		response.status(404).end();
	})
});

module.exports = router;