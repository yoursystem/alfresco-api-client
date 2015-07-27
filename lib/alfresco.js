'use strict';

/*!
 * Module dependencies.
 */
var Promise = require('bluebird')
  , login = require('./auth/login')
  , ticket = require('./auth/ticket')
  , logout = require('./auth/logout')
  , cmisBrowser = require('./cmis/browser')
  , siteByShortname = require('./api/get-site-by-shortname')
  , createFolderAPI = require('./api/create-folder')
  , createDocumentAPI = require('./api/create-document')
  , getContent = require('./api/get-content')
  , pkg = require('../package.json');


/**
 * Alfresco constructor.
 *
 * The exports object of the `alfresco` module is an instance of this class.
 * Most apps will only use this one instance.
 *
 * @api public
 */

function Alfresco() {
  this.alf_ticket = null;
};


Alfresco.prototype.CMIS_SELECTOR_CHILDREN = 'children';
Alfresco.prototype.CMIS_SELECTOR_FOLDER_TREE = 'folderTree';
Alfresco.prototype.CMIS_SELECTOR_FOLDER = 'folder';
Alfresco.prototype.CMIS_SELECTOR_OBJECT = 'object';
Alfresco.prototype.CMIS_SELECTOR_CONTENT = 'content';

Alfresco.prototype.CMIS_PROPERTY_NAME = 'cmis:name';
Alfresco.prototype.CMIS_PROPERTY_OBJECT_TYPE_ID = 'cmis:objectTypeId';

Alfresco.prototype.CMIS_OBJECT_TYPE_FOLDER = 'cmis:folder';
Alfresco.prototype.CMIS_OBJECT_TYPE_DOCUMENT = 'cmis:document';

Alfresco.prototype.CMIS_ACTION_DELETE = 'delete';
Alfresco.prototype.CMIS_ACTION_CREATE_FOLDER = 'createFolder';
Alfresco.prototype.CMIS_ACTION_CREATE_DOCUMENT = 'createDocument';


/**
 * Sets alfresco options
 *
 * ####Example:
 *
 *     alfresco.set('test', value) // sets the 'test' option to `value`
 *
 *     alfresco.set('debug', true) // enable logging collection methods + arguments to the console
 *
 * @param {String} key
 * @param {String} value
 * @api public
 */

Alfresco.prototype.set = function (key, value) {
  if (arguments.length == 1) {
    return this.options[key];
  }

  this.options[key] = value;
  return this;
};

/**
 * Gets alfresco options
 *
 * ####Example:
 *
 *     alfresco.get('test') // returns the 'test' value
 *
 * @param {String} key
 * @method get
 * @api public
 */

Alfresco.prototype.get = Alfresco.prototype.set;

/**
 * Opens the default Alfersco connection, and save alf_ticket.
 *
 *
 * @param {Object} [options]
 * @param {Function} [callback]
 * @see Alfresco#createConnection #index_Alfresco-createConnection
 * @api public
 * @return {Alfresco} this
 */
Alfresco.prototype.loginPromise = function (options) {
  this.options = options;
  this.set('host', options.host || process.env.ALFRESCO_HOST);
  this.set('user', options.user || process.env.ALFRESCO_USER);
  this.set('password', options.password || process.env.ALFRESCO_PASSWORD);
  var self = this;
  return login(this.get('host'), this.get('user'), this.get('password')).then(function (alf_ticket) {
      self.set('alf_ticket', alf_ticket);
      return alf_ticket;
    },
    function (err) {
      throw err
    });
};

/**
 * Opens the default Alfresco connection.
 *
 *
 * @param {Function} [callback]
 * @see Alfresco#createConnection #index_Alfresco-createConnection
 * @api public
 * @return {Alfresco} this
 */

Alfresco.prototype.ticket = function (callback) {
  return ticket(this.get('host'), this.get('alf_ticket')).then(function (result) {
      callback(result);
    },
    function (err) {
      throw err
    });
};


/**
 * Opens the default Alfresco connection.
 *
 * @param {Function} [callback]
 * @see Alfresco#createConnection #index_Alfresco-createConnection
 * @api public
 * @return {Alfresco} this
 */

Alfresco.prototype.logout = function (callback) {
  var self = this;
  return logout(this.get('host'), this.get('alf_ticket')).then(function () {
      self.set('alf_ticket', null)
      callback();
      return null;
    },
    function (err) {
      throw err
    });
};


/**
 * Browser
 *
 *
 * @param {String} [path]
 * @param {String} [cmisselector]
 * @param {String} [objectId]
 * @see Alfresco#createConnection #index_Alfresco-createConnection
 * @api public
 * @return {Promise} this
 */

Alfresco.prototype.cmisBrowserPromise = function (path, cmisselector, objectId) {
  return cmisBrowser(this.get('host'), this.get('alf_ticket'), path, cmisselector, objectId);
};



/**
 * GetSiteByShortname
 *
 *
 * @param {String} [shortname]
 * @api public
 * @return {Promise} this
 */

Alfresco.prototype.getSiteByShortnamePromise = function (shortname) {
  return  siteByShortname(this.get('host'),  this.get('alf_ticket'), shortname);
};

/**
 * getContentPromise
 *
 *
 * @param {String} [nodeRef]
 * @api public
 * @return {Promise} this
 */

Alfresco.prototype.getContentPromise = function (nodeRef) {
  return  getContent(this.get('host'),  this.get('alf_ticket'), nodeRef);
};



/**
 * GetDocumentLibraryForSiteByShortname
 *
 *
 * @param {String} [shortname]
 * @api public
 * @return {Promise} this
 */

Alfresco.prototype.getDocumentLibraryForSiteByShortname = function (shortname) {
  return cmisBrowser(this.get('host'),  this.get('alf_ticket'), '/sites/'+shortname, alfresco.CMIS_SELECTOR_CHILDREN).then(function(objects){
    return objects.objects[0].object.properties['alfcmis:nodeRef'].value;
  });
};


/**
 * createFolder
 *
 *
 * @param {String} [node]
 * @param {String} [folderName]
 * @param {String} [folderTitle]
 * @param {String} [folderDescription]
 * @api public
 * @return {Promise} this
 */

Alfresco.prototype.getThumbnailDefinition = function (node) {
  return  createFolderAPI(this.get('host'),this.get('alf_ticket'), node ,name,title,description);
};

/**
 * createDocumentPromise
 *
 *
 * @param {String} [nodeRef]
 * @param {String} [filePath]
* @param {String} [fileType]
 * @api public
 * @return {Promise} this
 */

Alfresco.prototype.createDocumentPromise = function (node, filePath, fileType, fileName) {
  return  createDocumentAPI(this.get('host'),this.get('alf_ticket'), node, filePath, fileType, fileName);
};



/**
 * createDocumentPromise
 *
 *
 * @param {String} [cmisFolderPath]
 * @param {String} [filePath]
* @param {String} [fileType]
 * @api public
 * @return {Promise} this
 */

Alfresco.prototype.createDocumentPromise = function (node, filePath, fileType, fileName) {
  return  createDocumentAPI(this.get('host'),this.get('alf_ticket'), node, filePath, fileType, fileName);
};




/**
 * The Alfresco version
 *
 * @property version
 * @api public
 */

Alfresco.prototype.version = pkg.version;

/**
 * The Alfresco constructor
 *
 * The exports of the mongoose module is an instance of this class.
 *
 * ####Example:
 *
 *     var mongoose = require('mongoose');
 *     var mongoose2 = new mongoose.Alfresco();
 *
 * @method Alfresco
 * @api public
 */

Alfresco.prototype.Alfresco = Alfresco;

/**
 * The Alfresco [Promise](#promise_Promise) constructor.
 *
 * @method Promise
 * @api public
 */

Alfresco.prototype.Promise = Promise;


/*!
 * The exports object is an instance of Alfresco.
 *
 * @api public
 */

var alfresco = module.exports = exports = new Alfresco;
