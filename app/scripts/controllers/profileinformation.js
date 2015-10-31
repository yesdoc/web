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
      Groups,
      GroupsMembers,
      Auth,
      $location) {       

        Auth.isLogged(function(){

        $scope.group = {};

        var dataProfile = MyProfile.get(function(){
          var profile=dataProfile.resource;
          profile.gender=profile.gender.name;
          $scope.profile=profile;
          }); 

        $scope.groups = [];
        MyGroups.get(function(response){
          $scope.groups = response.resource;
          $.each($scope.groups,function(i,g){
            GroupsMembers.get({group_id:g.id},function(response){
              g.members = response.resource;
              });
            });
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
        
        $scope.submitGroup = function(){
          Groups.save($scope.group ,function(response,status){
              if (status=='200'){
                log('Se creó el grupo');
                }
            });
          }//end submitGroup
        };// end showAddGroup


        var addMemberModal = $modal({ 
          scope: $scope,
          templateUrl: "views/addGroup.html", 
          contentTemplate: false, 
          html: true, 
          show: false });
      

        $scope.addMember = function($index){
          var g = $scope.groups[$index];
          addMemberModal.$promise.then(addMemberModal.show);
          }

        


        

      });
    });
