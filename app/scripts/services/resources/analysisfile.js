'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.profile
 * @description
 * # profile
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('AnalysisFile', function (global, $resource) {

    // URL of specific API resource
    var url=global.getApiUrl()+'/analysisFile/:id';

    return $resource( url,
        { id: '@_id' },
        { update: { method: 'PUT' },
          query: {method: 'GET', isArray: false },
          save: {
            method: 'POST', 
            transformRequest: 
              function(data, headersGetter) { 
                if (data === undefined) return data;
                var fd = new FormData();
                angular.forEach(data, function(value, key) { 
                  if (value instanceof FileList) { 
                    if (value.length == 1) { 
                      fd.append(key, value[0]);
                    } else {
                      angular.forEach(value, function(file, index) {
                        fd.append(key + '_' + index, file);
                      });
                    }
                  } else {
                    if (value !== null && typeof value === 'object'){
                      fd.append(key, JSON.stringify(value)); 
                    } else {
                      fd.append(key, value);
                    }
                  }
                });
                return fd;}, 
            headers: {'Content-Type': undefined}
            }
        });  
  });
