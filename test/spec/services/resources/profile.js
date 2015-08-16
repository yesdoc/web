'use strict';

describe('Service: profile', function () {

  // load the service's module
  beforeEach(module('saludWebApp'));

  // instantiate service
  var $httpBackend;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    // profiles uri
    var uri_profiles = 'https://yesdoc-api.herokuapp.com/profiles';

    // all profiles
    var profiles = {
        resource: [{
            last_name: "Mora",
            first_name: "Yanina",
            gender:{
                name: "Femenino",
                description: null,
                id: 2},
            birthday: "1990-09-21",
            id: 2
        }]
    }

    $httpBackend.whenGET(uri_profiles).respond(profiles)

    //  specific profile uri
    var uri_m = 'https://yesdoc-api.herokuapp.com/profiles/2';

    // specific profile
    var profile_m = {resource:profiles.resource[0]};

    $httpBackend.whenGET(uri_m).respond(profile_m)

  }));

  describe('Profile#query', function() {
    it('Request for all elements to Mock API and returns a JSON', inject(function(Profile) {
        var profiles = Profile.query();
        $httpBackend.flush();
        expect(profiles.resource[0].id).toEqual(2);
    }));
  });

  describe('Profile#get', function() {
    it('Request for id 2 to mock API and returns a JSON', inject(function(Profile) {
        var profile_m = Profile.get({id:'2'});
        $httpBackend.flush();
        expect(profile_m.resource.last_name).toEqual('Mora');
    }));
  });
});

