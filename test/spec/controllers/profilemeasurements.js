'use strict';

describe('Controller: ProfilemeasurementsCtrl', function () {

  // load the controller's module
  beforeEach(module('saludWebApp'));

  var ProfilemeasurementsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilemeasurementsCtrl = $controller('ProfilemeasurementsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
