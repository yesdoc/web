'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.gender
 * @description
 * # gender
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Gender', function (global,$resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/genders/:id';

    return $resource( url,
        { id: '@_id' },
        { query: {method: 'GET', isArray: false },
          update: { method: 'PUT' }
        });  
  });
