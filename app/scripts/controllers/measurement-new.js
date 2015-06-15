'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:MeasurementNewCtrl
 * @description
 * # MeasurementNewCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('MeasurementNewCtrl', function ($scope,Measurement,  MeasurementUnit,
              MeasurementType, MeasurementSource, $routeParams, $filter){
      var unit=MeasurementUnit.query(function(){
          $scope.unit=unit.resource;      
      });                                                                       
      var type=MeasurementType.query(function(){
          $scope.type=type.resource;
      });                                                                       
      var source=MeasurementSource.query(function(){                            
          $scope.source=source.resource;                           
      });
      $scope.measurement=new Measurement();
      $scope.measurement.profile_id='1';
      $scope.measurement.datetime=$filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
      $scope.addMeasurement=function(){
          $scope.measurement.$save(function(){
              alert("Saved");
          });
      };
  });
