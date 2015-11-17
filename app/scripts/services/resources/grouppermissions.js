'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.Measurement
 * @description
 * # Measurement
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('GroupPermissions', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/group_permissions/:id';

    return $resource( url,
          { id: '@_id' },                                                         
          { update: {method: 'PUT' },
            query:{method:'GET',isArray:false}
          });  
  });
