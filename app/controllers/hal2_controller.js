'use strict';

let db = require('../config/mysql_config');
let Hal2Repo = require('../repositories/hal2_repository');
let Hal2 = require('../domains/hal2');

let pageDataHal2 = (req, res, next) => {
  res.render('hal2', {title: 'Halaman 2'});
}

let getAllHal2 = (req, res, next) => {
  let hal2Repo = new Hal2Repo(db);
  let { search } = req.query;
  if (search) {
    // search
    let params = [req, res, next];
    getSearchHal2(...params); // getSearch di initial di bawah
  } else {
    hal2Repo.findAll(results => {
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
let getSearchHal2 = (req, res, next) => {
  let hal2Repo = new Hal2Repo(db);
  let { search } = req.query;
  hal2Repo.findSearch(search, result => {
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
  getAllHal2: getAllHal2,
  pageDataHal2
};
