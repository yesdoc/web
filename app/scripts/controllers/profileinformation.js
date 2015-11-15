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
      MyGroupMemberships,
      Groups,
      GroupsMembers,
      MyGravatar,
      Auth,
      $location) {       

        Auth.isLogged(function(){

        $scope.group = {};
        $scope.profile = {};

        MyProfile.get(function(response){
          var profile = response.resource;
          profile.gender = profile.gender.name;
          $scope.profile = profile;
          }); 

        MyGravatar.get({size:120},function(response){
          $scope.profile.src = response.resource.gravatar_url
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

              MyGroupMemberships.get({group:g.id},function(response){
                g.is_admin = response.resource[0].is_admin
                });

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
      
        /* Show add group Modal */
        $scope.showAddGroup = function () {
          GroupMembershipTypes.query(function(response){
            $scope.membership_types = response.resource;

            PermissionTypes.query(function(response){
              $scope.permission_types = response.resource;

              addGroupModal.$promise.then(addGroupModal.show);
            });
          });
        

        /* Crear grupo */
        $scope.submitGroup = function(){

          /* Se encarga de guardar el grupo*/
          function saveGroup(){
            Groups.save($scope.group ,function(response,status){
                addGroupModal.$promise.then(addGroupModal.hide);
                getGroupsAndMembers();

                if(!$scope.$$phase) {
                  $scope.apply();
                  }
              });
          }

          /* Se encarga de crear un nuevo memership en caso de ser necesario o
           * directamente llamar a guardar grupo*/
          if ($scope.group.newMembership){
            var newMembership = {}
            newMembership.name = $scope.group.newMembership;
            GroupMembershipTypes.save(newMembership,function(response){
              $scope.group.group_membership_type_id = response.resource.id;
              saveGroup();
            });
          }else{
            saveGroup();
          }

          }//end submitGroup
        };// end showAddGroup


        var addMemberModal = $modal({ 
          scope: $scope,
          templateUrl: "views/partials/memberform.html", 
          contentTemplate: false, 
          html: true, 
          show: false });
      

        /* Mostrar modal para agregar nuevo miembro*/
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

        /* Agregar Nuevo Miembro */
        $scope.addMember = function (){
          $.each($scope.users,function(i,u){
            if (u.username.toLowerCase() == $scope.member.user.toLowerCase()){
              $scope.member.user_id = u.id;
              return true;//break;
              }
            });

          $scope.member.is_admin = false;

          /* Guarda el miembro*/
          function saveMember(){
            GroupsMembers.save(
                {group_id: $scope.member.group.id}, 
                $scope.member,
                function(response){

              addMemberModal.$promise.then(addMemberModal.hide());
              getGroupsAndMembers();
              $scope.group={};

              if(!$scope.$$phase) {
                $scope.apply();
                }
              });
          }

          /* Se encarga de crear un nuevo memership en caso de ser necesario o
           * directamente llamar a guardar grupo*/
          if ($scope.member.newMembership){
            var newMembership = {}
            newMembership.name = $scope.member.newMembership;
            GroupMembershipTypes.save(newMembership,function(response){
              $scope.member.group_membership_type_id = response.resource.id;
              saveMember();
            });
          }else{
              saveMember();
          }
        };// .addMember

        /* Eliminar Grupo */
        $scope.deleteGroup = function($index){
          $scope.confirm = {};
          $scope.confirm.class = 'danger';
          $scope.confirm.message = '¿Está seguro que desea eliminar el grupo <b>'+ $scope.groups[$index].name + '</b> ?';

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


        /* Eliminar miembro */
        $scope.deleteMember = function(member){
          GroupMembers.remove({id : member.id},function(){
              getGroupsAndMembers();

              if(!$scope.$$phase) {
                $scope.apply();
                }
              });
          }

        /* Tengo permisos para eliminar el miembro del grupo (pasados por
         * parametros)*/
        $scope.canExpulse = function(group,member){
          if (group.is_admin){
            return true;
          }
          if(member.profile.id == $scope.profile.id){
            return true;
            }
          return false;
        }

        $scope.hideCollapse = function(selector){
          if($scope.group) $scope.group.newMembership = null;
          if($scope.member) $scope.member.newMembership = null;
          $(selector).collapse("hide")
        }

        $scope.onShowNewMembership = function(){
          if ($scope.group) $scope.group.group_membership_type_id = 0;
          if ($scope.member) $scope.member.group_membership_type_id = 0;
        }

      });
    });
