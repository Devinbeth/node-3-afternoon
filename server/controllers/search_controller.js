const swag = require('../models/swag.js');

module.exports = {
    search: (req, res, next) => {
        if (req.query.category) {
            if (swag.find(e => e.category === req.query.category)) {
                let filtered = swag.filter(e => e.category === req.query.category);
                res.status(200).send(filtered);
            }
            else {
                res.status(200).send(swag);
            }
        }
    }
}