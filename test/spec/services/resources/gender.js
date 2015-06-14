'use strict';

describe('Service: gender', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var gender;
  beforeEach(inject(function (_gender_) {
    gender = _gender_;
  }));

  it('should do something', function () {
    expect(!!gender).toBe(true);
  });

});
