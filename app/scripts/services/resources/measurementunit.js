'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.measurementunit
 * @description
 * # measurementunit
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MeasurementUnit', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/measurement_units/:id';

  return $resource( url,       
        { id: '@_id' },                                                        
        { query:{method:'GET',isArray:false}},
        { update: {method: 'PUT'}}
        );  
  });
