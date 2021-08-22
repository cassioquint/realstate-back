const User = require('../models/User');
const jwt = require('jsonwebtoken');

const UserController = {
    register: (req, res) => {
        User.register(new User(req.body), 
        req.body.password, (error) => {
            if(error) {
                console.log(error)
                return res.json({'created': false});
            }
            return res.json({'created': true});
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        const auth = User.authenticate();

        auth(email, password, (error, result) => {
            if(!result) {
                return res.json({auth: false});
            } else {
                const token = jwt.sign({email: email}, process.env.AUTH_SECRET, {expiresIn: 7200});
                return res.json({ auth: true, user: email, token });
            }
        });
        
    }
};

module.exports = UserController;