'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.profile
 * @description
 * # profile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('AnalysisPermissions', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/analysis/:analysis_id/permissions';

    return $resource( url,
        { analysis_id: '@_id'},
        { update: { method: 'PUT' },
          save: {method:'POST',params:{analysis_id:0}},
          query: {method: 'GET', isArray: false }
        });  
  });
