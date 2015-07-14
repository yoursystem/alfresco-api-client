var dbURI = require('../../../src/server/config').db;
var config = require('./../../../src/server/config.js');
var mongoose = require('../../../src/server/mongoose');
var bootstrap = require('../../../src/server/bootstrap');
var Promise = require('bluebird');
var login = require('./../../../src/server/services/alfresco/auth/login');
var siteByshortname = require('./../../../src/server/services/alfresco/sites/get-site-by-shortname');
var createFolderAPI = require('./../../../src/server/services/alfresco/sites/create-folder');





var alf_ticket = '';
var site = null;
var node = null;

describe("Process alfresco site API test", function() {

  before(function(done) {
    login(config.alfresco.host,config.alfresco.user,config.alfresco.password).then( function(ticket){
      alf_ticket = ticket;
      done();
    },done);
  });


  it("Process get site by shortname", function(done) {
    siteByshortname(config.alfresco.host, 'podnety', alf_ticket).then( function(siteOnj){
      site = siteOnj;
      done();
    },done);
  });

  it("create test folder site via API", function(done) {
    //var nodeValue = node.properties['alfcmis:nodeRef'].value;

    createFolderAPI(config.alfresco.host, site.node ,  alf_ticket).then( function(siteOnj){
      done();
    },done);
  })

});
