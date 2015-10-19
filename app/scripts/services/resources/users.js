'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.users
 * @description
 * # users
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('User', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/my/user';

    return $resource( url,
        {},
        { update: { method: 'PUT' }}
    );  
  });
