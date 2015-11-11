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
        
        // Seteamos los datos para el slider, porqué sinó no responde.
        $scope.selected_unit={};
        $scope.selected_unit.disabled=true;
        $scope.selected_unit.value=0;
        $scope.selected_unit.min=0;
        $scope.selected_unit.max=100;

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
                      $scope.updateSelectedUnitValue();
                  });                                                                       
            };

        $scope.updateMeasurementValue = function(){
          $scope.measurement.value = $scope.selected_unit.value;
        }

        $scope.updateSelectedUnitValue = function(){

          if (isNaN($scope.measurement.value)){
            if (!$scope.measurement.value) {
              return;
            }

            $scope.measurement.value = String($scope.selected_unit.value).split('.')[0]
            if (isNaN($scope.measurement.value)){
              $scope.selected_unit.value = 0;
            }
            return;
          }
          if($scope.measurement.value > $scope.selected_unit.max){
            $scope.selected_unit.value = $scope.selected_unit.max;
            return;
          }
          if($scope.measurement.value < $scope.selected_unit.min){
            $scope.selected_unit.value = $scope.selected_unit.min;
            return;
          }
          $scope.selected_unit.value = $scope.measurement.value;
        }

        $scope.getValidation = function(){
          $.each($scope.unit,function(i,u){
            if (u.id == $scope.measurement.measurement_unit_id){
              $scope.selected_unit.min = u.min_value;
              $scope.selected_unit.max = u.max_value;
              $scope.selected_unit.disabled=false;
            }
            });
          }
    
        /**************** Objeto Measurement ***************/

        $scope.measurement = new MyMeasurements();

        $scope.measurement.value = 0; 

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
