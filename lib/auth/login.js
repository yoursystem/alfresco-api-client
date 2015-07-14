var Promise = require('bluebird');
var request = require('superagent');


// http://alfresco/alfresco/service/api/login?u=admin&pw=admin

module.exports = function(host, user , password) {
  var resolver = Promise.pending();
  request.get( host +'/alfresco/service/api/login').query({ u: user, pw: password, format:'json' })
    .end(function (err, res) {
        if (err){
          resolver.reject(err);
        }else{
          if (res.statusCode === 200) {
            resolver.resolve(res.body.data.ticket);
          }
          else{
            resolver.reject(new Error(res.statusCode));
          }
        }
    });
  return resolver.promise;
}
