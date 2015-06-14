'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the saludWebApp
 */

// Route: /profileInformation/:id


angular.module('saludWebApp')
   .controller('ProfileInformationCtrl', function($scope,Profile,$routeParams) {       

        var data = Profile.get({id: $routeParams.id},function(){
            var profile=data.resource;
            profile.gender=profile.gender.name;
            $scope.profile=profile;
        }); 

});
