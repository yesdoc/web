'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('MainCtrl', function ($scope,$cookies,$location) {
  if(!$cookies.get('profile_id')){                                        
      $location.path('/login');                                           
  }else{                                                                  
      var profile_id=$cookies.get('profile_id');                          
  } 
});
