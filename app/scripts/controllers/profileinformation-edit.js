'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileinformationEditCtrl
 * @description
 * # ProfileinformationEditCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller(
    'ProfileInformationEditCtrl',
    function (
      $scope,
      $location,
      Auth,
      $cookies,
      MyProfile,
      MyUser,
      Gender) {

      Auth.isLogged();
      MyUser.get({},function(response){
        var user = response.resource;
        $scope.user = user;

        var p = MyProfile.get(
            function(){
              var profile = p.resource;
              profile.gender_id=profile.gender.id;
              $scope.profile=profile;
              var genders_data = Gender.query(function(){
                $scope.genders = genders_data.resource;
              });
            }); 
      });
      // Función que guarda los cambios del perfil en el recurso profile.
      $scope.updateProfile = function(){
        MyProfile.update($scope.profile,function(response,status){
            $scope.user.profile_id = response.resource.id;
            MyUser.update($scope.user,function(response,status){
                $location.path('/myProfileInformation');
              });
          });
        }; // /.$scope.updateProfile()
    }
);
