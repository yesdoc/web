'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.user
 * @description
 * # user
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('ProfileMeasurements2', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/profiles/:id/measurements';

    return $resource(
      url,
      {id: '@_id'},
      {
        query: {method: 'GET', isArray: false }
      }
    );
  });
