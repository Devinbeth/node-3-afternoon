const swag = require('../models/swag.js');

module.exports = {
    add: (req, res, next) => {
        if (req.query.id) {
            if (req.session.user.cart.find(e => e.id === +req.query.id)) {
                res.status(200).send(req.session.user);
            }
            else {
                req.session.user.cart.push(swag.find(e => e.id === +req.query.id));
                let obj = swag.find(e => e.id === +req.query.id);
                req.session.user.total += obj.price;
                res.status(200).send(req.session.user);
            }
        }
    },
    delete: (req, res, next) => {
        if (req.query.id) {
            if (req.session.user.cart.find(e => e.id === +req.query.id)) {
                req.session.user.cart.splice(req.session.user.cart.indexOf(e => e.id === +req.query.id), 1);
                req.session.user.total -= swag.find(e => e.id === +req.query.id).price;
                res.status(200).send(req.session.user);
            }
        }
    },
    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    } 
};