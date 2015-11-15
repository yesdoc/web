'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AnalysesshowCtrl
 * @description
 * # AnalysesshowCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('AnalysesShowCtrl', function (
        $scope,
        global,
        MyMeasurements,
        MyProfile,
        Measurement,
        MeasurementType,
        MeasurementTypeUnit,
        MeasurementUnit,
        MeasurementSource,
        $sce,
        $routeParams,
        AnalysisFile,
        PermissionTypes,
        Permissions,
        Profile,
        User,
        AnalysisPermissions,
        AnalysisComments,
        Analysis,
        $modal,
        MyUser,
        Auth,
        $compile,
        fileReader) {

    Auth.isLogged(function(){

    var analysis_id = $routeParams.id;


    /*********************** PERMISOS  ****************************/
    /* Obtener Tipos permisos */
    function getPermissionTypes(){

      $scope.permissions_type = [];
      $scope.perm.analysis_id = analysis_id;

      PermissionTypes.query(function(response){
        var perms = response.resource;
        $.each(perms,function(i,p){
          var label = p.name;
          if(p.can_edit_measurements || p.can_edit_analysis_files){
            label="<i class=\"fa fa-edit\"></i> "+label;
            }
          if(p.can_view_measurements || p.can_view_analysis_files){
            label="<i class=\"fa fa-eye\"></i> "+label;
            }
          $scope.permissions_type.push({'value':p.id,'label':label})
          $scope.perm.permission_type_id = undefined; 
          })
      });
    }


    /* Guardar permisos para un usuario */
    $scope.addConfig = function(){
      $.each($scope.users,function(i,u){
        
        if (String(u.username).toLowerCase() == String($scope.perm.user).toLowerCase()){
          $scope.perm.user_id = u.id;
          }
        });
      AnalysisPermissions.save({analysis_id:$scope.perm.analysis_id},$scope.perm,function(){
        $scope.perm={};
        $scope.perm.analysis_id = analysis_id;
        AnalysisPermissions.get({analysis_id : $routeParams.id},function(response){
          $scope.permissions = response.resource;
          if(!$scope.$$phase) {
            $scope.apply();
            }
        });
      });
    }

    /* Eliminar permisos para un usuario */
    $scope.removePerms = function(usuario_perms,$index){
      Permissions.remove({id:usuario_perms.id},function(){
          $scope.permissions.splice($index, 1);
          if(!$scope.$$phase) {
            $scope.apply();
            }
      });
    }

    /* Show Config Modal */
    $scope.showConfig = function () {
        var configModal = $modal({ 
          scope: $scope,
          templateUrl: "views/partials/config.html", 
          contentTemplate: false, 
          html: true, 
          show: false });
        AnalysisPermissions.get({analysis_id : $routeParams.id},function(response){
          $scope.permissions = response.resource;
        });
        $scope.perm = new AnalysisPermissions();
        $scope.perm.user=''; 
        User.query(function(response){
          $scope.users = response.resource;
          });

        getPermissionTypes();
        
        configModal.$promise.then(configModal.show);
    };


    /************************* ANALYSIS FILE *************************************/

    /* Show Analysis File Image on a new Modal */
    $scope.showImage = function($index,a){
      var af = $scope.afs[$index];
      var modalImage = $modal({ 
        title: af.description,
        content: '<div class="thumbnail"><a href="'+ af.urlDownload +'"> <img src="' + af.imageSrc + '" /></a> </div>', 
        show: false});
    
      modalImage.$promise.then(modalImage.show);
    }
    

    $scope.afs = []; //analysis files list
    /* Obtiene la lista de archivos asociados a un analisis */
    function getAnalysisFile(){
      Auth.getAuth(function(token){
        Analysis.get({id : $routeParams.id},function(response){
          $scope.a = response.resource;
          $scope.a.datetime = new Date($scope.a.datetime+'Z');

          Analysis.get({id : $routeParams.id , element : 'files'},function(response){
            $scope.aFiles = response.resource;
            $.each($scope.aFiles,function(i,af){
                  af.imageSrc = ( global.getApiUrl() + '/analysis_files/' + af.id + '/thumbnail_by_query?token='+token);

                  af.urlDownload = ( global.getApiUrl() + '/analysis_files/' + af.id + '/thumbnail_by_query?token='+token+'&download=true');

                  $scope.afs.push(af);
              });

            if(!$scope.$$phase) {
              $scope.apply();
              }

            }); //.Analysis.get element files
          }); // .Analysis.get
        }); // .getAuth
      } // .getAnalysisFile

      getAnalysisFile();

      $scope.deleteAnalysisFile = function(af,i){
          $scope.confirm = {};
          $scope.confirm.class = 'danger';
          $scope.confirm.message = '¿Está seguro que desea eliminar el archivo <b>'+ af.description + '</b> ?';

          $scope.confirm.confirm = function(){
            AnalysisFile.remove({id : af.id},function(response){

              confirmDeleteModal.$promise.then(confirmDeleteModal.hide);

              $scope.aFiles.splice(i,1)
              $scope.afs.splice(i,1)
              slideUpdate();
              
              });
            }

          var confirmDeleteModal = $modal({ 
            scope: $scope,
            templateUrl: "views/partials/confirm.html", 
            contentTemplate: false, 
            html: true, 
            show: false });

          confirmDeleteModal.$promise.then(confirmDeleteModal.show);

      }

      function slideUpdate(){
        $('#slides_flex').empty();

        var element = (
            '<flex-slider ' +
            'slider_id="carousel"'+
            'flex-slide="s in afs track by $index" '+
            'animation="slide" '+
            'control-nav="false"' +
            'slideshow-speed= "4000"' +
            'animation-loop="true" ' +
            'pause-on-hover="true" ' +
            'item-width="210" ' +
            'item-margin="5">' +
            '<li id="slide_{{$index}}">'+
            '<a href="" ng-click="showImage($index)">'+
            '<div style=" width:210px;height:150px;background : url({{s.imageSrc}}) no-repeat 50% 10%;background-size: 100% auto;">'+
            '</div>'+
            '</a>'+
            '</li>'+
            '</flex-slider>');

        angular.element(document.getElementById('slides_flex')).append($compile(element)($scope))

      }

      function create_analysisFile(a, onSubmit){

        $scope.msg = '';
        
        a.analysis_id = analysis_id;

        $scope.aFile = a;

        $scope.aFile.datetime = new Date();

        var addAdjunto = function(){
          $scope.msg = $sce.trustAsHtml("<div class='alert alert-success' role='alert'><strong>Cargando...</strong></div>");

          AnalysisFile.save($scope.aFile,function(){
            /* Hide Analysis File Modal */
            aFileModal.$promise.then(aFileModal.hide());

            $scope.afs = []; //analysis files list
            getAnalysisFile();


            });

        }

        $scope.submitAdjunto = onSubmit || addAdjunto;

      }


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

      /* Set selected image(file input on views/partials/analysis-addAttachment) source on $scope.aFile.imageSrc. */
      $scope.getFile = function(){
        fileReader.readAsDataUrl($scope.aFile.image_file, $scope)
          .then(function(result) {
            $scope.aFile.imageSrc = result;
          });
        }



      /**************************** COMMENTS ******************************/
      
      var updateComments = function(){
        var g_com = Analysis.get({id:$routeParams.id , element: 'comments'},function(){
          $scope.comments = [];


          $scope.comments = g_com.resource;

          $.each($scope.comments, function(i , c){
            c.datetime = (new Date(c.datetime+'Z'));
            });

          $scope.commentsLength = function(){
            switch($scope.comments.length){
              case 0:
                return ('Sin comentarios');
              case 1:
                return ('1 comentario');
              default:
                return ($scope.comments.length + ' comentarios');
            }
          };

          // Trae las imagenes del backend, se hace aparte de la conversión de
          // fechas para que muestre los comentarios sin imagenes mientras se
          // cargan estas.
          $.each($scope.comments, function(i , c){
            Profile.get({id:c.profile.id,element:'gravatar',size: 64},function(response){
              c.src = response.resource.gravatar_url;
              })
            });

          });
      }
      updateComments();


      $scope.addComment = function(){
        AnalysisComments.save({analysis_id: $routeParams.id}, $scope.c, function(){
          updateComments();
          if(!$scope.$$phase) {
            $scope.apply();
            }
          $scope.c={};
          });
      };


      /************************ MEASUREMENTS ***********************************/


      function getMeasurements(){
        Analysis.get({id: $routeParams.id , element:'measurements'},function(response){
          $scope.measurements = [];
          $.each(response.resource, function(i , am){
            am.datetime = new Date(am.datetime)
            $scope.measurements.push(am);
            });
          });
      }
      getMeasurements();

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



      function create_measurement(m , onSubmit){

        $scope.msg= '';

        $scope.measurement = m;

        $scope.measurement.datetime = new Date();

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

        // Función que guarda los datos y si todo es correcto muestra mensaje de "bien hecho" 
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
                MyProfile.get(function(response){
                  e.profile_id = response.resource.id;
                  e.analysis_id = analysis_id;
                  e.tipo = {id : type_id , nombre : type_name};
                  e.unidad= {id : unit_id , nombre : unit_name};
                  e.source= {id: source_id ,nombre: 'Manual'};
                  e.value= $scope.measurement.value;
                  e.measurement_source_id = source_id;
                  e.measurement_type_id = type_id;
                  e.measurement_unit_id = unit_id;
                  e.datetime = $scope.measurement.datetime;

                  e.$save(function(response){

                    getMeasurements();

                    if(!$scope.$$phase) {
                      $scope.apply();
                      }

                  });
                });

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

    });
  
  });
