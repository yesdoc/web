'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:MeasurementNewCtrl
 * @description
 * # MeasurementNewCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller('MeasurementNewCtrl', 
    function (
      $scope,
      Auth,
      MyProfile,
      MyMeasurements,
      MyAnalyses,
      MeasurementUnit,
      MeasurementType,
      MeasurementTypeUnit,
      $location,
      MeasurementSource, 
      $routeParams, 
      $filter){

        // Validamos si el usuario está Logueado
        Auth.isLogged(function(){

        /**************** Datos a mostrar en el formulario ***************/

        //Consulta y asignación de tipo de medición.
        var type = MeasurementType.query(
            function(){
                $scope.type = type.resource;
            });                                                                       

        //Consulta y asignación de fuente de medición.
        var source = MeasurementSource.query(
            function(){                            
                $scope.source = source.resource;                           
            });

        //Carga el select de la unidad de medicion a partir del tipo de medición seleccionado.
        $scope.getUnit = function(){
            var unit = MeasurementTypeUnit.get( 
                  {"id_type" : $scope.measurement.measurement_type_id},
                  function(){
                      $scope.unit = unit.resource;      
                  });                                                                       
            };
    
        /**************** Objeto Measurement ***************/

        $scope.measurement = new MyMeasurements();

        $scope.measurement.datetime = new Date();

        //Función que permite guardar los datos y si todo es correcto redirecciona al perfil de mediciones 
        $scope.addMeasurement = function(){
            MyProfile.get(function(resource){
                var pid = resource.resource.id;
                $scope.measurement.profile_id = pid;
                $scope.measurement.$save(function(){
                    $location.path('/profileMeasurements');
                    });
                }); 
            }; 
        });
    });
