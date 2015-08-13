'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.measurementtype
 * @description
 * # measurementtype
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MeasurementType', function ($resource) {
    // Public API here
    return $resource('https://yesdoc-api.herokuapp.com/measurement_types/:id', 
        { id: '@_id' },                                                         
        {query:{method:'GET',isArray:false}},
        {update: {method: 'PUT' }}
        );  
  });
