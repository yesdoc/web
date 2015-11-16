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
      MyProfile, 
      Auth,
      $location, 
      global){
            
      // No redirecciona en caso de que no este logueado(evita un ciclo infinito),
      // y redirecciona en caso de que el usuario SI este logueado
      Auth.isLogged(false, function(){
        $location.path('/profileMeasurements');
      });

      // Función que es llamada desde la vista
      $scope.login=function(){
        $('#submit').val('Cargando...').prop('disabled', true);
          
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

            $('#submit').val('Ingresar').prop('disabled', false);

            if(response.status === 401) {
              $scope.message='Usuario o contraseña invalida';
            }else{
              $scope.message='Lo sentimos, existe un problema con la conexión al servidor.';
            }

          }); // /.MyProfile.get

        }; // /.login()

      });
