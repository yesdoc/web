'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.myprofile
 * @description
 * # myprofile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MyGroups', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/my/groups';

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
