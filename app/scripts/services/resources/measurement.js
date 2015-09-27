'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.Measurement
 * @description
 * # Measurement
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Measurement', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/my/measurements';

    return $resource( url,
          { id: '@_id' },                                                         
          { update: {method: 'PUT' },
            query:{method:'GET',isArray:false}
          });  
  });
