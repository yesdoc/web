'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.global
 * @description
 * # global
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('global', function () {
    // Service logic

    // URL of yesdoc API
    var _api_url='https://yesdoc-api.herokuapp.com'

    // Public methods
    return {
      getApiUrl: function () {
        return _api_url;
      }
    };
  });
