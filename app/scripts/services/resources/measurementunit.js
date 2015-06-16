'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.measurementunit
 * @description
 * # measurementunit
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MeasurementUnit', function ($resource) {
  return $resource('https://yesdoc-api.herokuapp.com/measurement_units',       
        { id: '@_id' },                                                        
        {query:{method:'GET',isArray:false},
            update: {method: 'PUT'}}
        );  
  });
