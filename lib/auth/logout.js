var Promise = require('bluebird');
var request = require('superagent');


// http://alfresco/alfresco/service/api/login?u=admin&pw=admin

module.exports = function(host, ticket) {
  var resolver = Promise.pending();
  request
    .del(host + '/alfresco/service/api/login/ticket/'+ticket).query({ alf_ticket: ticket, format:'json'})
    .end(function (err, res) {
        if (err){
          resolver.reject(err);
        }else{
          if (res.statusCode === 200) {
            resolver.resolve(true);
          } else if (res.statusCode === 401) {
            resolver.resolve(false);
          }
          else{
            resolver.reject(new Error(res.statusCode));
          }
        }
    });
  return resolver.promise;
}
