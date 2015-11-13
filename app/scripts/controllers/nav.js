'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller('NavCtrl', function ($scope,Auth,$rootScope,Notifications , global, MyProfile, $aside, Profile) {

  var asideMobile = $aside({scope: $scope, templateUrl: 'views/partials/vertical_navbar.html',show:false});

  $scope.showAside = function(){
    asideMobile.$promise.then(function() {
      asideMobile.show();
    })
  }

  // Evento informante del estado de logueo del usuario. 
  // (ver archivo services/authorization.js)
  $rootScope.$on('isLoggedEvent', function(event, args) {

    asideMobile.$promise.then(function() {
      asideMobile.hide();
    })
    
    // El usuario está logueado
    if (args[0]){

      if (!$rootScope.first_name || $rootScope == undefined){
          MyProfile.get({},function(response){
            $rootScope.first_name = response.resource.first_name;
            $rootScope.last_name = response.resource.last_name;
            $rootScope.is_health_professional = response.resource.is_health_professional;
            $scope.user_name=$rootScope.first_name + ' ' + $rootScope.last_name;
            $scope.is_health_professional = $rootScope.is_health_professional;
          });
      }else{
            $scope.user_name=$rootScope.first_name + ' ' + $rootScope.last_name;
            $scope.is_health_professional = $rootScope.is_health_professional;
      }

      $scope.is_logged = true;


      Notifications.query({quantity:6,type:"event",unread:true},function(response){
        $scope.notifications = response.resource;
        $.each($scope.notifications,function(i,n){
          n.created_datetime = (new Date(n.created_datetime+'Z'));

          Profile.get({id: n.profile.id,element:'gravatar',size: 64},function(response){
            n.src = response.resource.gravatar_url;
            });

          });
        });

      Notifications.query({quantity:6,type:"message",unread:true},function(response){
        $scope.msgs= response.resource;
        $.each($scope.msgs,function(i,n){
          n.created_datetime = (new Date(n.created_datetime+'Z'));
          });
        });


    // El usuario NO está logueado
    }else{

      $scope.is_logged = false;

      $scope.msgs = []

      $scope.notifications = []

      $scope.user_name = null;

    }



    if(!$scope.$$phase) {
      $scope.$apply();
    }

  });

  $scope.redirect = function(n){

    Notifications.update({id:n.id},function(){});
    
    global.notificationRedirect(n);

  }

});
