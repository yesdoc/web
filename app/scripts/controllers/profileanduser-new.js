'use strict';

/**
  @ngdoc function
 * @name saludWebApp.controller:ProfileAndUserNewCtrl
 * @description
 * # ProfileAndUserNewCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller(
    'ProfileAndUserNewCtrl',
    function (
      $scope,
      Auth,
      $window,
      Profile,
      User,
      Gender){
          // No redireccionar en caso de que el user no este logueado
          Auth.isLogged(false,function(){
            $location.path('/profileMeasurements');
          });

          // Crea el perfil y el usuario que se utilizará en la vista para persistir los
          // atributos a partir de ng-model.
          $scope.profile = new Profile();
          $scope.user = new User();

          // Traigo de la API los tipos de géneros existente.
          var genders_data = Gender.query(
            function(){
                $scope.genders = genders_data.resource;
            });

          $scope.addProfile = function(){
              // Guardo el perfil y solicitó el id para guardarlo en el usuario.
              $scope.profile.$save(
                  function(profile_data){
                      $scope.user.profile_id = profile_data.resource.id;
                      // Guardo el usuario
                      $scope.user.$save(function(){
                          alert("Saved");
                          $window.location = '#/login';
                          });
                      }); // /.$scope.profile.$save

              };// /.$scope.addProfile
          });
