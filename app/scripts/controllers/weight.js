'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:WeightCtrl
 * @description
 * # WeightCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller("WeightCtrl", 
        function (
            $scope,
            $cookies,
            $location, 
            MeasurementType,
            ProfileMeasurements,
            $compile,
            $rootScope) {

                if(!$cookies.get('Token')){                                        
                    $location.path('/login');                                           
                }


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
                            {type: peso_id},
                            function(){

                                // Lista de valores de la gráfica
                                var vList=[];

                                $.each(d.resource,function(i,m){
                                    var fecha = +parseDate(m.datetime)
                                    var valor = m.value

                                    // Se agrega el par { x:fecha, y:valor }
                                    vList.push({ x : fecha, y : valor})
                                    }); // /.each

                                $scope.data = [{
                                    "key" : "Peso (kg)" ,
                                    "bar": true,
                                    "values" : vList 
                                    }];
                                     
                                
                                // Creación del scope de mediciones que será
                                // consumido en la vista por la tabla de
                                // mediciones de un mis tipo.
                                var measurements = d.resource;
                                $scope.measurements=measurements;
                                
                                }

                            );

                    });

            }); 

