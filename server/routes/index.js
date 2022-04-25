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

	
	if (res.locals.user) {
		earl.user_id = res.locals.user._id;
	}
	
	if (req.session.earls && JSON.parse(req.session.earls).length > 2) {
		res.status(400).json('overlimit')
	}
	else {
		earl.save()
		.then((savedEarl) => {
			//temp user
			if (!res.locals.user) {
				if (!req.session.earls) {
					req.session.earls = JSON.stringify([savedEarl]);
					res.json(savedEarl);
				}
				else {
					req.session.earls = JSON.stringify([...JSON.parse(req.session.earls), savedEarl]);
					res.json(savedEarl);
				}
			}
			else{
				console.log(savedEarl);
				res.json(savedEarl);
			}
		})
		.catch((err) => {
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
			console.log(err.message);
		})
	}
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
				
				if (req.session.earls) {
					let earls = JSON.parse(req.session.earls);
					req.session.earls = null;
					earls.forEach((ele) => {
						Earl.findByIdAndUpdate(ele._id, {user_id: savedUser._id})
						.then(x => console.log(x))
						
					})										
				}
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
		res.status(401).json({email: 'Already logged in'});
	}
	else {
		User.findOne({email: req.body.email}, 'password _id', (err, user) => {
			
			if (err) console.log(err.message);
			else if (!user) {
				console.log(user);
				res.status(401).json({email: 'User does not exist'});
			}
			else {
				bycrypt.compare(req.body.password, user.password, (err, match) => {
					if (err) console.log(err.message);
					else if (!match) res.status(401).json({password: 'Incorrect password'});
					else{
						req.session.userId = user._id;
						res.sendStatus(200);
					}
				})
			}
		})
	}
})

router.route('/user/logout').delete(auth, (req, res) => {
	if (res.locals.user) {
		req.session.destroy(err => {
			if (err) {
				res.sendStatus(500);
			}
			else {	
				res.clearCookie('user_sid', {path: '/'}).sendStatus(200);			
			}
		});
	}
	else {
		res.status(400).json('No Account logged in');
	}
})

router.route('/user/auth').get(auth, (req, res) => {
	res.json(!!res.locals.user);
})

router.route('/user/earls').get(auth, (req, res) => {
	if (res.locals.user) {
		res.locals.user.populate('earls', 'url -user_id')
		.then(populatedUser => {
			console.log(populatedUser.earls);
			res.json(populatedUser.earls);
		})
		.catch(err => {
			console.log(err.message);
			res.sendStatus(500);
		})
	}
	else {
		if (req.session.earls){
			res.json(JSON.parse(req.session.earls));
		}
		else {
			res.json([]);
		}
	}
})
//END user/
module.exports = router;
