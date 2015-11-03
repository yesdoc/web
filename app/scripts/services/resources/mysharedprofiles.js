'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.profile
 * @description
 * # profile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MySharedProfiles', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/my/shared_analysis_profiles';

    return $resource( url,
        {},
        { update: { method: 'PUT' },
          query: {method: 'GET', isArray: false }
        });  
  });
