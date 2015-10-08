var Promise = require('bluebird');
var request = require('superagent');

module.exports = function (host, ticket, nodeRef) {
  var resolver = Promise.pending();
  var elements = nodeRef.replace("://","/").split("/")
  return host + '/alfresco/service/api/node/content/'+elements[0] + '/' + elements[1] + '/' + elements[2] + '?alf_ticket='+ ticket;
}
