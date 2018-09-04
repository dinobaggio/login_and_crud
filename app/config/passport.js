'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let db = require('./mysql_config');
let LoginRepository = require('../repositories/login_repository');

let passportConfig = {
  init: function(){
    let loginRepo = new LoginRepository(db);

    passport.serializeUser((user, done) => {
      done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
      loginRepo.findByUsername(username, result => {
        done(null, result);
      }, err => {
        if(err){
          done(err);
        }
      })
    });

    let strategy = new LocalStrategy({usernameField: 'username', passwordField: 'password', passReqToCallback: true}, (req, username, password, done) => {
      loginRepo.findByUsername(username, result => {
        console.log(result, 'ini result');
        //if (typeof result != 'object'){
        if(!result){
          done(null, false, req.flash('message', 'Username atau password yang dimasukkan salah !!'));
        }else if(!result.isValidPassword(password)){
          done(null, false, req.flash('message', 'Password yang dimasukkan salah !!'));
        }else{
          done(null, result);
        }
      }, err => {
        if(err){
          done(err);
        }
      });
    });

    passport.use('local', strategy);
    return passport.initialize();
  },

  auth: function(){
    return passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true});
  },

  session: function(){
    return passport.session();
  }
};

module.exports = passportConfig;
