module.exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.status(401).res.end();
    }

    next();
}