'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:MeasurementNewCtrl
 * @description
 * # MeasurementNewCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('MeasurementNewCtrl', function ($scope, $cookies, Measurement,  MeasurementUnit,
              MeasurementType,$location , MeasurementSource, $routeParams, $filter){
      if(!$cookies.get('profile_id')){
            $location.path('/login');
      }
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
      $scope.measurement.profile_id=$cookies.get('profile_id');
      $scope.measurement.datetime=new Date();
      $scope.addMeasurement=function(){
          $scope.measurement.$save(function(){
              $location.path('/profileMeasurements');
          });
      };
  });
