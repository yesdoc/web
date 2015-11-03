'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.myprofile
 * @description
 * # myprofile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MyGroupMemberships', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/my/group_memberships/:id';

    return $resource( 
        url,{ 
            id: '@_id'
            },{
            query: {
                method: 'GET',
                isArray: false
                }
            }
        );  
    });
