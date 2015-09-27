'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.Authentication
 * @description
 * # Authentication
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Authentication', ['$http', '$cookies', '$rootScope', 'global',
          function ($http, $cookies, $rootScope, global) {
    

    // Codifico en base 64 el header que le paso al recurso del token.
    var Base64 = {

            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this.keyStr.charAt(enc1) +
                        this.keyStr.charAt(enc2) +
                        this.keyStr.charAt(enc3) +
                        this.keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);
    
                return output;

                } // /.encode
            }; // /.Base64
    

    // Solicita al recurso de la API el token correspondiente al usuario y
    // contraseña ingresado.
    function getToken(user, pass){
            
        alert('service: '+ user);
        var authdata = Base64.encode(user + ':' + pass);

        $rootScope.globals = {
            currentUser:{
                username: user,
                password: pass
            }
        };




                        
        // Envia en el header el usuario y la contraseña
        // ¿Uso el mismo para pasar el token y solicitar los datos de un
        // perfil???
        $http.defaults.headers.common['Authorization'] = ' Basic ' + authdata;

        
        // Traigo del recurso el token
        $http.get(global.getApiUrl() + '/token', { username: user, password: pass })
            .success(function (response) {
                alert('robin');
                callback(response);
            });


        // Guardo en las cookies el user y el pass o el token?????
        $cookies.put('globals',$rootScope.globals);
        alert('lalala'+$rootScope.globals.currentUser.username);


        } // /.getToken 
    
    
    // Función que solicita y almacena el token.
    return {
        authentication: function(user, pass) {

            getToken(user, pass);
            var token = 'hola';
            return token;

            } // /.authentication()
        } // /.return


    }]);
