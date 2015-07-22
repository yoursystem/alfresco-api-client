var alfresco = require('../../index');
var alf_ticket = '';

describe("Alfresco Client", function() {

  it("Login ", function(done) {
    alfresco.loginPromise(config.alfresco).then(function(alf_ticket){
      done();
    })
  });

  it("Validate ticket", function(done) {
    alfresco.ticket(function(result){
      done();
    });
  });

  it("browse root", function(done) {
    alfresco.cmisBrowserPromise('/sites', alfresco.CMIS_SELECTOR_CHILDREN).then(function(result){ done();},done);
  });

  it("browse root", function(done) {
    alfresco.cmisBrowserPromise('/sites/podnety/documentLibrary', alfresco.CMIS_SELECTOR_CHILDREN).then(function(result){ done();},done);
  });


  it("browse root", function(done) {
    alfresco.cmisBrowserPromise(null,'children').then(function(result){ done();},done);
  });


  it("Logout ticket", function(done) {
    alfresco.logout(function(result){
      done();
    });
  });



});
