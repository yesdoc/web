'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:MeasurementEditCtrl
 * @description
 * # MeasurementEditCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller(
    'MeasurementEditCtrl',
    function (
      $scope,
      $cookies, 
      Auth,
      Measurement, 
      MeasurementUnit,
      MeasurementType,
      $location, 
      MeasurementTypeUnit, 
      MeasurementSource, 
      $routeParams) {

        Auth.isLogged(function(){

        //Consulta y asignación de tipo de medición.
        var type = MeasurementType.query(function(){
            $scope.type = type.resource;
            });

        //Consulta y asignación de fuente de medición.
        var source = MeasurementSource.query(function(){
            $scope.source = source.resource;
            });


        //Creación de measurement con todos sus atributosque luego será consumida por la vista.
        var m = Measurement.get( 
                {id : $routeParams.id}, // id  de la medición
                function(){
                    var measurement = m.resource;
                    measurement.measurement_type_id = measurement.measurement_type.id;
                    measurement.measurement_unit_id = measurement.measurement_unit.id;
                    measurement.measurement_source_id = measurement.measurement_source.id;
                    measurement.profile_id = measurement.profile.id;
                    $scope.measurement = measurement;
                    $scope.getUnit();
                    }
                );


        //Función que permite guardar los datos de las mediciones,
        // y si todo es correcto redirecciona al perfil de mediciones.
        $scope.updateMeasurement = function(){
            Measurement.update( 
                    {"id" : m.resource.id}, // id de la medición
                    $scope.measurement,
                    function(){
                        $location.path('/measurements');
                        });
                }; // /.scope.updateMeasurement()


        //Carga el select de la unidad de medición a partir del tipo de medición seleccionado.
        $scope.getUnit = function() {
            var unit = MeasurementTypeUnit.get(
                    {"id_type" : $scope.measurement.measurement_type_id},
                    function(){
                        $scope.unit = unit.resource;      
                        }); 
            }; // /.getUnit()

        });
  });
