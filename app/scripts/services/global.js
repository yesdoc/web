'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.global
 * @description
 * # global
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('global', function ($location) {
    // Service logic

    // URL of yesdoc API
    var apiUrl='yesdoc-api.herokuapp.com';
    function getApiUrl(auth){
      return 'https://'+auth+apiUrl;
    }
    
    function redirect(notification){

      switch(notification.detail_object_type){
        case 'analysis':
          $location.path('/analyses/'+notification.detail_object_id);
          break;
        case 'group':
          $location.path('/myProfileInformation');
          break;
        default:
          break;
      }
    }

    // Public methods
    return {
      getApiUrl: function () {
        return getApiUrl('');
      },
      getApiUrlAuth: function(auth){
        return getApiUrl(auth);
      },
      notificationRedirect: function(notification){
        return redirect(notification);
      }
    };
  });
