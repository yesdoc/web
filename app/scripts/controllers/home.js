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
      $rootScope,
      $routeParams) {

        
        // variable que contiene los datos a mostrar por la grafica
        $scope.data=[];

        Auth.isLogged(function(){

          // función auxiliar para convertir de string a date
          var parseDate = d3.time.format.iso.parse;

          $scope.selectType = function(selectedMeasurementType){

                  ProfileMeasurements.get({type: selectedMeasurementType.id},function(response){
                          var d = response.resource;
                          // Lista de valores de la gráfica
                          var vList=[];
                          console.log(d[0]);
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




          /* La primera vez que se ejecuta el controlador, debe traer a partir
           * del nombre pasado por parametro un tipo de medición*/
          MeasurementType.query( function(response){
              var selectedTypeName = $routeParams.type;

              // mts : MeasurmentTypes
              $scope.mts = response.resource;

              $.each($scope.mts,function (i,mt){
                  if (mt.name.toLowerCase() == selectedTypeName.toLowerCase()){
                      $scope.selectType(mt);
                      return; //break;
                      }
                  });// .each

              });// .measurementType.query

    }); 
  }); 

