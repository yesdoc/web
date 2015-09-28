'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.epicrisis
 * @description
 * # epicrisis
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Epicrisis', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/epicrisis/:id';

    return $resource( url,
        { id: '@_id' },
        { update: { method: 'PUT' },
          query: {method: 'GET', isArray: false }
        });  
  });
