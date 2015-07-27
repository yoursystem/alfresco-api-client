var Promise = require('bluebird');
var request = require('superagent');
module.exports = function(host, ticket, node, filePath, fileType, fileName) {
  var resolver = Promise.pending();
  var req = request
    .post(host + "/alfresco/service/api/upload")
    .query({
      alf_ticket: ticket
    })
    .field('destination', node);

  if (fileType) {
    req.field('contenttype', fileType)
  }
  if (fileName) {
    req.field('filename', fileName)
  }

  req.attach('filedata', filePath)
    .end(function(err, res) {
      if (err) {
        console.log(res)
        resolver.reject(err);
      } else {
        if (res.statusCode === 200) {
          resolver.resolve(res.body);
        } else {
          resolver.reject(new Error(res.statusCode));
        }
      }
    });
  return resolver.promise;
}
