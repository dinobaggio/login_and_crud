'use strict';

let Member = require('../../domains/admin/member');

let MemberRepository = function(db){
  this.db = db;
};

MemberRepository.prototype = {
  save: function(s, cb, errCb){
    let db = this.db;
    let query = 'INSERT INTO member SET ?';
    this.findOne(s.id, (result) => {
      // menggunakan fungsi findOne yang sudah dibuat untuk validasi id
      if (result === true) {
        // jika id belum ada
        db.query(query, s, (err, results) => {
          if(err){
            return errCb(err);
          }
          return cb(results);
        });
      } else {
        // jika id sudah ada
        return errCb(`Id ${s.id} sudah ada`);
      }
    }, (err) => {
      console.log("error ya masuk sini",err);
      return errCb(err);
    });
  },

  update: function(s, cb, errCb){
    let db = this.db;
    let data = {id: s.id, username: s.username, password: s.password, fullname:s.fullname, status: s.status};
    if (s.id == s.oldId) {
      let query = `UPDATE member SET ? WHERE id = '${s.id}' `;
      db.query(query, data, (err, results) => {
        if(err){
          console.log(err);
          return errCb(err);
        }
        console.log(s);
        return cb(results);
      });
    } else {
      this.findOne(s.id, (result) => {
        // menggunakan fungsi findOne yang sudah dibuat untuk validasi id
        if (result === true) {
          // jika id belum ada
          let query = `UPDATE member SET ? WHERE id = '${s.oldId}' `;
          db.query(query, data, (err, results) => {
            if (err) {
              console.log(err);
              errCb(err);
            }
            return cb(results);
          });
        } else {
          // jika id sudah ada
          return errCb(`Id ${s.id} sudah ada`);
        }
      }, (err) => {
        console.log('error ya masuk sini', err);
        return errCb(err);
      });
    }
  },

  delete: function(id, cb, errCb){
    let db = this.db;
    let query = 'DELETE FROM member WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if(err){
        return errCb(err);
      }
      cb(results);
    });
  },

  findOne: function(id, cb, errCb){
    let db = this.db;
    let query = `SELECT * FROM member WHERE ? `;
    //console.log("masuk sini id: ", id);
    db.query(query, {id}, (err, results, fields) => {
      if(err){
        return errCb(err);
      }
      if(!results[0]){
        return cb(true); // return true jika id member belum ada untuk validasi save member
      }else{
        let s = results[0];
        let member = new Member(s.id, s.username, s.password, s.fullname, s.status);
        return cb(member);
      }
    });
  },

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM member';
    db.query(query, (err, results, fields) => {
      if(err){
        return errCb(err);
      }
      if(!results){
        return cb('tabel member kosong');
      }else{
        let memberArray = [];
        for(let i=0;i<results.length;i++){
          let s = results[i];
          let member = new Member(s.id, s.username, s.password, s.fullname, s.status);
          memberArray.push(member);
        }
        return cb(memberArray);
      }
    });
  },

  findSearch: function (search, cb, errCb) {
    let db = this.db;
    let query = `SELECT * FROM member WHERE (id LIKE '%${search}%') OR
      (username LIKE '%${search}%') OR (password LIKE '%${search}%') OR
      (fullname LIKE '%${search}%') OR (status LIKE '%${search}%')`;
    db.query(query, (err, results, fields) => {
      if (err) return errCb(err);
      let memberArray = [];
      for (let s of results) {
        let member = new Member(s.id, s.username, s.password, s.fullname, s.status);
        memberArray.push(member);
      }
      return cb(memberArray);
    });
  },

};

module.exports = MemberRepository;
