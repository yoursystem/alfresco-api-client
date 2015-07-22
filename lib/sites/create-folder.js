var Promise = require('bluebird');
var request = require('superagent');


module.exports = function (host, ticket, node, name, title, description) {
  var resolver = Promise.pending();
  node = node.replace(':/','');
  var elements = node.split('/');
  var store_type   = elements[elements.length-3];
  var store_id= elements[elements.length-2];
  var id = elements[elements.length-1];

  request
    .post(host + "/alfresco/service/api/node/folder/" + store_type +"/" + store_id+ "/" + id )
    .query({alf_ticket: ticket})
    .send(  {
      "name": name,
      "title": title,
      "description": description
    })
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
