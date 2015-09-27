'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the saludWebApp
 */

angular.module('saludWebApp')
.controller(
        'UserCtrl', 
        function(
            $scope,
            $cookies,
            Profile,
            Users,
            $location) {       

                if(!$cookies.get('Token')){
                    $location.path('/login');
                    }else{
                        var profile_id = $cookies.get('profile_id');
                        var user_data = Users.get({id:profile_id},function(){
                            var user = user_data.resource;
                            $scope.user = user;
                        });
                    }
                }
            );
