var Promise = require('bluebird');
var request = require('superagent');
var alfresco = require('../alfresco');

module.exports = function (host,path, ticket) {
  if (!path)
    path = '';

  var resolver = Promise.pending();
  request
    .post(host + '/alfresco/api/-default-/public/cmis/versions/1.1/browser/root' + path )
    .query({alf_ticket: ticket})
      .field('cmisaction',alfresco.CMIS_ACTION_DELETE)
    .end(function (err, res) {
      if (err) {
        resolver.reject(err);
      } else {
        if (res.statusCode === 200) {
          resolver.resolve(res.body);
        }  else if (res.statusCode === 201) {
            resolver.resolve(res.body);
          }
        else{
          resolver.reject(new Error(res.statusCode));
        }
      }
    });
  return resolver.promise;
}
