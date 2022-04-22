const User = require('../models/user');

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (err, user) => {
        if (err) {
            return next(err);
        }
        else if (!user) {  
            res.locals.user = undefined;
        }
        else {
            res.locals.user = user;            
        }
        return next();
    })
}
