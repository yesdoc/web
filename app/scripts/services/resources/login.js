'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.login
 * @description
 * # login
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Login', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/token';

    return $resource( 
        url,
        { 
            id: '@_id'
        }, 
        {
            query: {
                method: 'GET',
                isArray: false
            }
        });  
  });
