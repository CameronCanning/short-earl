var mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;


var _db;

module.exports = {
	connectToServer: (callback) => {
		client.connect((err, db) => {
			// Verify we got a good "db" object
			if (db) {
				_db = db.db("short-earl");
				console.log("Successfully connected to MongoDB.");
			}
			return callback(err);
		});
	},
	connectToServer: () => {
		mongoose.connect(Db, {useNewUrlParser: true, useUnifiedTopology: true})
	},
 
  getDb: () => {
		return _db;
	},
};