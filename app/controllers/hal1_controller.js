'use strict';

let db = require('../config/mysql_config');
let Hal1Repo = require('../repositories/hal1_repository');
let Hal1 = require('../domains/hal1');

let pageDataHal1 = (req, res, next) => {
  res.render('hal1', {title: 'Halaman 1'});
}

let getAllHal1 = (req, res, next) => {
  let hal1Repo = new Hal1Repo(db);
  let { search } = req.query;
  if (search) {
    // search
    let params = [req, res, next];
    getSearchHal1(...params); // getSearch di initial di bawah
  } else {
    hal1Repo.findAll(results => {
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
let getSearchHal1 = (req, res, next) => {
  let hal1Repo = new Hal1Repo(db);
  let { search } = req.query;
  hal1Repo.findSearch(search, result => {
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
  getAllHal1: getAllHal1,
  pageDataHal1
};
