'use strict';

describe('Controller: NavCtrl', function () {

  // load the controller's module
  beforeEach(module('saludWebApp'));

  var NavCtrl,
    scope,
    mocklocation;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,_$location_) {
    mocklocation=_$location_;
    scope = $rootScope.$new();
    NavCtrl = $controller('NavCtrl', {
      $scope: scope,
      $location:mocklocation
    });
  }));

  it('el test pasará cuando coincida la localizacion y el parámetro de isActive en home', function () {
    mocklocation.path('/');
    expect(scope.isActive('/')).toBe(true);
  });
  it('el test no pasará cuando no coincida la localizacion /#/ y el parámetro de isActive', function () {
    mocklocation.path('/#/');
    expect(scope.isActive('/')).toBe(false);
  });
  it('el test no pasará cuando no coincida la localizacion y el parámetro de isActive', function () {
    mocklocation.path('/whatever');
    expect(scope.isActive('/')).toBe(false);
  });
  it('el test no pasará cuando no coincida la localizacion y el parámetro de isActive', function () {
    mocklocation.path('/#/whatever');
    expect(scope.isActive('/')).toBe(false);
  });
  it('el test pasará cuando coincida la localización y el parámetros de isActive en about', function () {
    mocklocation.path('/about');
    expect(scope.isActive('/about')).toBe(true);
  });
  it('el test no pasará cuando no coincida la localizacion /#/about y el parámetro de isActive', function () {
    mocklocation.path('/#/about');
    expect(scope.isActive('/about')).toBe(false);
  });
  it('el test no pasará cuando no coincida la localizacion y el parámetro de isActive', function () {
    mocklocation.path('/whatever');
    expect(scope.isActive('/about')).toBe(false);
  });
  it('el test no pasará cuando no coincida la localizacion y el parámetro de isActive', function () {
    mocklocation.path('/#/whatever');
    expect(scope.isActive('/about')).toBe(false);
  });
});
