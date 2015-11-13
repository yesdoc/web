'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.myprofile
 * @description
 * # myprofile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MyGravatar', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/my/gravatar';

    return $resource( 
        url,
        {},
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
        );  
    });
