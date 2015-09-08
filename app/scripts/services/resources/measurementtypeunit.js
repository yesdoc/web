'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.measurementtypeunit
 * @description
 * # measurementtypeunit
 * Service in the saludWebApp.
 */
angular.module('saludWebApp')
.factory('MeasurementTypeUnit', function (global, $resource) {
    // URL of specific API resource
    var url=global.getApiUrl()+'/measurement_types/:id_type/units';

    return $resource( url,       
        { id_type: '@_id_type' },                                                        
        { query:{method:'GET',isArray:false},
          update: {method: 'PUT'}
        });  
});
