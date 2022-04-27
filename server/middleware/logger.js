const logger = (req, res, next) => {
    if (req.url === '/user/auth'){
        next();
    }
    else {
        console.log( req.method + ' : ' + req.url);
        next();
    }
}

module.exports = logger;