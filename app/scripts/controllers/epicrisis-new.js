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
        AnalysisFile,
        Analysis,
        $routeParams, 
        $filter){

    $scope.mediciones = [];

    /* Estructura de un elemento de mediciones:
     *  var e = { 
     *    tipo:{id:'',nombre:''},
     *    valor:'',
     *    fecha:'',
     *    unidad:{id:'',nombre:''},
     *    source:{id:'',nombre:''}
     *    }
     *
     *    Example:
     
       var e = { 
         tipo:{id:'1',nombre:'Peso'},
         valor:'55',
         fecha: '2014/10/12 12:45:21'
         unidad:{id:'1',nombre:'Kg'},
         source:{id:'1',nombre:'Manual'}
         }
       $scope.mediciones.push(e);

    */
    $scope.adjuntos = [];

    /* Estructura de un elemento de adjuntos:
     *  var e = { 
     *    nombre: '',
     *    fecha :'',
     *    archivo:{tipo:'',nombre:''},
     *    }
     *
     *    Example:
    */ 

    $scope.epicrisis = new Analysis();

    $scope.epicrisis.datetime = new Date();


    var modalam = $modal({ 
      scope: $scope,
      templateUrl: "views/partials/epicrisis-addMeasurement.html", 
      contentTemplate: false, 
      html: true, 
      show: false });

    $scope.showModalam = function () {
          modalam.$promise.then(modalam.show);
          create_measurement(new Measurement());
    };

    var modalaa = $modal({ 
      scope: $scope,
      templateUrl: "views/partials/epicrisis-addAttachment.html", 
      contentTemplate: false, 
      html: true, 
      show: false });

    $scope.showModalaa = function () {
          modalaa.$promise.then(modalaa.show);
          create_analysisFile(new AnalysisFile());
    };


    
    /********************* Add Attachment ********************************/
    $scope.deleteAdjunto = function($index,a){
        $scope.adjuntos.splice($index, 1);
      }

    function create_analysisFile(a){

      $scope.msg= '';

      $scope.aFile=a;
      $scope.aFile.datetime = $scope.epicrisis.datetime;


      $scope.addAdjunto = function(){

       var e = { 
         nombre: $scope.aFile.name,
         fecha : $scope.aFile.datetime,
         archivo_tipo: $scope.aFile.real_name, //FIXME, recuperar el tipo de archivo
         archivo: $scope.aFile.file
         }

       $scope.adjuntos.push(e);

       $scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Bien hecho!</strong> Se cargó un archivo adjunto.</div>");
      }

      /*
       * PERSISTIR cada analysisFile
      $scope.submit = function() {
        AnalysisFile.save($scope.aFile, function(result) {
          if (result.status != 'OK')
            throw result.status;
        });
      }
      */

      /*
      $scope.submit = function() {
        Image.save($scope.newImage, function(result) {
          if (result.status != 'OK')
            throw result.status;

          $scope.images.push(result.data);
        });
      }
      */

    }
    



    /********************* Add Measurement ********************************/

    // Numero de medicion cargado en el formulario de mediciones
    $scope.deleteMedicion = function ($index, m) {
        $scope.mediciones.splice($index, 1);
    };

    function create_measurement(m){

      $scope.msg= '';

      $scope.measurement = m;

      $scope.measurement.profile_id = $cookies.get('profile_id');
      
      $scope.measurement.datetime = $scope.epicrisis.datetime;

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
      $scope.addMeasurement = function(){
          var type_id = $scope.measurement.measurement_type_id,
            unit_id = $scope.measurement.measurement_unit_id,
            source_id = $scope.measurement.measurement_source_id;


          var type_name = MeasurementType.get({'id':type_id},function(){
            type_name = type_name.resource.name;
            var unit_name = MeasurementUnit.get({'id':unit_id},function(){

              unit_name = unit_name.resource.symbol;

              var e = { 
                tipo : {id : type_id , nombre : type_name},
                valor: $scope.measurement.value,
                unidad: {id : unit_id , nombre : unit_name},
                source: {id: source_id ,nombre: 'Manual'}
                }

              $scope.mediciones.push(e);
              $scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Bien hecho!</strong> Se cargó una medición.</div>");
            });
          });
        }
    }
  });
