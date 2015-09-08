'use strict';

/**
 * @ngdoc directive
 * @name saludWebApp.directive:prueba
 * @description
 * # prueba
 */
angular.module('saludWebApp')
  .directive('vgraph', ['$window', '$timeout','d3Service', function ($window, $timeout,d3Service) {
    return {
      restrict: 'EA',
      link: function postLink(scope, ele, attrs) {
        // Se verifica que el servicio de inyeccion de d3 haya terminado
        d3Service.d3().then(function(d3) {

          var renderTimeout;
        

         //Se evaluan los atributos del div que contiene el svg
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%')
            .style('height', '300px')
            .append("g")
            .attr("transform", "translate(" + 30 + "," + 20 + ")");

          $window.onresize = function() {
            scope.$apply();
          };
            
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
           
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);

          scope.render = function(data) {

            svg.selectAll('*').remove();

            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);


            renderTimeout = $timeout(function() {
                var parseDate = d3.time.format.iso.parse;
                
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.value = d.value;

                });

              var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                  height = scope.data.length * (barHeight + barPadding);

              svg.attr('height', height);


              var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width], .1);

              var y = d3.scale.linear()
                  .range([height, 0]);

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom")
                  .tickFormat(d3.time.format("%d-%m-%Y"));

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .ticks(10, "kg");


              x.domain(data.map(function(d) { return d.date; }));

              y.domain([0, d3.max(data, function(d) { return d.value; })]);

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                .selectAll("text")
                  .style("text-anchor", "end")
                  .attr("dx", "-.8em")
                  .attr("dy", "-.55em")
                  .attr("transform", "rotate(-45)" );

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Peso Kg");

              svg.selectAll(".bar")
                  .data(data)
                  .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) { return x(d.date); })
                  .attr("width", x.rangeBand())
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return height - y(d.value); });


/*
                  .attr('fill', function(d) {
                    return color(d.value);
                  })
                  .transition()
                    .duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.value);
                    });
 */
            }, 200);
          };
        });
      }
    };
  }]);
