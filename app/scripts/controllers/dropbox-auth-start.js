'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('DropboxAuthStartCtrl', function ($scope,Auth,MyStorageCredentials) {

    Auth.isLogged();

    $scope.msg={'dropbox':'Conectar con mi Dropbox','drive':'Conectar con mi Google Drive'}
    $scope.isDisabled={'dropbox':'','drive':'disabled'}
    MyStorageCredentials.query(function(response){
      var credentials = response.resource;
      $.each(credentials,function(i,c){

        switch(c.storage_location.name.toLowerCase()){
          case 'dropbox':
            $scope.msg['dropbox']='Dropbox ya está conectado';
            $scope.isDisabled['dropbox'] = 'disabled'
            break;
          case 'drive':
            $scope.msg['drive']='Google Drive ya está conectado';
            break;
          default:
            break;
        }

      });
    });


  });
