'use strict';

let LoginRepository = require('../repositories/login_repository');
let db = require('../config/mysql_config');
let passport = require('passport');

let myIndex = (req, res, next) => {
  let index = req.user;
  res.render('index', {'title': 'Welcome to Home', 'index': index});
};

let login = (req, res, next) => {
  if (req.user !== undefined) {
    return res.redirect('/');
  } else {
    return res.render('login', {'title': 'Login', 'message': req.flash('message')[0]});
  }
};

let logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};

module.exports = {
  myIndex: myIndex,
  login: login,
  logout: logout
};
