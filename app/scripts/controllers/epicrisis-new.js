'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:EpicrisisCtrl
 * @description
 * # EpicrisisCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('EpicrisisNewCtrl', function (
        $scope,
        $modal, 
        $cookies, 
        Measurement,  
        MeasurementUnit,
        MeasurementType,
        MeasurementTypeUnit, 
        $sce,
        $location , 
        MeasurementSource, 
        $routeParams, 
        $filter){

    $scope.mediciones = [];

    /* Estructura de un elemento de mediciones:
     *  var e = { 
     *    numero: x,
     *    tipo:{id:'',nombre:''},
     *    valor:'',
     *    unidad:{id:'',nombre:''}
     *    }
     *
     *    Example:
     
       var e = { 
         numero: 7,
         tipo:{id:'1',nombre:'Peso'},
         valor:'55',
         unidad:{id:'1',nombre:'Kg'}
         }
       $scope.mediciones.push(e);

    */
    $scope.adjuntos = [];


    var addMeasurement = $modal({ 
      scope: $scope,
      templateUrl: "views/partials/epicrisis-addMeasurement.html", 
      contentTemplate: false, 
      html: true, 
      show: false });

    $scope.showModal = function () {
          addMeasurement.$promise.then(addMeasurement.show);
          create_measurement();
    };


    /********************* Add Measurement ********************************/

    function create_measurement(){
      $scope.measurement = new Measurement();
      $scope.measurement.profile_id = $cookies.get('profile_id');
      
      $scope.measurement.datetime = new Date();

      //Consulta y asignación de tipo de medición.
      var type = MeasurementType.query(function(){
        $scope.type = type.resource;
        });                                                                 


      //Consulta y asignación de fuente de medición.
      var source = MeasurementSource.query(function(){                            
        $scope.source = source.resource;                           
        });

      //Carga el select de la unidad de medicion a partir del tipo de medición seleccionado.
      $scope.getUnit = function(){
        var unit = MeasurementTypeUnit.get( {"id_type" : $scope.measurement.measurement_type_id}, function(){
          $scope.unit = unit.resource;      
          });                                                                       
        };
      
      //Función que permite guardar los datos y si todo es correcto muestra mensaje de "bien hecho" 
      var numero = 0;
      $scope.addMeasurement = function(){
          numero += 1;
          var type_id = $scope.measurement.measurement_type_id;
          var unit_id = $scope.measurement.measurement_unit_id;

          var type_name = MeasurementType.get({'id':type_id},function(){
            type_name = type_name.resource.name;
            var unit_name = MeasurementUnit.get({'id':unit_id},function(){

              unit_name = unit_name.resource.symbol;

              var e = { 
                numero : numero,
                tipo : {id : type_id , nombre : type_name},
                valor: $scope.measurement.value,
                unidad: {id : unit_id , nombre : unit_name}
                }

              $scope.mediciones.push(e);
              $scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Bien hecho!</strong> Se cargó una medición.</div>");
            });
          });
        }
    }
  });
