'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.user
 * @description
 * # user
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('User', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/users/:id';

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
