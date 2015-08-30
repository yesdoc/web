'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.measurementtype
 * @description
 * # measurementtype
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MeasurementType', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/measurement_types/:id';

    return $resource( url, 
        { id: '@_id' },                                                         
        {query:{method:'GET',isArray:false}},
        {update: {method: 'PUT' }}
        );  
  });
