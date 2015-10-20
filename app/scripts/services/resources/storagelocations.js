'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.myanalisis
 * @description
 * # myanalisis
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('StorageLocations', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/storage_locations/:id';

    return $resource( url,
        { id: '@_id' },
        { query: {method: 'GET', isArray: false }
        });  
  });
