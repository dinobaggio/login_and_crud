'use strict';

let bcrypt = require('bcrypt');
let salt = 10;

let Login = function(id, username, password, fullname, status){
  this.id = id;
  this.username = username;
  this.password = password;
  this.fullname = fullname;
  this.status = status;
};

Login.prototype.isValidPassword = function(password){
  //return this.password === password;
  return bcrypt.compareSync(password, this.password);
};

module.exports = Login;
