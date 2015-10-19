'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.myanalisis
 * @description
 * # myanalisis
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('StorageCredentials', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/storage_credentials/:id';

    return $resource( url,
        { id: '@_id' },
        { update: { method: 'PUT' },
          query: {method: 'GET', isArray: false }
        });  
  });
