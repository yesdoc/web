'use strict';

describe('Controller: MeasurementNewCtrl', function () {

  // load the controller's module
  beforeEach(module('saludWebApp'));

  var MeasurementNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeasurementNewCtrl = $controller('MeasurementNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
