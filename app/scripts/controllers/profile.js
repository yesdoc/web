'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the saludWebApp
 */

angular.module('saludWebApp')
   .controller('ProfileCtrl', function($scope,Profile) {       
        $scope.data  = Profile.query(); 
});
