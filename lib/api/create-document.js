var Promise = require('bluebird');
var request = require('superagent');
module.exports = function (host, ticket, node, filePath, fileType) {
  var resolver = Promise.pending();
  request
    .post(host + "/alfresco/service/api/upload" )
    .query({alf_ticket: ticket})
   .field('destination', node)
      .field('filename', 'alfresco.js')
    //  .field('contenttype', 'text/javascript')
    .attach('filedata', filePath)
    .end(function (err, res) {
      if (err) {
        console.log(res)
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
