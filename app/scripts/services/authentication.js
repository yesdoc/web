'use strict';

/**
 * @ngdoc service
 * @name saludWebApp.Authentication
 * @description
 * # Authentication
 * Factory in the saludWebApp.
 */
angular.module('saludWebApp')
  .factory('Auth',
          function ($http, $cookies, $rootScope, global, $location) {
    

    /*
     * Recurso encargado de generar la codificación en Base 64.
     */
    var Base64 = {
 
            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

            /*
             * Funcion para codificar un String en base 64.
             */
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

                }, // /.encode

            }; // /.Base64
    

    /*
     * Solicita a la API el token correspondiente a user:pass, se lo almacena
     * en las cookies y se agrega el campo 'authorization' al resto de las
     * peticiones a la API. 
     */
    function getToken(user, pass){
            
        // Codificamos en base 64 el 'user':'pass'
        var authdata = Base64.encode(user + ':' + pass);

        // Lo guardamos en las cookies
        setCookie(authdata);

        // Traemos el token de la API, lo codificamos en base 64, y pisamos el token anterior de las cookies
        $http.get(global.getApiUrl() + '/token')
          .success(function(data, status, headers, config) {
              var authdata = data.resource.token;
              setCookie(Base64.encode(authdata + ':'));
          });

        } // /.getToken 


    /* 
     * Prepara authdata para usarlo como token y lo guarda en las cookies,
     * además se agrega a todas las peticiones a la API 'Authorization:<token>'
     */
    function setCookie(authdata){
        var token = ' Basic ' + authdata;
        $cookies.put('Token',token);
        $http.defaults.headers.common['Authorization'] = token;
        return token;
    }


    /*
     * Valida si las cookies estan seteadas y agrega a todas las peticiones a
     * la API 'Authorization:<token>' 
     */
    function isLogged(redirect){
        var token = $cookies.get('Token');
        $http.defaults.headers.common['Authorization'] = token;
        $http.get(global.getApiUrl() + '/token')
          .success(function(data, status, headers, config) {
            $rootScope.$emit('isLoggedEvent', [true]);
          }).error(function(data, status, headers, config) {
            if (status=='401'){
              $rootScope.$emit('isLoggedEvent', [false]);
              if (redirect) $location.path('/login');
            }
          });
      }

    function getAuth(callback){
        $http.get(global.getApiUrl() + '/token')
          .success(function(data, status, headers, config) {
            callback(data.resource.token);
          });
    }
    
    /*
     *  Funciones públicas. 
     */
    return {
        login: function(user,pass){
          getToken(user, pass);
          }, // /.authentication()
        getAuth: function(callback){
          getAuth(callback);
          }, 
        isLoggedNR: function(user,pass){//is logged not redirection
          isLogged(false);
          }, // /.authentication()
        isLogged: function(){
          isLogged(true);
          }
        } // /.return


    });
