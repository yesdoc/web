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
        $routeParams,
        AnalysisFile,
        PermissionTypes,
        Permissions,
        User,
        AnalysisPermissions,
        AnalysisComments,
        Analysis,
        $modal,
        MyUser,
        Auth,
        fileReader) {

    Auth.isLogged(function(){

    function getPermissionTypes(){
      $scope.permissions_type = [];
      $scope.perm.analysis_id = $routeParams.id
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

    $scope.addConfig = function(){
      $.each($scope.users,function(i,u){
        if (u.username.toLowerCase() == $scope.perm.user.toLowerCase()){
          $scope.perm.user_id = u.id;
          }
        });
      AnalysisPermissions.save({analysis_id:$scope.perm.analysis_id},$scope.perm,function(){
        $scope.perm=undefined;
        AnalysisPermissions.get({analysis_id : $routeParams.id},function(response){
          $scope.permissions = response.resource;
          if(!$scope.$$phase) {
            $scope.apply();
            }
        });
      });
    }

    $scope.removePerms = function(usuario_perms){
      Permissions.remove({id:usuario_perms.id},function(){
        alert('removido');
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
        $scope.perm=new AnalysisPermissions();
        $scope.perm.user=''; 
        User.query(function(response){
          $scope.users = response.resource;
          });

        getPermissionTypes();
        
        configModal.$promise.then(configModal.show);
    };

    /* Show Analysis File Image on a new Modal */
    $scope.showImage = function($index,a){
      var af = $scope.afs[$index];
      var modalImage = $modal({ 
        title: af.description,
        content: '<div class="thumbnail"><a href="'+ af.urlDownload +'"> <img src="' + af.imageSrc + '" /></a> </div>', 
        show: false});
    
      modalImage.$promise.then(modalImage.show);
    }
    
    Auth.getAuth(function(token){
      var g_a = Analysis.get({id : $routeParams.id},function(){
        $scope.a = g_a.resource;
        $scope.a.datetime = new Date($scope.a.datetime+'Z');

        $scope.afs = []; //analysis files list
        var q_af = Analysis.get({id : $routeParams.id , element : 'files'},function(){
          $scope.aFiles = q_af.resource;
          $.each($scope.aFiles,function(i,af){
                af.imageSrc = ( global.getApiUrl() + '/analysis_files/' + af.id + '/thumbnail_by_query?token='+token);

                af.urlDownload = ( global.getApiUrl() + '/analysis_files/' + af.id + '/thumbnail_by_query?token='+token+'&download=true');

                $scope.afs.push(af);
            });
          });
        });
      });

      $scope.measurements = [];
      var g_am =  Analysis.get({id: $routeParams.id , element:'measurements'},function(){
        g_am = g_am.resource;
        $.each(g_am, function(i , am){
          am.datetime = new Date(am.datetime)
          $scope.measurements.push(am);
          });
        });

      $scope.comments = [];

      
      var updateComments = function(){
        var g_com = Analysis.get({id:$routeParams.id , element: 'comments'},function(){


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

    });
  
  });
