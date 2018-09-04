'use strict';

let db = require('../../config/mysql_config');
let MemberRepo = require('../../repositories/admin/member_repository');
let Member = require('../../domains/admin/member');
let {RoleSuperAdmin} = require('../../role/RoleSuperAdmin');
let { ifNotSuper, ifDataKosong, ifIdTidakValid, ifError } = require('../../helper/function_tambahan');

/*
* alur
* jika role selain Super Admin maka tidak ada izin
*/

let pageDataMember = (req, res, next) => {
  let roleSuperAdmin = RoleSuperAdmin(req.user);
  if ( roleSuperAdmin === true) {
    return res.render('admin/member_crud', {title: 'Member List'});
  } else {
    return res.redirect('/');
  }
};

let saveMember = (req, res, next) => {
  let roleSuperAdmin = RoleSuperAdmin(req.user);
  if (roleSuperAdmin !== true) {
    return ifNotSuper(res);
  }
  let { id, username, password, fullname, status } = req.body;
  /*
  * kalo mau validasi
  */
  if (!id || !username || !password || !fullname || !status) {
    // jika salah satu ada yang false, atau kosong
    return ifDataKosong(res);
  }

  let bcrypt = require('bcrypt');
  let salt = 10;
  password = bcrypt.hashSync(password, salt);
  let member = new Member(id, username, password, fullname, status);
  let memberRepo = new MemberRepo(db);
  memberRepo.save(member, result => {
      let json = {
        message: 'success',
        data: member
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

let updateMember = (req, res, next) => {
  let roleSuperAdmin = RoleSuperAdmin(req.user);
  if (roleSuperAdmin !== true) {
    return ifNotSuper(res);
  }

  let {id, username, password, fullname, status, oldId} = req.body;

  if (!id || !username || !password || !fullname || !status) {
    return ifDataKosong(res);
  }

  let bcrypt = require('bcrypt');
  let salt = 10;
  password = bcrypt.hashSync(password, salt);
  let member = {id, username, password, fullname, status, oldId};
  let memberRepo = new MemberRepo(db);
  memberRepo.update(member, result => {
    let json = {
      message: 'success',
      data: member
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

let deleteMember = (req, res, next) => {
  let roleSuperAdmin = RoleSuperAdmin(req.user);
  if (roleSuperAdmin !== true) {
    return ifNotSuper(res);
  }

  let { id } = req.params;
  if (!id) {
    return ifIdTidakValid(res, id);
  }

  let memberRepo = new MemberRepo(db);
  memberRepo.delete(id, result => {
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
      //next(err);
      return ifError(res, err);
    }
  });
};

let getMember = (req, res, next) => {
  let roleSuperAdmin = RoleSuperAdmin(req.user);
  if (roleSuperAdmin !== true) {
    return ifNotSuper(res);
  }

  let { id } = req.params;
  if (!id) {
    return ifIdTidakValid(res, id);
  }

  let memberRepo = new MemberRepo(db);
  memberRepo.findOne(id, result => {
    let json = {
      message: 'success',
      data: result
    };
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


let getAllMember = (req, res, next) => {
  let roleSuperAdmin = RoleSuperAdmin(req.user);
  if (roleSuperAdmin !== true) {
    return ifNotSuper(res);
  }

  let memberRepo = new MemberRepo(db);
  let { search } = req.query;
  if (search) {
    // search
    let params = [req, res, next];
    getSearchMember(...params); // getSearch di initial di bawah
  } else {
    memberRepo.findAll(results => {
      let json = {
        message: 'success',
        data: results
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
  }
};
let getSearchMember = (req, res, next) => {
  let roleSuperAdmin = RoleSuperAdmin(req.user);
  if (roleSuperAdmin !== true) {
    return ifNotSuper(res);
  }
  let memberRepo = new MemberRepo(db);
  let { search } = req.query;
  memberRepo.findSearch(search, result => {
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
  saveMember: saveMember,
  updateMember: updateMember,
  deleteMember: deleteMember,
  getMember: getMember,
  getAllMember: getAllMember,
  pageDataMember
};
