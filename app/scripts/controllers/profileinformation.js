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
      User,
      MyProfile,
      PermissionTypes,
      GroupMembershipTypes,
      GroupMembers,
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
        $scope.sin_grupos=false;

        function getGroupsAndMembers(){
          MyGroups.get(function(response){
            $scope.groups = response.resource;
            if ($scope.groups.length == 0){
              $scope.sin_grupos = true;
              }else{
                $scope.sin_grupos=false;
              }


            $.each($scope.groups,function(i,g){
              GroupsMembers.get({group_id:g.id},function(response){
                g.members = response.resource;
                });
              });
            });
        };
        getGroupsAndMembers();



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
              addGroupModal.$promise.then(addGroupModal.hide);
              getGroupsAndMembers();

              if(!$scope.$$phase) {
                $scope.apply();
                }
            });
          }//end submitGroup
        };// end showAddGroup


        var addMemberModal = $modal({ 
          scope: $scope,
          templateUrl: "views/partials/memberform.html", 
          contentTemplate: false, 
          html: true, 
          show: false });
      

        $scope.showAddMember = function($index){
          $scope.member = {};
          $scope.member.group = $scope.groups[$index];

          User.query(function(response){
            $scope.users = response.resource;

            GroupMembershipTypes.query(function(response){
              $scope.membership_types = response.resource;

              PermissionTypes.query(function(response){
                $scope.permission_types = response.resource;

                });
              });
            });

            addMemberModal.$promise.then(addMemberModal.show);
          }

        $scope.addMember = function (){
          $.each($scope.users,function(i,u){
            if (u.username.toLowerCase() == $scope.member.user.toLowerCase()){
              $scope.member.user_id = u.id;
              return true;//break;
              }
            });

          $scope.member.is_admin = false;

          GroupsMembers.save(
              {group_id: $scope.member.group.id}, 
              $scope.member,
              function(response){

            addMemberModal.$promise.then(addMemberModal.hide());
            getGroupsAndMembers();

            if(!$scope.$$phase) {
              $scope.apply();
              }
            });
        };

        $scope.deleteGroup = function($index){
          $scope.confirm = {};
          $scope.confirm.class = 'danger';
          $scope.confirm.message = 'Esta seguro que desea eliminar el grupo <b>'+ $scope.groups[$index].name + '</b> ?';

          $scope.confirm.confirm = function(){
            Groups.remove({id: $scope.groups[$index].id},function(response){
              getGroupsAndMembers();

              if(!$scope.$$phase) {
                $scope.apply();
                }

              confirmDeleteModal.$promise.then(confirmDeleteModal.hide);

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


        $scope.deleteMember = function(member){
          GroupMembers.remove({id : member.id},function(){
              getGroupsAndMembers();

              if(!$scope.$$phase) {
                $scope.apply();
                }

          });
        }

      });
    });
