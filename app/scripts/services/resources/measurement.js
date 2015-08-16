'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.Measurement
 * @description
 * # Measurement
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Measurement', function ($global, $resource) {

    // URL of specific API resource
    var url=global.api_url()+'/measurements/:id';

    return $resource( url,
          { id: '@_id' },                                                         
          { query:{method:'GET',isArray:false}},  
          { update: {method: 'PUT' }}
          );  
  });
