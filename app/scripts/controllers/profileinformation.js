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

        //$scope.data  = Profile.get({id: $routeParams.id}); 
        var data = Profile.query(function(){
            var profile=data[0].profile;
            var genders= data[0].genders;
            for(var g in genders){
                if(profile.gender==genders[g].id){
                    profile.gender=genders[g].name;
                    break;
                }
            }
            $scope.profile=profile;
            
        }); 

});
