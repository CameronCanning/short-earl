const express = require("express");
const { nanoid } = require("nanoid");
const Earl = require('../models/earl');
const User = require('../models/user');
const router = express.Router();
const auth = require('../middleware/auth');

//START	earl/	
router.route("/earl/:id").get((req, res) => {

	let query = { _id: req.params.id};
	Earl.findById(query, (err, earl) => {
			if (err) console.log(err.message);	
			if (!earl) {
				console.log(`GET failed: ${req.params.id}`);
				res.sendStatus(404);
			}
			else {
				console.log(`GET Success: ${earl}`);
				//res.status(301).redirect(earl.url);
				res.json({url: earl.url});
			}
		});
});
router.route("/earl/ad").post((req, response) => {

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
router.route('/earl/add').post(auth, (req, res) => {
	console.log(res.locals.user);
	if (res.locals.user) {
		
	}
	
})
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
router.route('/user/register').post((req, res) => {
	const user = new User(req.body);
	//check if user exists
	User.findOne({email: req.body.email}, {_id: 1}, (err, duplicate) => {
		if (err) res.sendStatus(500);
		else if (duplicate) res.json({error: 'An account with that email already exists'});
		//add user
		else {
			user.save()
			.then((savedUser) => {
				console.log(`Registered: ${savedUser}`);
				req.session.userId = user._id;
				res.sendStatus(200);
			})
			.catch((err) => {
				console.log(err.message);
				res.sendStatus(400);
			})
		}	
	})
})

const bycrypt = require('bcrypt');
router.route('/user/login').post((req, res) => {
	User.findOne({email: req.body.email}, 'password _id', (err, user) => {
		if (err) console.log(err.message);
		else {
			bycrypt.compare(req.body.password, user.password, (err, match) => {
				if (err) console.log(err.message);
				else if (!match) res.json({error: 'incorrect password'});
				else{
					req.session.userId = user._id;
					res.sendStatus(200);
				}
			})
		}
	})
})

router.route('/auth').get((req, res) => {
	console.log(req.session);
	if (req.session.userId) {
		console.log('logged in');
		res.sendStatus(200);
	}
	else {
		console.log('logged out');
		res.sendStatus(400);
	}

	
})
module.exports = router;