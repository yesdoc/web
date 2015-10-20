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
    var api_url='yesdoc-api.herokuapp.com';
    function _api_url(auth=''){
      return 'https://'+auth+api_url;
    }
    // Public methods
    return {
      getApiUrl: function (auth='') {
        return _api_url(auth);
      }
    };
  });
