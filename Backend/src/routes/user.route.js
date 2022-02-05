const { Router } = require('express');
const userCtrl = require('../controllers/user.controller');
const route = Router();

// route.get('/', userCtrl.listAllUsers);
route.post('/register', userCtrl.registerUser);
route.post('/login', userCtrl.login);
module.exports = route;
