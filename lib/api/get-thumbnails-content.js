var Promise = require('bluebird');
var request = require('superagent');


module.exports = function (host, ticket, nodeRef, thumbnailName , params) {
  var resolver = Promise.pending();
  var elements = nodeRef.replace("://","/").split("/")
  var url = host + '/alfresco/service/api/node/'+elements[0] + '/' + elements[1] + '/' + elements[2] + "/content/thumbnails/"+thumbnailName;
  params.alf_ticket = ticket;
  request
    .get(url).query(params)
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
