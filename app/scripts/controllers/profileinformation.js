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
.controller(
        'ProfileInformationCtrl',
        function(
            $scope,
            $cookies,
            Profile,
            $location) {       

                if(!$cookies.get('Token')){
                    
                    $location.path('/login');
                    }else{
                        var profile_id=$cookies.get('profile_id');
                        var dataProfile = Profile.get({id: profile_id},function(){
                            var profile=dataProfile.resource;
                            profile.gender=profile.gender.name;
                            $scope.profile=profile;
                        }); 
                    }
                }
            );
