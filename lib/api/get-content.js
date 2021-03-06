var Promise = require('bluebird');
var request = require('superagent');


module.exports = function (host, ticket, nodeRef) {
  var resolver = Promise.pending();
  var elements = nodeRef.replace("://","/").split("/")
  request
    .get(host + '/alfresco/service/api/node/content/'+elements[0] + '/' + elements[1] + '/' + elements[2] ).query({alf_ticket: ticket})
    .end(function (err, res) {
      if (err) {
        resolver.reject(err);
      } else {
        if (res.statusCode === 200) {
          resolver.resolve(res.text||res.body);
        }
        else{
          resolver.reject(new Error(res.statusCode));
        }
      }
    });
  return resolver.promise;
}
