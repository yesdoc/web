'use strict';

describe('Controller: MeasurementEditCtrl', function () {

  // load the controller's module
  beforeEach(module('saludWebApp'));

  var MeasurementEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeasurementEditCtrl = $controller('MeasurementEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
