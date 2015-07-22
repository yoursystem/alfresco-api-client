var Promise = require('bluebird');
var request = require('superagent');

module.exports = function (host, ticket, path, filePath, fileName) {
  if (!path)
    path = '';

  var resolver = Promise.pending();
  request
    .post(host + '/alfresco/api/-default-/public/cmis/versions/1.1/browser/root' + path )
    .query({alf_ticket: ticket})
      .field('propertyValue[0]', fileName)
      .field('propertyId[0]','cmis:name')
      .field('propertyId[1]','cmis:objectTypeId')
      .field('propertyValue[1]','cmis:document')
      .field('cmisaction','createDocument')
    .attach('content', filePath)
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
