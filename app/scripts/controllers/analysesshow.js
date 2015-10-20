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
        User,
        AnalysisPermissions,
        Analysis,
        $modal,
        MyUser,
        Auth,
        fileReader) {

    Auth.isLogged();

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
        })
      AnalysisPermissions.save({analysis_id:$scope.perm.analysis_id},$scope.perm,function(){
        $scope.perm=undefined;
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
        //$scope.permissions=
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
        content: '<div class="thumbnail"> <img src="' + af.imageSrc + '" /> </div>', 
        show: false});
    
      modalImage.$promise.then(modalImage.show);
    }
    
    Auth.getAuth(function(token){
      var g_a = Analysis.get({id : $routeParams.id},function(){
        $scope.a = g_a.resource;
        $scope.a.datetime = new Date($scope.a.datetime);
        }

        $scope.afs = []; //analysis files list
        var q_af = Analysis.get({id : $routeParams.id , element : 'files'},function(){
          $.each(q_af.resource,function(i,af){
                af.imageSrc = (
                    global.getApiUrlAuth(token+':@')+
                    '/analysis_files/'+
                    af.id+
                    '/thumbnail');
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


  });
