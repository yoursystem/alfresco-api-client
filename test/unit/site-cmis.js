var dbURI = require('../../../src/server/config').db;
var config = require('./../../../src/server/config.js');
var mongoose = require('../../../src/server/mongoose');
var bootstrap = require('../../../src/server/bootstrap');
var Promise = require('bluebird');
var login = require('./../../../src/server/services/alfresco/auth/login');
var browser = require('./../../../src/server/services/alfresco/cmis/browser');
var createFolder = require('./../../../src/server/services/alfresco/cmis/folder-create');
var createDocument = require('./../../../src/server/services/alfresco/cmis/document-create');
var alfresco =  require('./../../../src/server/services/alfresco/alfresco');


var alf_ticket = '';
var site = null;
var node = null;

describe("Alfresco site CMIS test", function() {

  before(function(done) {
    login(config.alfresco.host,config.alfresco.user,config.alfresco.password).then( function(ticket){
      alf_ticket = ticket;
      done();
    },done);
  });

  it("browseFolderTree root", function(done) {
    browser(config.alfresco.host,alf_ticket,  null, alfresco.CMIS_SELECTOR_FOLDER_TREE).then( function(root){
      done();
    },done);
  });

  it("browseFolderTree /sites", function(done) {
    browser(config.alfresco.host, alf_ticket , '/sites', alfresco.CMIS_SELECTOR_FOLDER_TREE).then( function(siteOnj){
      done();
    },done);
  });

  it("browseFolderTree /sites/podnety", function(done) {
    browser(config.alfresco.host, alf_ticket, '/sites/podnety', alfresco.CMIS_SELECTOR_FOLDER_TREE).then( function(siteOnj){
      done();
    },done);
  });

  it("browseFolderTree /sites/podnety/documentLibrary", function(done) {
    browser(config.alfresco.host, alf_ticket, '/sites/podnety/documentLibrary', alfresco.CMIS_SELECTOR_FOLDER_TREE).then( function(siteOnj){
      done();
    },done);
  });

  it("browseFolder root", function(done) {
    browser(config.alfresco.host, alf_ticket, null, alfresco.CMIS_SELECTOR_FOLDER).then( function(root){
      done();
    },done);
  });

  it("browseFolder /sites", function(done) {
    browser(config.alfresco.host,alf_ticket, '/sites', alfresco.CMIS_SELECTOR_FOLDER).then( function(siteOnj){
      done();
    },done);
  });


  it("browseFolder /sites/podnety", function(done) {
    browser(config.alfresco.host,alf_ticket, '/sites/podnety', alfresco.CMIS_SELECTOR_FOLDER).then( function(siteOnj){
      done();
    },done);
  });

  it("browseFolder /sites/podnety/documentLibrary", function(done) {
    browser(config.alfresco.host, alf_ticket, '/sites/podnety/documentLibrary', alfresco.CMIS_SELECTOR_FOLDE).then( function(siteOnj){
      done();
    },done);
  });


  it("browserChildren root", function(done) {
    browser(config.alfresco.host, alf_ticket,null, alfresco.CMIS_SELECTOR_CHILDREN ).then( function(root){
      done();
    },done);
  });

  it("browserChildren /sites", function(done) {
    browser(config.alfresco.host,alf_ticket, '/sites', alfresco.CMIS_SELECTOR_CHILDREN).then( function(siteOnj){
      done();
    },done);
  });


  it("browserChildren /sites/podnety", function(done) {
    browser(config.alfresco.host,alf_ticket, '/sites/podnety', alfresco.CMIS_SELECTOR_CHILDREN ).then( function(siteOnj){
      done();
    },done);
  });

  it("browserChildren /sites/podnety/documentLibrary", function(done) {
    browser(config.alfresco.host,alf_ticket, '/sites/podnety/documentLibrary', alfresco.CMIS_SELECTOR_CHILDREN ).then( function(siteOnj){
      done();
    },done);
  });



  it("list root", function(done) {
    browser(config.alfresco.host,alf_ticket, null).then( function(root){
       // console.log(root);
      done();
    },done);
  });


  it("list sites", function(done) {
    browser(config.alfresco.host,alf_ticket, '/sites').then( function(siteOnj){

      done();
    },done);
  });


  it("list test site", function(done) {
    browser(config.alfresco.host, alf_ticket, '/sites/podnety').then( function(siteOnj){
      node = siteOnj;
      done();
    },done);
  });

  it("list test site document library", function(done) {
    browser(config.alfresco.host,alf_ticket, '/sites/podnety/documentLibrary').then( function(siteOnj){
      node = siteOnj;
      done();
    },done);
  });




  it("create test folder site", function(done) {
    createFolder(config.alfresco.host, alf_ticket,'/sites/podnety/documentLibrary').then( function(siteOnj){
      done();
    },done);
  });

  it("create test file site", function(done) {
    createDocument(config.alfresco.host , alf_ticket, '/sites/podnety/documentLibrary').then( function(siteOnj){
      done();
    },done);
  });


});
