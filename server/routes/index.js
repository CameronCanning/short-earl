const express = require("express");
const { nanoid } = require("nanoid");
const Earl = require('../models/earl');
const User = require('../models/user');
const router = express.Router();


//START	earl/	
router.route("/earl/:id").get((req, res) => {
	let query = { _id: req.params.id};
	Earl.findById(query, (err, earl) => {
			if (err) throw err;	
			if (!earl) {
				console.log(`GET failed: ${req.params.id}`);
				res.status(404).end();
			}
			else {
				console.log(`GET Success: ${earl}`);
				res.json({url: earl.url});
			}
		});
});

router.route("/earl/add").post((req, response) => {

	let resPayload = {
		earl: '',
		status: ''
	};
	const payload = new Earl({
		_id:  req.body.short ? req.body.short : nanoid(7),
		url: req.body.long,
	}) ;
	console.log(payload);
	payload.save()
	.then(savedEarl => {
		response.json({earl: savedEarl._id, status: 'success'});
	})
	.catch((err) => {
		console.log(err.message);
		if (err.code == 11000) {		
			if (req.body.short) {
				resPayload = {earl: req.body.short, status: 'earl_taken'};
			}
			else {							
				resPayload = {earl: '', status: 'collision_error'};	
			}							
		}
		else{
			resPayload = {earl:'', status: 'unknowen_error'};
		}
		response.json(resPayload);
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
//END earl/

//START user/
router.route('/register').post(async (req, res) => {
	const user = new User(req.body);

	//check if user exists
	User.findOne({email: req.body.email}, (err, duplicate) => {
		if (err) res.sendStatus(500);
		else if (duplicate) res.json({error: 'An account with that email already exists'});
		//add user
		else {
			user.save().then((savedUser) => {
				console.log(savedUser);
				res.sendStatus(200);
			})
			.catch((err) => {
				console.log(err.message);
				res.sendStatus(400);
			})
		}	
	})
})


module.exports = router;