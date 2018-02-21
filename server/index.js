require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const checkForSession = require('./middlewares/checkForSession.js');
const swag_controller = require('./controllers/swag_controller.js');
const auth_controller = require('./controllers/auth_controller.js');
const cart_controller = require('./controllers/cart_controller.js');
const search_controller = require('./controllers/search_controller.js');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => checkForSession(req, res, next));
app.use(express.static(`../build`));

app.get('/api/swag', swag_controller.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

app.get('/api/search', search_controller.search);

const port = 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
