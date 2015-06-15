 'use strict';
 
 /**
  * @ngdoc service
  * @name saludWebApp.ProfileMeasurements
  * @description
  * # ProfileMeasurements
  * Service in the saludWebApp
  */
 angular.module('saludWebApp')
   .factory('ProfileMeasurements',function($resource) {
     return $resource('https://yesdoc-api.herokuapp.com/profiles/:id/measurements/latest',
        { id: '@_id' },
        {query:{method:'GET',isArray:false},
        }); 
   });

