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
              $('input').attr('disabled', true);
              $('select').attr('disabled', true);

              // Guardo el perfil y solicitó el id para guardarlo en el usuario.
              Profile.save($scope.profile,function(response){
                  $scope.user.profile_id = response.resource.id;

                  // Guardo el usuario
                  User.save($scope.user,function(response){
                      $window.location = '#/login';
                    },function(error){
                      onFail(error);
                    });

                },function(error){
                    onFail(error);
                }); // .$scope.profile.$save

          };// /.$scope.addProfile
    });

          function onFail(response){
              response = response.data;
              $('input').attr('disabled', false);
              $('select').attr('disabled', false);
              for(var k in response.message){
                var selector = '#' + k + '_msg';
                $(selector).text(response.message[k]);
              };
          }
