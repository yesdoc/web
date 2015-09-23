'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileMeasurementsCtrl
 * @description
 * # ProfileMeasurementsCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller(
      'ProfileMeasurementsCtrl',
      function (
        $scope,
        $location,
        $cookies,
        MeasurementType,
        ProfileMeasurements,
        ProfileMeasurementsLatest) {

    if(!$cookies.get('profile_id')){
        $location.path('/login');
    }else{

        // Se traen y muestran las ultimas mediciones de un perfil
        var data = ProfileMeasurementsLatest.get(
            {id: $cookies.get('profile_id')},
            function(){
          $scope.measurements=data.resource;
        });   

        

        
        // ###################### Gráficas ####################################
        
        
        // variable que contiene los datos a mostrar por la grafica
        $scope.data=[]

        // mts : MeasurmentTypes
        var mts = MeasurementType.query( function(){

          mts = mts.resource;

          var peso_id;

          $.each(mts,function (i,mt){
            if (mt.name.toLowerCase() == "peso"){
              peso_id = mt.id;
              return;
            }
          });

          // función auxiliar para convertir de string a date
          var parseDate = d3.time.format.iso.parse;
        
          var d = ProfileMeasurements.get(
              {id: $cookies.get('profile_id'),type: peso_id},
              function(){

            // Lista de valores de la gráfica
            var vList=[];

            $.each(d.resource,function(i,m){

              var fecha = +parseDate(m.datetime)
              var valor = m.value

              // Se agrega el par { x:fecha, y:valor }
              vList.push({ x : fecha, y : valor})

            });

            $scope.data = [{
                  "key" : "Peso (kg)" ,
                  "bar": true,
                  "values" : vList }];
          });

        });

    }

});
