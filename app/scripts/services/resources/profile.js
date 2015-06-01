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
    return $resource('http://localhost:9000/var/profile.json/:id',
        { id: '@_id' },
        { update: { 
            method: 'PUT' }
        }   
    );  
  });
