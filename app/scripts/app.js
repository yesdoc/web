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
    'ngTouch',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/analysis.html',
        controller: 'AnalysisCtrl'
      })
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/logoff', {
        templateUrl: 'views/logoff.html',
        controller: 'LogoffCtrl'
      })
      .when('/profileInformation/new', {
        templateUrl: 'views/profileinformation-new.html',
        controller: 'ProfileInformationNewCtrl'
      })
      .when('/myProfileInformation', {
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
      .when('/measurements/new', {
        templateUrl: 'views/measurement-new.html',
        controller: 'MeasurementNewCtrl'
      })
      .when('/profileMeasurements', {
        templateUrl: 'views/profilemeasurements.html',
        controller: 'ProfileMeasurementsCtrl'
      })
      .when('/measurements/:id/edit', {
        templateUrl: 'views/measurement-edit.html',
        controller: 'MeasurementEditCtrl'
      })
      .otherwise({
        redirectTo: '/profileMeasurements'
      });
  });
    /*
    .run(function($rootScope , $location){
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if ( $rootScope.loggedUser == null ) {
            // no logged user, we should be going to #login
            if ( next.templateUrl == "login.html") {
            // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path("/login");
            }
            }         
        });

    }); */
