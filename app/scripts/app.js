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
    'angularMoment',
    'route-segment',
    'view-segment',
    'ngSanitize',
    'ngTouch',
    'angular-flexslider',
    'mgcrea.ngStrap',
    'rzModule',
    'nvd3ChartDirectives'
  ]).run(function(amMoment) {
        amMoment.changeLocale('es');
  })
  
  /* FIXME redireccion \login
  .run(['$http', '$cookies', '$rootScope', 'global', '$location', '$window',
      function ($http, $cookies, $rootScope, global, $location, $window) {  
          var token = $cookies.get('Token');                                      
          $http.defaults.headers.common['Authorization'] = token;                 
                  alert($location.url()==" ");
              if (!token && $location.url()) {                                         
                  // $location.path('/login');                                        
                  $window.location="login.html";    
              }
      }])
  */
  .config(function ($routeSegmentProvider , $routeProvider,$locationProvider) {
    $routeSegmentProvider.
      when('/about', 'about').
      when('/home/:type','home').
      when('/logoff', 'logoff').
      when('/profileInformation/new','profileInformation/new').
      when('/myProfileInformation','myProfileInformation').
      when('/myProfileInformation/edit','myProfileInformation/edit').
      when('/login','login').
      when('/measurements/new','measurements-new' ).
      when('/profileMeasurements','profileMeasurements').
      when('/measurements/:id/edit','measurements-edit').
      when('/analysis/new','analysis-new').
      when('/analyses','analyses').
      when('/analyses/:id','analyses-show').
      when('/dropbox-auth-start','dropbox-st').
      when('/dropbox-auth-finish','dropbox-fn').
      when('/notifications','notifications').
      when('/collapseOne','collapseOne').
      when('/compartidos/:id','compartidos').
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
      segment('analyses',{
        templateUrl: 'views/analyses.html',
        controller: 'AnalysesCtrl'
      }).
      segment('analyses-show',{
        templateUrl: 'views/analyses-show.html',
        controller: 'AnalysesShowCtrl'
      }).
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
      segment('login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
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
      }).
      segment('analysis-new',{
        templateUrl: 'views/analysis-new.html',
        controller: 'AnalysisNewCtrl'
      }).
      segment('dropbox-st',{
        templateUrl: 'views/dropbox-auth-start.html',
        controller: 'DropboxAuthStartCtrl'
      }).
      segment('dropbox-fn',{
        templateUrl: 'views/dropbox-auth-finish.html',
        controller: 'DropboxAuthFinishCtrl'
      }).
      segment('notifications',{
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsCtrl'
      }).
      segment('compartidos',{
        templateUrl: 'views/compartidos.html',
        controller: 'CompartidosCtrl'
      });

     $routeProvider.otherwise({redirectTo: '/profileMeasurements'});
})
  .config(function($modalProvider,$dropdownProvider, $asideProvider) {
    angular.extend($modalProvider.defaults, {
      html: true
    });
    angular.extend($dropdownProvider.defaults, {
      html: true
    });
    angular.extend($asideProvider.defaults, {
      container: 'body',
      html: true
      });
  }).factory('myHttpInterceptor', function($q) {
    var rtime;
    var timeout = false;
    var delta = 1000;
    var request_finish = true;

    function loadSpinner(){
      //rtime: last request time
      rtime = new Date();
      $('.spinner').show();
      setTimeout(spinnerEnd, delta);
      request_finish = false;
    }

    function spinnerEnd() {
      if (new Date() - rtime < delta) {
        setTimeout(spinnerEnd, delta);
      } else {
        if(request_finish){
          $('.spinner').hide();
        }else{
          setTimeout(spinnerEnd, delta);
        }
      }               
    }

  return {
    'request': function(config) {
      loadSpinner();
      return config;
    },
    'requestError': function(rejection) {
      loadSpinner();
      return $q.reject(rejection);
    },
    'response': function(response) {
      request_finish = true;
      return response;
    },
    'responseError': function(rejection) {
      request_finish = true;
      return $q.reject(rejection);
    }
  };
  }).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
  }]);
