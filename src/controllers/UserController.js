const User = require('../models/User');

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
                return res.json({'logged': false});
            } else {
                return res.json({'logged': true});
            }
        });
    }
};

module.exports = UserController;