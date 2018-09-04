'use strict';

let Member = function(id, username, password, fullname, status){
  this.id = id;
  this.username = username;
  this.password = password;
  this.fullname = fullname;
  this.status = status;
};

module.exports = Member;
