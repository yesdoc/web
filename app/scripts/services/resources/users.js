'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.users
 * @description
 * # users
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Users', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/users/:id';

    return $resource( url,
        { id: '@_id' },
        { query: {method: 'GET', isArray: false },
         update: { method: 'PUT' }}
    );  
  });
