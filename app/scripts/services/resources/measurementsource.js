'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.measurementsource
 * @description
 * #measurementsource
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MeasurementSource', function ($resource) {
    return $resource('https://yesdoc-api.herokuapp.com/measurement_sources/:id',        
        { id: '@_id' },                                                        
        { query:{method:'GET',isArray:false}},
        { update:{method: 'PUT' }}
        );  
  });
