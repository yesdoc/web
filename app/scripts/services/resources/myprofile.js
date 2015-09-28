'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.myprofile
 * @description
 * # myprofile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MyProfile', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/my/profile';

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
