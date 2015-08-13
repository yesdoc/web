'use strict';

describe('Service: ProfileMeasurement', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var $httpBackend;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    // measurements uri
    var uri_mrs = 'https://yesdoc-api.herokuapp.com/profiles/3/measurements/latest';

    // all measurements
    var mrs = {"resource": [{
        "datetime": "2015-07-03T11:54:22.806000",
        "id": 17,
        "measurement_type": {
            "id": 1,
            "description": "Peso corporal de la persona.",
            "name": "Peso"},
        "measurement_source": {
            "id": 1,
            "description": null,
            "name": "Manual"
        },
        "measurement_unit": {
            "suffix": true,
            "id": 1,
            "symbol": "Kg",
            "name": "Kilogramo"},
        "value": 65
    }]}

    $httpBackend.whenGET(uri_mrs).respond(mrs)

  }));

  describe('ProfileMeasurement#get', function() {
    it('Resquest for id 3 to mock API and returns a JSON', inject(function(ProfileMeasurements) {
        var m = ProfileMeasurements.get({id:'3'});
        $httpBackend.flush();
        expect(m.resource[0].id).toEqual(17);
    }));
  });
});

