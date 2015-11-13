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
      fileReader,
      Measurement,  
      MeasurementUnit,
      MeasurementType,
      MeasurementTypeUnit, 
      MeasurementSource, 
      MyProfile,
      AnalysisFile,
      Analysis,
      $filter){
    
    //Se valida si el usuario está logueado
    Auth.isLogged(function(){


      $scope.analysis = new Analysis();

      $scope.analysis.datetime = new Date();

      /********************* Attachment ********************************/

      /* Analysis File Modal */
      var aFileModal = $modal({ 
        scope: $scope,
        templateUrl: "views/partials/analysis-addAttachment.html", 
        contentTemplate: false, 
        html: true, 
        show: false });
      
      /* Show Analysis File Modal */
      $scope.showAFileModal = function () {
            aFileModal.$promise.then(aFileModal.show);
            // It creates a new AnalysisFile object
            var af = new AnalysisFile();
            af.required = true;
            create_analysisFile(af);
      };

      /* Delete Analysis File object */
      $scope.deleteAdjunto = function($index,a){
          $scope.confirm = {};
          $scope.confirm.class = 'danger';
          $scope.confirm.message =
              'Esta seguro que desea eliminar el archivo adjunto <b>'
              +a.description+'</b> ?';

          $scope.confirm.confirm = function(){

              $scope.adjuntos.splice($index, 1);
              confirmDeleteModal.$promise.then(confirmDeleteModal.hide);

          }

          var confirmDeleteModal = $modal({ 
            scope: $scope,
            templateUrl: "views/partials/confirm.html", 
            contentTemplate: false, 
            html: true, 
            show: false });

          confirmDeleteModal.$promise.then(confirmDeleteModal.show);


        };

      /* Edit Analysis File object */
      $scope.editAdjunto = function($index,a){
            aFileModal.$promise.then(aFileModal.show);
            var af = $scope.adjuntos[$index];
            af.required = false;
            create_analysisFile($scope.adjuntos[$index],function(){
              aFileModal.$promise.then(aFileModal.hide());
              });
        }

      /* Show Analysis File Image on a new Modal */
      $scope.showImagen = function($index,a){
        $scope.aFile = $scope.adjuntos[$index];
        var modalImage = $modal({ 
          title: $scope.aFile.description,
          content: '<div class="thumbnail"> <img src="' + $scope.aFile.imageSrc + '" /> </div>', 
          show: false});
      
        modalImage.$promise.then(modalImage.show);
      }
      
      /* Set selected image(file input on views/partials/analysis-addAttachment) source on $scope.aFile.imageSrc. */
      $scope.getFile = function(){
        fileReader.readAsDataUrl($scope.aFile.image_file, $scope)
          .then(function(result) {
            $scope.aFile.imageSrc = result;
          });
        }

      /* Attachments elements list to persist. */
      $scope.adjuntos = [];

      /* Estructura de un elemento de adjuntos:
      *  var e = { 
      *    description: '',
      *    datetime :'',
      *    file_type :'',
      *    image_file: blob,
      *    }
      *
      */ 

      

      /* Guarda los datos cargados en la vista en el elemento de analysis <`a`> 
      * (pasado por parametro)
      * 
      * <onSubmit> es la función que se va a ejecutar cuando se submite el modal
      * de analysisFile, en caso de que no se defina, se agrega el objeto a en
      * `adjuntos` */
      function create_analysisFile(a, onSubmit){

        $scope.msg = '';

        $scope.aFile = a;
        $scope.aFile.datetime = ($scope.aFile.datetime || $scope.analysis.datetime);

        /* Agrega un archivo adjunto a la lista de adjuntos. */
        var addAdjunto = function(){
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

          /* Se setea el icono correspondiente en el objeto Analysis File */
          a.file_type = type;

          $scope.adjuntos.push(a);
          
          /* Hide Analysis File Modal */
          aFileModal.$promise.then(aFileModal.hide());
        }

        $scope.submitAdjunto = onSubmit || addAdjunto;


      }

      /* Verifica si <fileName> tiene alguna de las extensiones, que se
      * encuentran en la lista <exts> pasada por argumento.  */
      function hasExtension( fileName, exts) {
          return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
          }

      



      /********************* Measurement ********************************/

      /* Modal Analysis Measurement */
      var aMeasurementModal = $modal({ 
        scope: $scope,
        templateUrl: "views/partials/analysis-addMeasurement.html", 
        contentTemplate: false, 
        html: true, 
        show: false });

      /* Show Analysis Measurement Modal */
      $scope.showAMeasurementModal = function () {
          aMeasurementModal.$promise.then(aMeasurementModal.show);
          create_measurement(new Measurement());
          };

      /* Delete Analyisis Measurement Modal */
      $scope.deleteMedicion = function ($index, m) {
          $scope.confirm = {};
          $scope.confirm.class = 'danger';
          $scope.confirm.message =
              'Esta seguro que desea eliminar la medición <b>'
              +m.tipo.nombre+' '+ m.value+' '+ m.unidad.nombre+' </b> ?';

          $scope.confirm.confirm = function(){
              $scope.mediciones.splice($index, 1);
              confirmDeleteModal.$promise.then(confirmDeleteModal.hide);
          }

          var confirmDeleteModal = $modal({ 
            scope: $scope,
            templateUrl: "views/partials/confirm.html", 
            contentTemplate: false, 
            html: true, 
            show: false });

          confirmDeleteModal.$promise.then(confirmDeleteModal.show);

          };


      /* Edit Analyisis Measurement Modal */
      $scope.editMedicion = function($index,a){
          aMeasurementModal.$promise.then(aMeasurementModal.show);
          create_measurement($scope.mediciones[$index],function(){
            aMeasurementModal.$promise.then(aMeasurementModal.hide());
            });
        }

      /* Measurements elements list to persist. */
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



      /* Guarda los datos cargados en la vista en el elemento medicion <`m`> 
      * (pasado por parametro)
      * 
      * <onSubmit> es la función que se va a ejecutar cuando se submitee el modal
      * de analysisMeasurement, en caso de que no se defina, se agrega el objeto a en
      * `adjuntos` */
      function create_measurement(m , onSubmit){

        $scope.msg= '';

        $scope.measurement = m;

        $scope.measurement.datetime = $scope.analysis.datetime;

        // Seteamos los datos para el slider, porqué sinó no responde.
        $scope.selected_unit={};
        $scope.selected_unit.disabled=true;
        $scope.selected_unit.value=0;
        $scope.selected_unit.min=0;
        $scope.selected_unit.max=100;

        // Para que no muestre que estamos en un valor por encima del maximo recomendado al editar
        if (m.value){
          $scope.selected_unit.max=m.value;
        }

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
            $scope.getValidation();
            });                                                                       
          };
        
        if(m.measurement_type_id && m.measurement_source_id){
          $scope.getUnit();
        }
        //Función que guarda los datos y si todo es correcto muestra mensaje de "bien hecho" 
        var addMeasurement = function(){
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
                aMeasurementModal.$promise.then(aMeasurementModal.hide());
                //$scope.showAMeasurementModal();
                //$scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Bien hecho!</strong> Se cargó una medición.</div>");
                

              });
            });
          }

      $scope.submitMeasurement = onSubmit || addMeasurement;

      }

      $scope.updateMeasurementValue = function(){
        $scope.measurement.value = $scope.selected_unit.value;
      }

      $scope.updateSelectedUnitValue = function(){
        if (isNaN($scope.measurement.value)){
          return;
        }
        if($scope.measurement.value > $scope.selected_unit.max){
          $scope.selected_unit.value = $scope.selected_unit.max;
          return;
        }
        if($scope.measurement.value < $scope.selected_unit.min){
          $scope.selected_unit.value = $scope.selected_unit.min;
          return;
        }
        $scope.selected_unit.value = $scope.measurement.value;
      }

      $scope.getValidation = function(){
        $.each($scope.unit,function(i,u){
          if (u.id == $scope.measurement.measurement_unit_id){
            $scope.selected_unit.min = u.min_value;
            $scope.selected_unit.max = u.max_value;
            $scope.selected_unit.disabled=false;
          }
        });
        $scope.updateSelectedUnitValue();
      }


      /* Se traen los datos de la vista necesarios para crear un analysis y se
      * persiste en conjunto con los analysisFile de la lista `adjuntos` y los
      * analysisMeasurements de la lista `mediciones`*/
      $scope.addAnalysis = function(){
          var pid = MyProfile.get(function(response){
              $scope.analysis.profile_id = pid.resource.id;

              $scope.analysis.$save(function(result){
                  var analysis_id = result.resource.id;
                  $.each( $scope.mediciones , function( i , m ){
                      m.profile_id = pid.resource.id;
                      m.analysis_id = analysis_id;
                      m.$save(function(){
                        console.log('Se guardó la medición:' + m);
                        });
                      });  

                $.each($scope.adjuntos , function( i , a ){
                  a.analysis_id = analysis_id;
                  AnalysisFile.save(a, function(result) {
                      console.log('sé guardó el archivo' + a.real_name);
                    });

                  });

                  $location.path('/#/myProfileInformation');

                });

              });

        }
    });
  });
