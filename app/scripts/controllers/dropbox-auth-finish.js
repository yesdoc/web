'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('DropboxAuthFinishCtrl', function ($scope,Auth,$location,StorageCredentials,User) {

    Auth.isLogged();
    var credential = new StorageCredentials;
    credential.token = $location.hash().split('&')[0];
    credential.token = credential.token.split('=')[1];
    credential.storage_location_id='1';//dropbox

    var g_u = User.get({},function(){
      g_u = g_u.resource;
      credential.owner_id = g_u.id;
      if (credential.token){
        var p_sc = credential.$save(function(){
          $scope.type='alert-success ';
          $scope.icon='fa-check';
          $scope.msg='Su cuenta de dropbox está ahora sincronizada';
        }); 
      }else{
        $scope.type='alert-warning';
        $scope.icon='fa-times';
        $scope.msg='Lo sentimos, ocurrió un problema.';
      }
    });
 });
