'use strict';

describe('Service: measurement', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var $httpBackend;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    // measurements uri
    var uri_mrs = 'https://yesdoc-api.herokuapp.com/measurements';

    // all measurements
    var mrs = {"resource": [{
        "measurement_unit": {
            "id": 1,
            "suffix": true,
            "symbol": "Kg",
            "name": "Kilogramo"},
        "datetime": "2015-06-15T02:29:54",
        "measurement_source": {
            "description": null,
            "id": 1,
            "name": "Manual"},
        "id": 1,
        "value": 50,
        "measurement_type": {
            "description": "Peso corporal de la persona.",
            "id": 1,
            "name": "Peso"},
        "profile": {
            "first_name": "Milton",
            "id": 1,
            "birthday": "1990-10-26",
            "last_name": "Terreno",
            "gender": {
                "description": null,
                "id": 1,
                "name": "Masculino"}}
        }]}

    $httpBackend.whenGET(uri_mrs).respond(mrs)

    //specific measurment uri
    var uri_m = 'https://yesdoc-api.herokuapp.com/measurements/1';

    //specific measurment
    var m = {resource:mrs.resource[0]};

    $httpBackend.whenGET(uri_m).respond(m)

  }));

  describe('Measurement#query', function() {
    it(' Request for all elements to Mock API and returns a JSON', inject(function(Measurement) {
        var mrs = Measurement.query();
        $httpBackend.flush();
        expect(mrs.resource[0].id).toEqual(1);
    }));
  });

  describe('Measurement#get', function() {
    it('Resquest for id 2 to mock API and returns a JSON', inject(function(Measurement) {
        var m = Measurement.get({id:'1'});
        $httpBackend.flush();
        expect(m.resource.id).toEqual(1);
    }));
  });
});

