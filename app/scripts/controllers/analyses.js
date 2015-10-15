'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:EpicrisisCtrl
 * @description
 * # EpicrisisCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('AnalysesCtrl', function (
      $scope,
      $modal, 
      $sce,
      $location , 
      Auth,
      Measurement,  
      MeasurementUnit,
      MeasurementType,
      MeasurementTypeUnit, 
      MeasurementSource, 
      MyProfile,
      AnalysisFile,
      Analysis,
      $filter){

    Auth.isLogged();

  });
