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
    return $resource('https://yesdoc-api.herokuapp.com/genders/:id',
        { id: '@_id' },
        { query: {method: 'GET', isArray: false }},
        { update: { 
            method: 'PUT' }
        }   
    );  
  });
