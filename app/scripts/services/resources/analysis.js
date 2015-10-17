'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.profile
 * @description
 * # profile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Analysis', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/analysis/:id';

    return $resource( url,
        { id: '@_id' },
        { update: { method: 'PUT' },
          query: {method: 'GET', isArray: false }
        });  
  });
