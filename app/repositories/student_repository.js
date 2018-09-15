'use strict';

let Student = require('../domains/student');

let StudentRepository = function(db){
  this.db = db;
};

StudentRepository.prototype = {
  save: function(s, cb, errCb){
    let db = this.db;
    //let data = {code: s.code, name: s.name, department: s.department, age: s.age, birthday: s.birthday, salary: s.salary};
    // s === data
    let query = 'INSERT INTO student SET ?';
    this.findOne(s.code, (result) => {
      // menggunakan fungsi findOne yang sudah dibuat untuk validasi code
      if (result === true) {
        // jika code belum ada
        db.query(query, s, (err, results) => {
          if(err){
            return errCb(err);
          }
          return cb(results);
        });
      } else {
        // jika code sudah ada
        return errCb(`Code ${s.code} sudah ada`);
      }
    }, (err) => {
      console.log("error ya masuk sini",err);
      return errCb(err);
    });
  },

  update: function(s, cb, errCb){
    let db = this.db;
    let data = {code: s.code, name: s.name, department: s.department, age:s.age, birthday: s.birthday, salary: s.salary};
    if (s.code == s.oldCode) {
      let query = `UPDATE student SET ? WHERE code = '${s.code}' `;
      db.query(query, data, (err, results) => {
        if(err){
          console.log(err);
          return errCb(err);
        }
        console.log(s);
        return cb(results);
      });
    } else {
      this.findOne(s.code, (result) => {
        // menggunakan fungsi findOne yang sudah dibuat untuk validasi code
        if (result === true) {
          // jika code belum ada
          let query = `UPDATE student SET ? WHERE code = '${s.oldCode}' `;
          db.query(query, data, (err, results) => {
            if (err) {
              console.log(err);
              errCb(err);
            }
            return cb(results);
          });
        } else {
          // jika code sudah ada
          return errCb(`Code ${s.code} sudah ada`);
        }
      }, (err) => {
        console.log('error ya masuk sini', err);
        return errCb(err);
      });
    }
  },

  delete: function(code, cb, errCb){
    let db = this.db;
    let query = 'DELETE FROM student WHERE code = ?';
    db.query(query, [code], (err, results) => {
      if(err){
        return errCb(err);
      }
      cb(results);
    });
  },

  findOne: function(code, cb, errCb){
    let db = this.db;
    let query = `SELECT * FROM student WHERE ? `;
    //console.log("masuk sini code: ", code);
    db.query(query, {code}, (err, results, fields) => {
      if(err){
        return errCb(err);
      }
      if(!results[0]){
        return cb(true); // return true jika code student belum ada untuk validasi save student
      }else{
        let s = results[0];
        let student = new Student(s.code, s.name, s.department, s.age, s.birthday, s.salary);
        return cb(student);
      }
    });
  },

  findAll: function(setting, cb, errCb){
    let db = this.db;
    let query = `SELECT * FROM student LIMIT ${setting.start}, ${setting.length}`;
    db.query(query, (err, results, fields) => {
      if(err){
        return errCb(err);
      }
      if(!results){
        return cb('tabel student kosong');
      }else{
        let studentArray = [];
        for(let i=0;i<results.length;i++){
          let s = results[i];
          let student = [s.code, s.name, s.department, s.age, s.birthday, s.salary] //new Student(s.code, s.name, s.department, s.age, s.birthday, s.salary);
          studentArray.push(student);
        }
        return cb(studentArray);
      }
    });
  },

  totalRecord : function (cb, errCb) {
    let db = this.db;
    let query = 'SELECT * FROM student';
    db.query(query, (err, results, fields) => {
      if (err) {
        return errCb(err);
      } if (!results) {
        return cb('table kosong');
      } else {
        cb(results.length);
      }
    })
  },
  findSearch: function (search, cb, errCb) {
    let db = this.db;
    let query = `SELECT * FROM student WHERE (code LIKE '%${search}%') OR
      (name LIKE '%${search}%') OR (department LIKE '%${search}%') OR
      (age LIKE '%${search}%') OR (birthday LIKE '%${search}%') OR
      (salary LIKE '%${search}%')`;
    db.query(query, (err, results, fields) => {
      if (err) return errCb(err);
      let studentArray = [];
      for (let s of results) {
        let student = new Student(s.code, s.name, s.department, s.age, s.birthday, s.salary);
        studentArray.push(student);
      }
      return cb(studentArray);
    });
  },

};

module.exports = StudentRepository;
