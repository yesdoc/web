'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.GroupsMembers
 * @description
 * # GroupsMembers
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('GroupsMembers', function (global, $resource) {

    // URL of specific API resource
    var url = global.getApiUrl() + '/groups/:group_id/members';

    return $resource(
      url,
      {},
      { 
        query: {method: 'GET',params:{group_id:0}, isArray: false },
        save: {method:'POST',params:{group_id:0}}
      }
    );
  });
