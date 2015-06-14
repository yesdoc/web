'use strict';

describe('Controller: ProfileinformationEditCtrl', function () {

  // load the controller's module
  beforeEach(module('saludWebApp'));

  var ProfileinformationEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileinformationEditCtrl = $controller('ProfileinformationEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
