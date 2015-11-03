'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.user
 * @description
 * # user
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Permissions', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/permissions/:id';

    return $resource(
      url,
      {id: '@_id'},
      {
        query: {method: 'GET',isArray: false}
      }
    );
  });
