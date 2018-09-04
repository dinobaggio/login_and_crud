'use strict';

let Login = require('../domains/login');

let LoginRepository = function(db){
  this.db = db;
};

LoginRepository.prototype = {
  save: function(m, cb, errCb){
    let db = this.db;
    let data = {username: m.username, password: m.password, fullname: m.fullname, status: m.status};
    let query = 'INSERT INTO member SET ?';
    db.query(query, data, (err, result) => {
      if(err){
        errCb(err);
      }
      cb(result);
    });
  },

  findByUsername: function(username, cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM member WHERE username = ?';
    db.query(query, [username], (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if (!results[0]){
        cb(false);
      }else{
        let m = results[0];
        let login = new Login(m.id, m.username, m.password, m.fullname, m.status);
        cb(login);
      }
    });
  }
};

module.exports = LoginRepository;
