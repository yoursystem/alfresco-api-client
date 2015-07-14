var Promise = require('bluebird');
var request = require('superagent');
var alfresco = request('./../alfresco');

module.exports = function (host, ticket, path, cmisselector, objectId) {
  if (!path)
    path = '';

  var query = {alf_ticket: ticket};

  query.cmisselector = cmisselector || alfresco.CMIS_SELECTOR_OBJECT;

  if(objectId){
    query.objectId=objectId;
  }

  var resolver = Promise.pending();
  request
    .get(host + '/alfresco/api/-default-/public/cmis/versions/1.1/browser/root' + path )
    .query(query)
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
