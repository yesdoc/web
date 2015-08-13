'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.profile
 * @description
 * # profile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Profile', function ($resource) {
    return $resource('https://yesdoc-api.herokuapp.com/profiles/:id',
        { id: '@_id' },
        { query: {method: 'GET', isArray: false }},
        { update: { method: 'PUT' }}
    );  
  });
