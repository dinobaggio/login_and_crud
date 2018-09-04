'use strict';

let Hal1 = require('../domains/hal1');

let Hal1Repository = function(db){
  this.db = db;
};

Hal1Repository.prototype = {

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM tbhal1';
    db.query(query, (err, results, fields) => {
      if(err){
        return errCb(err);
      }
      if(!results){
        return cb('tabel hal1 kosong');
      }else{
        let hal1Array = [];
        for(let i=0;i<results.length;i++){
          let s = results[i];
          let hal1 = new Hal1(s.id, s.isi);
          hal1Array.push(hal1);
        }
        return cb(hal1Array);
      }
    });
  },

  findSearch: function (search, cb, errCb) {
    let db = this.db;
    let query = `SELECT * FROM tbhal1 WHERE (id LIKE '%${search}%') OR
      (isi LIKE '%${search}%')`;
    db.query(query, (err, results, fields) => {
      if (err) return errCb(err);
      let hal1Array = [];
      for (let s of results) {
        let hal1 = new Hal1(s.id, s.isi);
        hal1Array.push(hal1);
      }
      return cb(hal1Array);
    });
  },

};

module.exports = Hal1Repository;
