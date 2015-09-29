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
            $cookies,
            Measurement,
            MeasurementUnit,
            MeasurementType,
            MeasurementTypeUnit,
            $location,
            MeasurementSource, 
            $routeParams, 
            $filter){
  

            if(!$cookies.get('Token')){
                $location.path('/login');
                }
        
            $scope.measurement = new Measurement();

            // FIXME Necesito recuperar de alguna manera el profile_id, porque
            // ya que el recurso de las mediciones me pide que se lo envie.
            $scope.measurement.profile_id = $cookies.get('profile_id');
            
            $scope.measurement.datetime = new Date();

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
        
            //Función que permite guardar los datos y si todo es correcto redirecciona al perfil de mediciones 
            $scope.addMeasurement = function(){
                $scope.measurement.$save(
                        function(){
                            $location.path('/profileMeasurements');
                        });
                    }; 

            }
        );
