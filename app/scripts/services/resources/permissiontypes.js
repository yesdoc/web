'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.user
 * @description
 * # user
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('PermissionTypes', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/permission_types/:id';

    return $resource(
      url,
      {id: '@_id'},
      {
        query: {method: 'GET',isArray: false}
      }
    );
  });
