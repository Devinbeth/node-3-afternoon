const users = require('../models/users.js');
var id = 1;

module.exports = {
    login: (req, res, next) => {
        console.log(req);
        for (let i = 0; i < users.length; i++) {
            if (req.body.username === users[i].username && req.body.password === users[i].password) {
                res.status(200).send(users[i]);
                return;
            }
        }
        res.status(500).send('Unauthorized!');
    },
    register: (req, res, next) => {
        let obj = {
            id,
            username: req.body.username,
            password: req.body.password
        };
        id++;
        users.push(obj);
        req.session.user.username = req.body.username;
        res.status(200).send(req.session.user);
    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user);
    }
};