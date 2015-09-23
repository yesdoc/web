'use strict';

/**
  @ngdoc function
 * @name saludWebApp.controller:ProfileinformationNewCtrl
 * @description
 * # ProfileinformationNewCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileInformationNewCtrl', function ($scope,Profile,
              Users,Gender,$routeParams,$window) {

        // Crea el perfil que se utilizará en la vista para persistir los
        // atributos a partir del ng-model
        $scope.profile = new Profile();
        $scope.profile.gender_id = 1;

        var genders_data = Gender.query(function(){
            $scope.genders = genders_data.resource;
        });
    
        $scope.addProfile = function(){
            $scope.profile.$save(function(){
                $scope.user = new Users();
                $scope.user.profile_id = 1;
                $scope.user.username = "robin";
                $scope.user.email = 'batman@no.com';
                $scope.user.password = 'batman';

                alert("holaaaaaaaaaa");
                $scope.user.$save(function(){
                    alert("Saved");
                    $window.location = '/#/myProfileInformation'
                });

            });
        };

  });
