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
    'route-segment',
    'view-segment',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'nvd3ChartDirectives'
  ])
  
  .config(function ($routeSegmentProvider , $routeProvider) {
    $routeSegmentProvider.
      when('/about', 'about').
      when('/home','home').
      when('/home/height','home.height').
      when('/home/weight','home.weight').
      when('/logoff', 'logoff').
      when('/profileInformation/new','profileInformation/new').
      when('/myProfileInformation','myProfileInformation').
      when('/myProfileInformation/edit','myProfileInformation/edit').
      when('/login','login').
      when('/measurements/new','measurements-new' ).
      when('/profileMeasurements','profileMeasurements').
      when('/measurements/:id/edit','measurements-edit').

      segment('login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      }).
      segment('about',{
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }).
      segment('home',{
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
        within().
            segment('weight',{
            default: true,
            templateUrl:'views/weight.html',
            controller:'WeightCtrl'
            }).
            segment('height',{
            templateUrl:'views/height.html',
            controller:'HeightCtrl'
            }).
            up().
      segment('logoff',{
        templateUrl: 'views/logoff.html',
        controller: 'LogoffCtrl'
      }).
      segment('profileInformation/new',{
        templateUrl: 'views/profileanduser-new.html',
        controller: 'ProfileAndUserNewCtrl'
      }).
      segment('myProfileInformation',{
        templateUrl: 'views/profileinformation.html',
        controller: 'ProfileInformationCtrl'
      }).
      segment('myProfileInformation/edit',{
        templateUrl: 'views/profileinformation-edit.html',
        controller: 'ProfileInformationEditCtrl'
      }).
      segment('measurements-new',{
        templateUrl: 'views/measurement-new.html',
        controller: 'MeasurementNewCtrl'
      }).
      segment('profileMeasurements',{
        templateUrl: 'views/profilemeasurements.html',
        controller: 'ProfileMeasurementsCtrl'
      }).
      segment('measurements-edit',{
        templateUrl: 'views/measurement-edit.html',
        controller: 'MeasurementEditCtrl'
      });

     $routeProvider.otherwise({redirectTo: '/profileMeasurements'});
});
