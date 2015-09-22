'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileMeasurementsCtrl
 * @description
 * # ProfileMeasurementsCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileMeasurementsCtrl', function ($scope, $location, $cookies, ProfileMeasurements, ProfileMeasurementsLatest) {
    if(!$cookies.get('profile_id')){
        $location.path('/login');
    }else{
        // Se traen y muestran las ultimas mediciones de un perfil
        var data = ProfileMeasurementsLatest.get({id: $cookies.get('profile_id')},function(){
            $scope.measurements=data.resource;
        });   

        // variable que contiene los datos a mostrar por la grafica
        $scope.data=[]

          var getPeso = function(){
            /* funcion auxiliar para obtener el peso de un perfil, en particular, 
             * en el futuro será reemplazado por un recurso
             */
            var graph=[];
            var d = ProfileMeasurements.get({id: $cookies.get('profile_id')},function(){
              var dr=d.resource
                for (var i  in dr){
                  //se evalua que el id de la medicion obtenida sea 1 (id del peso)
                  if(dr[i].measurement_type.id == '1'){
                    //cada barra horizontal tiene un peso que se guarda en
                    //la clave "score" y un nombre que se guarda en la
                    //clave "name".Ej {name:'peso',score'56'}
                    graph.push({ x : +parseDate(dr[i].datetime), y : dr[i].value})
                  }
                }
            });
            return [{
                "key" : "Peso (kg)" ,
                "bar": true,
                "values" : graph }];
          }
       // alert(nv.models.lineWithFocusChart().width( 200 ));
        $scope.data = getPeso();

        var parseDate = d3.time.format.iso.parse;
    }

});
