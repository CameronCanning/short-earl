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

router.route('/earl/create').post(auth, (req, res) => {
	const earl = new Earl({
		_id:  req.body.short ? req.body.short : nanoid(7),
		url: req.body.long,
	});

	earl.save()
	.then(savedEarl => {
		if (res.locals.user) {
			res.locals.user.updateOne({$push: {earls: {_id: savedEarl._id}}})
			.then(userUpdated => {
				console.log(`${savedEarl._id} added to ${userUpdated._id}`)
				res.json(savedEarl._id);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(500);
			})
		}
		//non auth user save to session
		else {
			console.log(savedEarl);
			if (req.session.earls) {
				if (req.session.earls.length < 3) {
					req.session.earls = JSON.stringify([...JSON.parse(req.session.earls), savedEarl]);
					res.json(savedEarl._id);
				}
				else {
					res.status(400).json('Limit exceeded please log in');
				}				
			}
			else {
				req.session.earls = [savedEarl];
				res.json(savedEarl._id);
			}
		}
	})
	.catch((err) => {
		console.log(err.message);
		//duplicate key code
		if (err.code == 11000) {
			if (req.body.short)
				res.status(409).json('earl_taken');
			else 
				res.sendStatus(500);
		}
		else {
			res.sendStatus(500);
		}
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
router.route('/user/register').post(auth, (req, res) => {

	//check if user exists
	User.findOne({email: req.body.email}, {_id: 1}, (err, duplicate) => {
		if (err) res.status(500).json({error: err.message});
		else if (duplicate) res.status(400).send('An account with that email already exists');
		//add user
		else {
			const user = new User(req.body);
			user.save()
			.then((savedUser) => {
				console.log(`Registered: ${savedUser.email}`);
				req.session.userId = user._id;
				res.sendStatus(200);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(500);
			})
		}	
	})
})

const bycrypt = require('bcrypt');
router.route('/user/login').post(auth, (req, res) => {
	if (res.locals.user){
		res.status(400).json('Already logged in');
	}
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

router.route('/user/logout').delete((req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.sendStatus(400);
			}
			else {
				console.log(req.session.userId + ' logged out');
				res.sendStatus(200);
			}
		});
	}
})

router.route('/user/auth').get(auth, (req, res) => {
	res.json(!!res.locals.user);
})

router.route('/user/earls').get(auth, (req, res) => {
	console.log('todo');
	res.json('todo');
})
//END user/
module.exports = router;