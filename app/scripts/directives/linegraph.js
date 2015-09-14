'use strict';

/**
 * @ngdoc directive
 * @name saludWebApp.directive:prueba
 * @description
 * # prueba
 */
angular.module('saludWebApp')
  .directive('linegraph', ['$window', '$timeout','d3Service', function ($window, $timeout,d3Service) {
    return {
      restrict: 'EA',
      link: function postLink(scope, ele, attrs) {
        // Se verifica que el servicio de inyeccion de d3 haya terminado
        d3Service.d3().then(function(d3) {

         // Se evaluan los atributos de la div que contiene el svg
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;
            
          // Se crea el SVG y se lo introduce en <div vgraph>
          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%')
            .style('height', '300px')
	       .append("g")
            .attr("transform", "translate(" + 30 + "," + 20 + ")");

          // Se encarga de la parte responsive de la grafica
          $window.onresize = function() {
            scope.$apply();
          };

          scope.$watch( function() {
            scope.render(scope.data);
          });
          // hasta acá


          // Dibuja la gráfica
          scope.render = function(data) {

            // Elimina todos los elementos en el svg
            svg.selectAll('*').remove();
            

            if (!data) return;

            // Funcion que se encarga de parsear un string con una fecha en  formato iso
            // a date
            var parseDate = d3.time.format.iso.parse;

            // Se preparan los datos que se utilizan para la gráfica
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.value = d.value;
            });

            // 
            var width = d3.select(ele[0])[0][0].offsetWidth - margin,
            height = scope.data.length * (barHeight + barPadding);

            svg.attr('height', height);


            // se delimita el rango de valores para el eje x (la variable x es
            // una función que coloca lo pasado por parametro en una posicion
            // entre 0 y width)
            var x = d3.time.scale()
                .rangeRound([0, width*0.95]);

            // Se establece el dominio de datos para el eje X (se pasan los
            // elementos pertenecientes por ser ordinal)
            var xValues = data.map(function(d) { return d.date; });
            var init = new Date(xValues[0]);
            var end = new Date(xValues[xValues.length - 1]);
            init.setDate(init.getDate()-2);
            end.setDate(end.getDate()+2);
            x.domain([init,end]);

            // se delimita el rango de valores para el eje Y ( la variable y es
            // una función que coloca lo pasado por parametro en una posicion
            // entre 0 y height)
            var y = d3.scale.linear()
                .range([height, 0]);


            // Propiedades del eje X
            var xAxis = d3.svg.axis()
                .scale(x)
//                .tickPadding(10)
      .tickSize(-height, -height)
                .orient("bottom")
                .tickValues(xValues)
                .tickFormat(d3.time.format("%d-%m"));

            // Propiedades del eje Y
            var yAxis = d3.svg.axis()
                .scale(y)
//      .tickSize(0, -width)
//      .tickFormat(function(d) { return ''; })
                .orient("left")
                .ticks(10, "kg");



            // Se establece el dominio de datos para el eje Y (Se pasa el
            // minimo y el maximo por ser lineal)
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            // Se crea un objeto <g>(shape group),se lo introduce en <svg>
            // correspondiente a la información del eje de las X
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)

            // Se crea un objeto <g>(shape group),se lo introduce en <svg>
            // correspondiente a la información del eje de las Y
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            var line = d3.svg.line()
                .x(function(d,i) { return x(d.date);})
                .y(function(d) {return y(d.value);});

            var path = svg.append("path")
                .attr("class", "graph");

            svg.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5)
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.value); })
                .on("mouseover", function(d) { showData(this, d);})
                .on("mouseout", function() { hideData(this);});

            zoomed();

            function showData(dot, it) {
                var coord = d3.mouse(dot);
                var chartTip = d3.select(".tip");
                
                var l=$('#v').offset().left
                var t=$('#v').offset().top
                chartTip.style("left", (coord[0]+l) + "px" );
                chartTip.style("top", (coord[1]+t-20) + "px");
                $(".tip").html(it.value+' kg');
                $(".tip").fadeIn(100);
                
                d3.select(dot)
                    .transition()
                    .duration(200)
                    .attr("r", 10);
            }
            
            function hideData(dot) {
                $(".tip").fadeOut(50);
                
                d3.select(dot)
                    .transition()
                    .duration(100)
                    .attr("r", 5);
            }

            function zoomed() {
                svg.select(".x.axis").call(xAxis);
                svg.select(".y.axis").call(yAxis);
                svg.select(".graph")
                .attr("d", line(data));
                
                svg
                .selectAll("circle")
                .data(data)
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.value); });

            }
          };
        });
      }
    };
  }]);
