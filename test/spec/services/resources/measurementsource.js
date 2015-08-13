'use strict';

describe('Service: measurementsource', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var $httpBackend;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    // measurements sources uri
    var uri_mrs = 'https://yesdoc-api.herokuapp.com/measurement_sources';

    // all measurements sources
    var mrs = {"resource": [{
        "id": 1,
        "description": null,
        "name": "Manual"}]
        }

    // set resource to uri
    $httpBackend.whenGET(uri_mrs).respond(mrs)

    //specific measurment source uri
    var uri_m = 'https://yesdoc-api.herokuapp.com/measurement_sources/1';

    //specific measurment source
    var m = {resource:mrs.resource[0]};

    // set resource to sepecific uri
    $httpBackend.whenGET(uri_m).respond(m)

  }));

  describe('MeasurementSource#query', function() {
    it('returns a JSON', inject(function(MeasurementSource) {
        var mrs = MeasurementSource.query();
        $httpBackend.flush();
        expect(mrs.resource[0].id).toEqual(1);
    }));
  });

  describe('MeasurementSource#get', function() {
    it('Request for id 1 to mock API and returns a JSON',inject(function(MeasurementSource) {
        var m = MeasurementSource.get({id:'1'});
        $httpBackend.flush();
        expect(m.resource.id).toEqual(1);
    }));
  });
});

