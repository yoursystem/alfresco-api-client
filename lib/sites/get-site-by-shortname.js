var Promise = require('bluebird');
var request = require('superagent');


module.exports = function (host, shortname , ticket) {
  var resolver = Promise.pending();
  request
    .get(host + '/alfresco/service/api/sites/' + shortname).query({alf_ticket: ticket})
    .end(function (err, res) {
      if (err) {
        resolver.reject(err);
      } else {
        if (res.statusCode === 200) {
          resolver.resolve(res.body);
        }
        else{
          resolver.reject(new Error(res.statusCode));
        }
      }
    });
  return resolver.promise;
}
