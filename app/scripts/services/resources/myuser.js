'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.myuser
 * @description
 * # myuser
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('MyUser', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/my/user';

    return $resource( url,
      {},
      { update: { method: 'PUT' }}
    );
  });
