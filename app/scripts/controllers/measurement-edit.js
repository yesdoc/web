'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:MeasurementEditCtrl
 * @description
 * # MeasurementEditCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('MeasurementEditCtrl', function ($scope, Measurement,  MeasurementUnit,
              MeasurementType,$window, MeasurementSource, $routeParams) {
      var unit=MeasurementUnit.query(function(){
          $scope.unit=unit.resource;
      });
      var type=MeasurementType.query(function(){
          $scope.type=type.resource;
      });
      var source=MeasurementSource.query(function(){
          $scope.source=source.resource;
      });
      var m = Measurement.get({id:$routeParams.id},function(){
          var measurement=m.resource;
          measurement.measurement_type_id=measurement.measurement_type.id;
          measurement.measurement_unit_id=measurement.measurement_unit.id;
          measurement.measurement_source_id=measurement.measurement_source.id;
          measurement.profile_id="1";
          $scope.measurement=measurement;
      });
      $scope.updateMeasurement=function(){
          Measurement.update({"id":m.resource.id},$scope.measurement,function(){
              $window.location=('/#/measurements/'+m.resource.id);
          });
      };
  });
