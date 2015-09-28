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
                        var dataProfile = Profile.get(
                            function(){
                                var profile=dataProfile.resource;
                                profile.gender=profile.gender.name;
                                $scope.profile=profile;
                            }); 
                        }
                    }
                );
