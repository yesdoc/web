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

        // Crea el perfil y el usuario que se utilizará en la vista para persistir los
        // atributos a partir del ng-model
        $scope.profile = new Profile();
        $scope.user = new Users();
        $scope.profile.gender_id = 1;

        var genders_data = Gender.query(function(){
            $scope.genders = genders_data.resource;
        });
    
        $scope.addProfile = function(){
            $scope.profile.$save(function(profile_data){
        
                // Luego de guardar el perfil, debo traer su id
                alert(profile_data.resource.id);
                $scope.user.profile_id = profile_data.resource.id;
                $scope.user.username = 'cincuentaynueve';

                $scope.user.$save(function(){
                    alert("Saved");
                    $window.location = '/#/myProfileInformation'
                });

            });
        };

  });
