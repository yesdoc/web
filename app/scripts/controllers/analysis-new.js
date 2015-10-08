'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:EpicrisisCtrl
 * @description
 * # EpicrisisCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('AnalysisNewCtrl', function (
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


    $scope.analysis = new Analysis();

    $scope.analysis.datetime = new Date();


    /****** Modal Analysis Measurement ******/
    var modalam = $modal({ 
      scope: $scope,
      templateUrl: "views/partials/analysis-addMeasurement.html", 
      contentTemplate: false, 
      html: true, 
      show: false });

    $scope.showModalam = function () {
          modalam.$promise.then(modalam.show);
          create_measurement(new Measurement());
    };


    /****** Modal Analysis Attachment *********/
    var modalaa = $modal({ 
      scope: $scope,
      templateUrl: "views/partials/analysis-addAttachment.html", 
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

    /* Lista de elementos adjuntos a persistir. */
    $scope.adjuntos = [];

    /* Estructura de un elemento de adjuntos:
     *  var e = { 
     *    nombre: '',
     *    fecha :'',
     *    archivo:{tipo:'',nombre:''},
     *    }
     *
    */ 

    /***** Crea el archivo de análisis ******/
    function create_analysisFile(a){

      $scope.msg = '';

      $scope.aFile = a;
      $scope.aFile.datetime = $scope.analysis.datetime;

      /* Verifica si <fileName> tiene alguna de las extensiones, que se
       * encuentran en la lista <exts> pasada por argumento.  */
      function hasExtension( fileName, exts) {
          return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
      }

      /* Agrega un archivo adjunto a la lista de adjuntos. */
      $scope.addAdjunto = function(){
        $scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Cargando...</strong></div>");

        var fname = $scope.aFile.real_name;
        var type = 'file-o';

        /* Es imagen? */
        if(hasExtension(fname,['png','bmp','jpg','jpeg','gif'])){
          type='file-image-o';
        }

        /* Es documento? */
        if(hasExtension(fname,['doc','docx','odt','txt'])){
          type='file-text-o';
        }

        /* Es video? */
        if(hasExtension(fname,['avi','mp4','mpeg'])){
          type='file-video-o';
        }

        /* Es sonido? */
        if(hasExtension(fname,['mp3','ogg'])){
          type='file-text-o';
        }

        /* Es pdf? */
        if(hasExtension(fname,['pdf'])){
          type='file-pdf-o';
        }

        /* Es archivo comprimido? */
        if(hasExtension(fname,['rar','zip','gz'])){
          type='file-archive-o';
        }

        var e = { 
          nombre : $scope.aFile.description,
          fecha : $scope.aFile.datetime,
          archivo_tipo : type,
          archivo : $scope.aFile.file
          }

        $scope.adjuntos.push(e);

        modalaa.$promise.then(modalaa.hide());
      }


    }
    



    /********************* Add Measurement ********************************/

    // Numero de medicion cargado en el formulario de mediciones
    $scope.deleteMedicion = function ($index, m) {
        $scope.mediciones.splice($index, 1);
    };

    /* Verifica si <fileName> tiene alguna de las extensiones, que se
     * encuentran en la lista <exts> pasada por argumento.  */
    $scope.mediciones = [];

    /* Estructura de un elemento de mediciones:
     *  var e = { 
     *    tipo:{id:'',nombre:''},
     *    value:'',
     *    fecha:'',
     *    unidad:{id:'',nombre:''},
     *    source:{id:'',nombre:''}
     *    }
     *
    */

    function create_measurement(m){

      $scope.msg= '';

      $scope.measurement = m;

      $scope.measurement.datetime = $scope.analysis.datetime;

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
          $scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Cargando...</strong>.</div>");
          var type_id = $scope.measurement.measurement_type_id,
            unit_id = $scope.measurement.measurement_unit_id,
            source_id = $scope.measurement.measurement_source_id;


          var type_name = MeasurementType.get({'id':type_id},function(){
            type_name = type_name.resource.name;
            var unit_name = MeasurementUnit.get({'id':unit_id},function(){

              unit_name = unit_name.resource.symbol;

              var e = new Measurement();
              e.tipo = {id : type_id , nombre : type_name};
              e.unidad= {id : unit_id , nombre : unit_name};
              e.source= {id: source_id ,nombre: 'Manual'};
              e.value= $scope.measurement.value;
              e.measurement_source_id = source_id;
              e.measurement_type_id = type_id;
              e.measurement_unit_id = unit_id;
              e.datetime = $scope.measurement.datetime;

              $scope.mediciones.push(e);
              $scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Bien hecho!</strong> Se cargó una medición.</div>");
            });
          });
        }
    }

    var modalSpinner = $modal({ 
      scope: $scope,
      template: "", 
      contentTemplate: false, 
      html: true, 
      show: false });

    var showModalSpinner = function () {
          modalaa.$promise.then(modalSpinner.show);
          }

    $scope.addAnalysis = function(){
        var pid = MyProfile.get(function(response){
            $scope.analysis.profile_id = pid.resource.id;

            $scope.analysis.$save(function(result){
                var analysis_id = result.resource.id;
                $.each( $scope.mediciones , function( i , m ){
                    /*
                    delete m.tipo;
                    delete m.unidad;
                    delete m.source;
                    */
                    m.profile_id = pid.resource.id;
                    m.analysis_id = analysis_id;
                    m.$save(function(){
                      console.log('bien!');
                      });
                    });  

              $.each($scope.adjuntos , function( i , a ){
                $scope.aFile.analysis_id = analysis_id;
                AnalysisFile.save($scope.aFile, function(result) {
                  if (result.status != 'OK')
                    throw result.status;
                    console.log('sé persistió el archivo');
                  });

                });

                $location.path('/#/myProfileInformation');

              });

            });

      }
  });
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
