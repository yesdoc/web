'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('HomeCtrl', function ($scope,$cookies,$location, $rootScope) {

    if(!$cookies.get('profile_id')){                                        
        $location.path('/login');                                           
    }else{                                                              

        var profile_id=$cookies.get('profile_id');                         

        //Definición de los elementos a mostrar en la botonera
        $scope.panes = [{
            "name": "Peso", 
            "path":"weight",
            "partial":"views/weight.html",
            "controller":"WeightCtrl",
            "includedInTabView":true 

        }, {
            "name": "Altura",
            "path":"height",
            "partial":"views/height.html",
            "controller":"HeightCtrl",
            "includedInTabView":true 

        },{
            "name": "Colesterol en Sangre",
            "path":"bloodcholesterol",
            "partial":"views/bloodcholesterol.html",
            "controller":"BloodcholesterolCtrl",
            "includedInTabView":false   
        }]; 

    }
  });
