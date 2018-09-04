'use strict';

let Hal2 = require('../domains/hal2');

let Hal2Repository = function(db){
  this.db = db;
};

Hal2Repository.prototype = {

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM tbhal2';
    db.query(query, (err, results, fields) => {
      if(err){
        return errCb(err);
      }
      if(!results){
        return cb('tabel hal2 kosong');
      }else{
        let hal2Array = [];
        for(let i=0;i<results.length;i++){
          let s = results[i];
          let hal2 = new Hal2(s.id, s.isi);
          hal2Array.push(hal2);
        }
        return cb(hal2Array);
      }
    });
  },

  findSearch: function (search, cb, errCb) {
    let db = this.db;
    let query = `SELECT * FROM tbhal2 WHERE (id LIKE '%${search}%') OR
      (isi LIKE '%${search}%')`;
    db.query(query, (err, results, fields) => {
      if (err) return errCb(err);
      let hal2Array = [];
      for (let s of results) {
        let hal2 = new Hal2(s.id, s.isi);
        hal2Array.push(hal2);
      }
      return cb(hal2Array);
    });
  },

};

module.exports = Hal2Repository;
