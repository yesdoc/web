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

    // URL of specific API resource
    var url = global.getApiUrl() + '/profiles/:id/:element';

    return $resource(url,
            { id: '@_id' , element: '@element' },
            {
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
