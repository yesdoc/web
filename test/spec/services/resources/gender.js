'use strict';

describe('Service: gender', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var $httpBackend;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    //genders uri
    var uri_genders = 'https://yesdoc-api.herokuapp.com/genders';

    //all genders
    var genders = {resource:
        [{ name: 'Masculino', description: '',id:'1' }]};

    $httpBackend.whenGET(uri_genders).respond(genders)

    //male gender uri
    var uri_m = 'https://yesdoc-api.herokuapp.com/genders/1';

    //male gender
    var gender_m = {resource:genders.resource[0]};

    $httpBackend.whenGET(uri_m).respond(gender_m)

  }));

  describe('Gender#query', function() {
    it('Request for all elements to Mock API and returns a JSON', inject(function(Gender) {
        var genders = Gender.query();
        $httpBackend.flush();
        expect(genders.resource[0].id).toEqual('1');
    }));
  });

  describe('Gender#get', function() {
    it('Request for id 1 to mock API and returns a JSON', inject(function(Gender) {
        var gender_m = Gender.get({id:'1'});
        $httpBackend.flush();
        expect(gender_m.resource.name).toEqual('Masculino');
    }));
  });
});

