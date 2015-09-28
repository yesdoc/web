'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.MyMeasurement
 * @description
 * # MyMeasurement
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MyMeasurement', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/my/measurements';

    return $resource( url,
          { id: '@_id' },                                                         
          { update: {method: 'PUT' },
            query:{method:'GET',isArray:false}
          });  
  });
