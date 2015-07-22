var dbURI = require('../../../src/server/config').db;
var config = require('./../../../src/server/config.js');
var mongoose = require('../../../src/server/mongoose');
var bootstrap = require('../../../src/server/bootstrap');
var Promise = require('bluebird');
var login = require('./../../../src/server/services/alfresco/auth/login');
var siteByshortname = require('./../../../src/server/services/alfresco/api/get-site-by-shortname');
var createFolderAPI = require('./../../../src/server/services/alfresco/api/create-folder');
var createDocumentAPI = require('./../../../src/server/services/alfresco/api/create-document');

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
    siteByshortname(config.alfresco.host, alf_ticket, 'podnety').then( function(siteOnj){
      site = siteOnj;
      done();
    },done);
  });

  it("create test folder site via API", function(done) {
    //var nodeValue = node.properties['alfcmis:nodeRef'].value;
    createFolderAPI(config.alfresco.host, alf_ticket, site.node, 'test', 'test-title' , 'test-description').then( function(siteOnj){
      done();
    },done);
  })

  it("create test file site via API", function(done) {
    //var nodeValue = node.properties['alfcmis:nodeRef'].value;
    createFolderAPI(config.alfresco.host, alf_ticket, site.node, 'test', 'test-title' , 'test-description').then( function(siteOnj){
      done();
    },done);
  })

});
