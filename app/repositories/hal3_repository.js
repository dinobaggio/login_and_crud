'use strict';

let Hal3 = require('../domains/hal3');

let Hal3Repository = function(db){
  this.db = db;
};

Hal3Repository.prototype = {

  findAll: function(cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM tbhal3';
    db.query(query, (err, results, fields) => {
      if(err){
        return errCb(err);
      }
      if(!results){
        return cb('tabel hal3 kosong');
      }else{
        let hal3Array = [];
        for(let i=0;i<results.length;i++){
          let s = results[i];
          let hal3 = new Hal3(s.id, s.isi);
          hal3Array.push(hal3);
        }
        return cb(hal3Array);
      }
    });
  },

  findSearch: function (search, cb, errCb) {
    let db = this.db;
    let query = `SELECT * FROM tbhal3 WHERE (id LIKE '%${search}%') OR
      (isi LIKE '%${search}%')`;
    db.query(query, (err, results, fields) => {
      if (err) return errCb(err);
      let hal3Array = [];
      for (let s of results) {
        let hal3 = new Hal3(s.id, s.isi);
        hal3Array.push(hal3);
      }
      return cb(hal3Array);
    });
  },

};

module.exports = Hal3Repository;
