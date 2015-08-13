'use strict';

describe('Service: MeasurementUnit', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var $httpBackend;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    // measurements units uri
    var uri_mrs = 'https://yesdoc-api.herokuapp.com/measurement_units';

    // all measurements units
    var mrs ={"resource": [{
        "suffix": true,
        "id": 1,
        "symbol": "m",
        "name": "Metros"}]
    } 

    $httpBackend.whenGET(uri_mrs).respond(mrs)

    //specific measurment unit uri
    var uri_m = 'https://yesdoc-api.herokuapp.com/measurement_units/1';

    //specific measurment unit
    var m = {resource:mrs.resource[0]};

    $httpBackend.whenGET(uri_m).respond(m)

  }));

  describe('MeasurementUnit#query', function() {
    it('Request for all elements to Mock API and returns a JSON with a element list', inject(function(MeasurementUnit) {
        var mrs = MeasurementUnit.query();
        $httpBackend.flush();
        expect(mrs.resource[0].id).toEqual(1);
    }));
  });

  describe('MeasurementUnit#get', function() {
    it('Request for id 1 to mock API and returns a JSON with id=1', inject(function(MeasurementUnit) {
        var m = MeasurementUnit.get({id:'1'});
        $httpBackend.flush();
        expect(m.resource.id).toEqual(1);
    }));
  });
});

