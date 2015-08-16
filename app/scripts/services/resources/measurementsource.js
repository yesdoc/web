'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.measurementsource
 * @description
 * #measurementsource
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MeasurementSource', function ($global ,$resource) {

    // URL of specific API resource
    var url=global.api_url()+'/measurment_source/:id';

    return $resource( url,        
        { id: '@_id' },                                                        
        { query:{method:'GET',isArray:false}},
        { update:{method: 'PUT' }}
        );  
  });
