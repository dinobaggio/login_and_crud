'use strict';

let db = require('../config/mysql_config');
let Hal3Repo = require('../repositories/hal3_repository');
let Hal3 = require('../domains/hal3');

let pageDataHal3 = (req, res, next) => {
  res.render('hal3', {title: 'Halaman 3'});
}

let getAllHal3 = (req, res, next) => {
  let hal3Repo = new Hal3Repo(db);
  let { search } = req.query;
  if (search) {
    // search
    let params = [req, res, next];
    getSearchHal3(...params); // getSearch di initial di bawah
  } else {
    hal3Repo.findAll(results => {
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
        next(err);
      }
    });
  }
};
let getSearchHal3 = (req, res, next) => {
  let hal3Repo = new Hal3Repo(db);
  let { search } = req.query;
  hal3Repo.findSearch(search, result => {
    let json = {
      result
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(json));
    return res.end();
  }, err => {
    let json = {
      err
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify(json));
  });
}

module.exports = {
  getAllHal3: getAllHal3,
  pageDataHal3
};
