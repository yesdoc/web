'use strict';

/**
 * @ngdoc overview
 * @name saludWebApp
 * @description
 * # saludWebApp
 *
 * Main module of the application.
 */
angular
  .module('saludWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/profileInformation/new', {
        templateUrl: 'views/profileinformation-new.html',
        controller: 'ProfileInformationNewCtrl'
      })
      .when('/myProfileInformation/', {
        templateUrl: 'views/profileinformation.html',
        controller: 'ProfileInformationCtrl'
      })
      .when('/myProfileInformation/edit', {
        templateUrl: 'views/profileinformation-edit.html',
        controller: 'ProfileInformationEditCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
