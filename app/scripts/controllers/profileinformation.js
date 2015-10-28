'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the saludWebApp
 */

angular.module('saludWebApp')
.controller(
    'ProfileInformationCtrl',
    function(
      $scope,
      $cookies,
      $modal, 
      MyProfile,
      PermissionTypes,
      GroupMembershipTypes,
      MyGroups,
      Auth,
      $location) {       

        Auth.isLogged(function(){

        var dataProfile = MyProfile.get(function(){
          var profile=dataProfile.resource;
          profile.gender=profile.gender.name;
          $scope.profile=profile;
          }); 

        $scope.groups = [];
        var g_groups = MyGroups.get(function(){
          $scope.groups = g_groups.resource;
          });


      var addGroupModal = $modal({ 
        scope: $scope,
        templateUrl: "views/addGroup.html", 
        contentTemplate: false, 
        html: true, 
        show: false });
      
      /* Show Analysis File Modal */
      $scope.showAddGroup = function () {
        GroupMembershipTypes.query(function(response){
          $scope.membership_types = response.resource;

          PermissionTypes.query(function(response){
            $scope.permission_types = response.resource;

            addGroupModal.$promise.then(addGroupModal.show);
          });
        });

      };

        


        

      });
    });
