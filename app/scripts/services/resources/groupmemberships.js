'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.user
 * @description
 * # user
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('GroupMembers', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/group_memberships/:id';

    return $resource(
      url,
      {id: '@_id'},
      { 
        query: {method: 'GET', isArray: false },
        update: { method: 'PUT' }
      }
    );
  });
