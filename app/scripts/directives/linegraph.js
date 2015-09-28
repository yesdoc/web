'use strict';

/**
 * @ngdoc directive
 * @name saludWebApp.directive:prueba
 * @description
 * # prueba
 */
angular.module('saludWebApp')
  .directive('linegraph', ['$window', '$timeout', function ($window, $timeout,d3Service) {
    return {
      restrict: 'EA',
      link: function postLink(scope, ele, attrs) {
        // Se verifica que el servicio de inyeccion de d3 haya terminado
        //d3Service.d3().then(function(d3) {

          // Se encarga de la parte responsive de la grafica
          $window.onresize = function() {
            scope.$apply();
          };

          scope.$watch( function() {
              scope.render(scope.data);
          });

          // Dibuja la gráfica
          scope.render = function(data) {

            nv.addGraph(function() {
              var chart = nv.models.lineWithFocusChart()
                .height(ele[0].offsetHeight)//Obtenemosla altura de la div contenedora
                .interactive(true)
                .showVoronoi(true)
                .clipRadius(function (d) {
                  return 20; //Voronoi circle radio
                  });

              //chart.padData(true);
              chart.xTickFormat(function(d) {return d3.time.format('%d-%m')(new Date(d))});

              chart.xAxis
                .showMaxMin(false);    

              chart.x2Axis
                .showMaxMin(false);    

              chart.yAxis
                .tickFormat(d3.format(',.2f'));

              chart.y2Axis
                .showMaxMin(false);    
                //.tickFormat(d3.format(',.2f'));

              d3.select('#chart svg')
                .datum(data)
                .transition().duration(500)
                .call(chart);

              nv.utils.windowResize(chart.update);

              return chart;
            });

          } 

      }

    };

  }]);
