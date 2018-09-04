'use strict';

let db = require('../config/mysql_config');
let StudentRepo = require('../repositories/student_repository');
let Student = require('../domains/student');
let { RoleUser } = require('../role/RoleUser');
let { ifUser, ifDataKosong, ifCodeTidakValid, ifError } = require('../helper/function_tambahan');


/*
* alur
* jika role user maka tidak ada izin
*/


let pageDataStudent = (req, res, next) => {
  let roleUser = RoleUser(req.user);
  if (roleUser === true) {
    return res.redirect('/');
  }
  return res.render('data_student', {title: 'Student List'});
}

let saveStudent = (req, res, next) => {
  let roleUser = RoleUser(req.user);
  if (roleUser === true) {
    return ifUser(res);
  }

  let { code, name, department, age, birthday, salary } = req.body;
  /*
  * kalo mau validasi
  */
  if (!code || !name || !department || !age || !birthday || !salary) {
    // jika salah satu ada yang false, atau kosong
    return ifDataKosong(res);
  }

  let student = new Student(code, name, department, parseInt(age), birthday, parseInt(salary));
  let studentRepo = new StudentRepo(db);
  studentRepo.save(student, result => {
      let json = {
        message: 'success',
        data: student
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(json));
      return res.end();
  }, err => {
      if(err){
        return ifError(res, err);
      }
  });
};

let updateStudent = (req, res, next) => {
  let roleUser = RoleUser(req.user);
  if (roleUser === true) {
    return ifUser(res);
  }

  /* if(!req.body){
    next('semua field harus diisi');
  } */
  let {code, name, department, age, birthday, salary, oldCode} = req.body;

  if (!code || !name || !department || !age || !birthday || !salary) {
    return ifDataKosong(res);
  }
  //let student = new Student(code, name, department, parseInt(age), birthday, parseInt(salary)); // make yang dibawah supaya dapet oldCode
  let student = {code, name, department, age, birthday, salary, oldCode};
  let studentRepo = new StudentRepo(db);
  studentRepo.update(student, result => {
    //res.redirect('/data_student');
    let json = {
      message: 'success',
      data: student
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(json));
    return res.end();
  }, err => {
    if(err){
      //next(err);
      return ifError(res, err);
    }
  });
};

let deleteStudent = (req, res, next) => {
  let roleUser = RoleUser(req.user);
  if (roleUser === true) {
    return ifUser(res);
  }

  /* if(!req.params){
    next('parameter code tidak ada');
  } */
  let { code } = req.params;
  if (!code) {
    return ifCodeTidakValid(res, code);
  }
  //let code = req.params.code;
  let studentRepo = new StudentRepo(db);
  studentRepo.delete(code, result => {
    //res.redirect('/data_student');
    let json = {
      message: 'success',
      data: result
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(json));
    return res.end();
  }, err => {
    if(err){
      return ifError(res, err);
    }
  });
};

let getStudent = (req, res, next) => {
  let roleUser = RoleUser(req.user);
  if (roleUser === true) {
    return ifUser(res);
  }

  let { code } = req.params;
  if (!code) {
    return ifCodeTidakValid(res, code);
  }
  //let code = req.params.code;
  let studentRepo = new StudentRepo(db);
  studentRepo.findOne(code, result => {
    let json = {
      message: 'success',
      data: result
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(json));
    return res.end();
    //res.render('student_detail', {'student': result, 'title': 'Student Detail'});
  }, err => {
    if(err){
      return ifError(res, err);
    }
  });
};

let getAllStudent = (req, res, next) => {
  let roleUser = RoleUser(req.user);
  if (roleUser === true) {
    return ifUser(res);
  }

  let studentRepo = new StudentRepo(db);
  let { search } = req.query;
  if (search) {
    // search
    let params = [req, res, next];
    getSearchStudent(...params); // getSearch di initial di bawah
  } else {
    studentRepo.findAll(results => {
      let json = {
        message: 'success',
        data: results
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(json));
      return res.end();
      //res.render('data_student', {'students': results, 'title': 'Student List'});
    }, err => {
      if(err){
        return ifError(res, err);
      }
    });
  }
};
let getSearchStudent = (req, res, next) => {
  let roleUser = RoleUser(req.user);
  if (roleUser === true) {
    return ifUser(res);
  }

  let studentRepo = new StudentRepo(db);
  let { search } = req.query;
  studentRepo.findSearch(search, result => {
    let json = {
      result
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(json));
    return res.end();
  }, err => {
    return ifError(res, err);
  });
}

module.exports = {
  saveStudent: saveStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
  getStudent: getStudent,
  getAllStudent: getAllStudent,
  pageDataStudent
};
