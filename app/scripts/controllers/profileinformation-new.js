'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileinformationNewCtrl
 * @description
 * # ProfileinformationNewCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileInformationNewCtrl', function ($scope,Profile,Gender,$routeParams) {

        $scope.profile= new Profile();
        var genders_data = Gender.query(function(){
                $scope.genders = genders_data[0].data.genders;
        });
        $scope.addProfile = function(){
            $scope.profile.$save(function(){
                alert("Saved");
            });
        };

  });
