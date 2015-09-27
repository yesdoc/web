'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.profile
 * @description
 * # profile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Profile', function (global, $resource) {

    // URL of specific API resource FIXME no es measurements es profile!
    var url = global.getApiUrl() + '/my/measurements';

    return $resource( 
        url,{ 
            id: '@_id'
            },{
            update: {
                method: 'PUT' 
                },
            query: {
                method: 'GET',
                isArray: false
                }
            }
        );  
    });
