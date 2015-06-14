'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.gender
 * @description
 * # gender
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Gender', function ($resource) {
    return $resource('http://localhost:9000/var/gender.json/:id',
        { id: '@_id' },
        { update: { 
            method: 'PUT' }
        }   
    );  
  });
