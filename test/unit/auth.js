var dbURI = require('../../../src/server/config').db;
var config = require('./../../../src/server/config.js');
var mongoose = require('../../../src/server/mongoose');
var bootstrap = require('../../../src/server/bootstrap');
var Promise = require('bluebird');
var login = require('./../../../src/server/services/alfresco/auth/login');
var ticket = require('./../../../src/server/services/alfresco/auth/ticket');
var logout = require('./../../../src/server/services/alfresco/auth/logout');
var alf_ticket = '';

describe("Process alfresco test", function() {



  it("Process login test", function(done) {
    login(config.alfresco.host,config.alfresco.user,config.alfresco.password).then( function(ticket){
      alf_ticket = ticket;
      done();
    },done);

  });


  it("Process validate valid ticket test", function(done) {
    ticket(config.alfresco.host, alf_ticket).then( function(isValid){
      done();
    },done);
  });

  it("Process validate invalid ticket test", function(done) {
    ticket(config.alfresco.host,alf_ticket+"SALT").then( function(isValid){
      done();
    },function(isValid){
      done();
    });
  });



  it("Process logout test", function(done) {
    logout(config.alfresco.host,alf_ticket).then( function(isloggedout){
        done();
    },done);
  });



  it("Process validate invalid ticket test", function(done) {
    ticket(config.alfresco.host,alf_ticket).then( function(isValid){
      done();
    },function(isValid){
      done();
    });
  });


});
