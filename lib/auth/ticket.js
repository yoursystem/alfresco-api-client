var Promise = require('bluebird');
var request = require('superagent');


module.exports = function (host, ticket) {
  var resolver = Promise.pending();
  request
    .get(host + '/alfresco/service/api/login/ticket/' + ticket).query({alf_ticket: ticket})
    .end(function (err, res) {
      if (err) {
        resolver.reject(err);
      } else {
        if (res.statusCode === 200) {
          resolver.resolve(true);
        } else if (res.statusCode === 401) {
          resolver.resolve(false);
        } else {
          resolver.resolve(false);
        }
      }
    });
  return resolver.promise;
};
