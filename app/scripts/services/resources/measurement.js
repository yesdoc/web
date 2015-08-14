'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.Measurement
 * @description
 * # Measurement
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Measurement', function ($resource) {
    return $resource('https://yesdoc-api.herokuapp.com/measurements/:id',
          { id: '@_id' },                                                         
          { query:{method:'GET',isArray:false}},  
          { update: {method: 'PUT' }}
          );  
  });
