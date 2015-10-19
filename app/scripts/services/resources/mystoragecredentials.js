'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.gender
 * @description
 * # gender
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MyStorageCredentials', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/my/storage_credentials/:id';

    return $resource( url,
        { id: '@_id' },
        { update: { method: 'PUT' },
          query: {method: 'GET', isArray: false }
        });  
  });
