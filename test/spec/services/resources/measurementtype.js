'use strict';

describe('Service: MeasurementType', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var $httpBackend;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    // measurements types uri
    var uri_mrs = 'https://yesdoc-api.herokuapp.com/measurement_types';

    // all measurements types
    var mrs = {"resource": [{
        "id": 1,
        "description": "Peso corporal de la persona.",
        "name": "Peso"}]
    }

    $httpBackend.whenGET(uri_mrs).respond(mrs)

    //specific measurment type uri
    var uri_m = 'https://yesdoc-api.herokuapp.com/measurement_types/1';

    //specific measurment type
    var m = {resource:mrs.resource[0]};

    $httpBackend.whenGET(uri_m).respond(m)

  }));

  describe('MeasurementType#query', function() {
    it('returns a JSON', inject(function(MeasurementType) {
        var mrs = MeasurementType.query();
        $httpBackend.flush();
        expect(mrs.resource[0].id).toEqual(1);
    }));
  });

  describe('MeasurementType#get', function() {
    it('Request for id 1 to mock API and returns a JSON with id=1', inject(function(MeasurementType) {
        var m = MeasurementType.get({id:'1'});
        $httpBackend.flush();
        expect(m.resource.id).toEqual(1);
    }));
  });
});

