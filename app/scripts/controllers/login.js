'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller(
    'LoginCtrl', 
    function (
      $scope,
      $window,
      $cookies,
      MyProfile, 
      Auth, 
      global){

      Auth.isLogged();

      // Función que es llamada desde la vista
      $scope.login=function(){
          
        // Se utiliza el método login() del servicio Authorization que 
        //  genera el Token a partir del usuario y la contraseña y luego 
        //  lo almacena en la cookie.
        Auth.login( $scope.username, $scope.password );

        // Solicita la información del perfil 
        MyProfile.get(
          function(){
            $window.location='/#/myProfileInformation'
          },
          function(response) {
            if(response.status === 401) {
              $scope.message='Usuario o contraseña invalida';
            }else{
              $scope.message='Lo sentimos, existe un problema con la conexión al servidor.';
            }
          }); // /.MyProfile.get

        }; // /.login()

      });
