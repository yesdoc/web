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
    var url=global.getApiUrl()+'/analysis_files/:id';

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
                  /* Si es archivo */
                  if (value instanceof FileList) { 
                    /* Si es un solo archivo */
                    if (value.length == 1) { 
                      fd.append(key, value[0]);
                    /* Si es mas de un archivo */
                    } else {
                      angular.forEach(value, function(file, index) {
                        fd.append(key + '_' + index, file);
                      });
                    }
                  /* Si no es archivo, se convierte a string y se manda la
                   * clave:valor */
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
