'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller('HomeCtrl',
    function (
      $scope,
      $location, 
      Auth,
      MeasurementType,
      ProfileMeasurements,
      $compile,
      $rootScope) {

      // Este controlador se puede consumir pasando el parametro type con el id
      // del tipo de medición,por ejemplo #/home?type=peso
        
        // variable que contiene los datos a mostrar por la grafica
        $scope.data=[];

        Auth.isLogged(function(){

          // función auxiliar para convertir de string a date
          var parseDate = d3.time.format.iso.parse;

          $scope.selectType = function(selectedMeasurementType){
                  $scope.selectedTypeName = selectedMeasurementType.name;

                  ProfileMeasurements.get({type: selectedMeasurementType.id},function(response){
                          var d = response.resource;
                          // Lista de valores de la gráfica
                          var vList=[];
                          var symbol=d[0].measurement_unit.symbol;

                          $.each(d,function(i,m){
                              var fecha = +parseDate(m.datetime)
                              var valor = m.value

                              // Se agrega el par { x:fecha, y:valor }
                              vList.push({ x : fecha, y : valor})
                              }); // /.each

                          $scope.data = [{
                              "key" : selectedMeasurementType.name + ' ('+symbol+')' ,
                              "bar": true,
                              "values" : vList 
                              }];
                                
                          
                          // Creación del scope de mediciones que será
                          // consumido en la vista por la tabla de
                          // mediciones de un mis tipo.
                          var measurements = d;
                          $scope.measurements=measurements;
                          
                          });// .profileMeasurements.get


          $(".nvtooltip").remove(); // Borra los tooltips que se quedan pegados

          }//.selectType




          var selectedTypeId = $location.search().type;

          /* La primera vez que se ejecuta el controlador, debe traer a partir
           * del id pasado por parametro un tipo de medición*/
          MeasurementType.query( function(response){

              // mts : MeasurmentTypes
              $scope.mts = response.resource;

              if (selectedTypeId){
                $.each($scope.mts,function (i,mt){
                    if (mt.id == selectedTypeId){
                        $scope.selectType(mt);
                        return; //break;
                        }
                    });// .each
              }else{
                  $scope.selectType($scope.mts[0]);
              }

              });// .measurementType.query

    }); 
  }); 

