'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.notifications
 * @description
 * # notifications
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Notifications', function (global,$resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/my/notifications/:id';

    return $resource( url,
        { id: '@_id' },
        { query: {method: 'GET', isArray: false },
          update: {url: global.getApiUrl()+'/notifications/:id',params:{id: '@id'}, method: 'PUT' }
        });  
  });
