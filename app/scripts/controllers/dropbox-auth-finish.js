'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('DropboxAuthFinishCtrl', function ($scope,Auth,$location,StorageCredentials,StorageLocations,MyUser) {

    Auth.isLogged(function(){
    var credential = new StorageCredentials;
    credential.token = $location.hash().split('&')[0];
    credential.token = credential.token.split('=')[1];

    StorageLocations.query(function(response,status){
      if(status='200'){
        var stLocations = response.resource;
        $.each(stLocations,function(i,st){

          if (st.name.toLowerCase()=='dropbox'){
            credential.storage_location_id=st.id;
            var g_u = MyUser.get({},function(){
              g_u = g_u.resource;
              credential.owner_id = g_u.id;
              if (credential.token){
                var p_sc = credential.$save(function(){
                  onSuccess();
                  });
                }
              else{
                onFail();
                }
              });
            }
          });
        }
      else{
        onFail();
        }
      });

    var onSuccess = function(){
      $scope.type='alert-success ';
      $scope.icon='fa-check';
      $scope.msg='Su cuenta de Dropbox está ahora sincronizada';
      }

    var onFail = function(){
      $scope.type='alert-warning';
      $scope.icon='fa-times';
      $scope.msg='Lo sentimos, ocurrió un problema.';
      }

    });
  });



