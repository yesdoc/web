'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('SharedGraphsCtrl',
  function ($scope,
            $location,
            $routeParams,
            Auth,
            MeasurementType,
            ProfileMeasurements2,
            MySharedProfiles,
            Profile) {

    // Este controlador se puede consumir pasando el parametro type con el id
    // del tipo de medición,por ejemplo #/home?type=peso

    // variable que contiene los datos a mostrar por la grafica
    $scope.data = [];
    $scope.selectedTypeName = "Seleccione un usuario";
    $scope.show_measurements = false;

    Auth.isLogged(function () {

      $scope.profile_id = $routeParams.id;

      MySharedProfiles.query(function (response) {
        $scope.profiles = response.resource;
      });

      $scope.load = function (profile_id) {
        get_measurements(profile_id);
      };

      function get_measurements(profile_id) {

        Profile.query({id: profile_id}, function (response) {
          $scope.selected = response.resource;
        });

        var selectedTypeId = $location.search().type;

        /* La primera vez que se ejecuta el controlador, debe traer a partir
         * del id pasado por parametro un tipo de medición*/
        MeasurementType.query(function (response) {

          // mts : MeasurmentTypes
          $scope.mts = response.resource;

          if (selectedTypeId) {
            $.each($scope.mts, function (i, mt) {
              if (mt.id == selectedTypeId) {
                $scope.selectType(mt);
                return; //break;
              }
            });// .each
          } else {
            $scope.selectType($scope.mts[0]);
          }

        });// .measurementType.query

        // función auxiliar para convertir de string a date
        var parseDate = d3.time.format.iso.parse;

        $scope.selectType = function (selectedMeasurementType) {
          $scope.selectedTypeName = selectedMeasurementType.name;

          ProfileMeasurements2.get({id: profile_id, type: selectedMeasurementType.id}, function (response) {
            var d = response.resource;
            // Lista de valores de la gráfica
            var vList = [];
            var symbol = d[0].measurement_unit.symbol;

            $.each(d, function (i, m) {
              var fecha = +parseDate(m.datetime);
              var valor = m.value;

              // Se agrega el par { x:fecha, y:valor }
              vList.push({x: fecha, y: valor})
            }); // /.each

            $scope.data = [{
              "key": selectedMeasurementType.name + ' (' + symbol + ')',
              "bar": true,
              "values": vList
            }];


            // Creación del scope de mediciones que será
            // consumido en la vista por la tabla de
            // mediciones de un mis tipo.
            $scope.measurements = d;
            $scope.show_measurements = true;

          });// .profileMeasurements.get


          $(".nvtooltip").remove(); // Borra los tooltips que se quedan pegados

        };//.selectType
      }

      if ($scope.profile_id != 0) {
        get_measurements($scope.profile_id);
      }

    });
  });

