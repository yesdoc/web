'use strict';

describe('Controller: ProfileInformationCtrl', function () {

    // load the controller's module
    beforeEach(module('saludWebApp'));
    //Se probará las acciones que se deben realizar cuando no exista una
    //sesión.
    describe('Para una sesión no existente', function () {
        var ProfileInformationCtrl,
            scope,
            location;
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope,$location) { 
            scope = $rootScope.$new();
            location=$location;
            ProfileInformationCtrl = $controller('ProfileInformationCtrl', {
                $scope: scope
            });
        }));
        it('Se debe mantener en el path /login', function () {
            //spyOn(location,'path');
            expect(location.path()).toBe('/login');
        });
    });        
    // Se probará las acciones que se deben realizar cuando exista una sesión
    // activa
    describe('Para una sesión activa', function () {
        var ProfileInformationCtrl,
        scope,
        profile_id,
        $httpBackend,
        location;
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope,$cookies,
                    $injector,$location) {
            scope = $rootScope.$new();
            //Se inicializará la sesión para el usuario con id:1
            profile_id=1;
            $cookies.put('profile_id',profile_id);
            $httpBackend = $injector.get('$httpBackend');
            // specific profile uri
            var uri_m = 'https://yesdoc-api.herokuapp.com/profiles/'+profile_id;
            // p is profile with id:1
            var p = {
                resource: {
                    last_name: "Terreno",
                    first_name: "Milton",
                    gender:{
                        name:"Masculino",
                        description:null,
                        id:1},
                    birthday: "1990-10-26",
                    id:1
                }
            }  
            $httpBackend.whenGET(uri_m).respond(p)

            ProfileInformationCtrl = $controller('ProfileInformationCtrl', {
                $scope: scope,
                $cookies: $cookies
            });
        }));
        it('Se debe definir una variable profile', function () {
            $httpBackend.flush();
            expect(scope.profile).toBeDefined;
        });
        it(('La variable profile debe poseer atributos last_name. first_name,'+
               'gender y birthay'), function () {
            $httpBackend.flush();
            expect(scope.profile.last_name).toBeDefined;
            expect(scope.profile.first_name).toBeDefined;
            expect(scope.profile.gender).toBeDefined;
            expect(scope.profile.birthay).toBeDefined;
        });
    });

});

