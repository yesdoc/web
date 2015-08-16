'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.profile
 * @description
 * # profile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Profile', function ($global, $resource) {

    // URL of specific API resource
    var url=global.api_url()+'/profiles/:id';

    return $resource( url,
        { id: '@_id' },
        { query: {method: 'GET', isArray: false }},
        { update: { method: 'PUT' }}
    );  
  });
