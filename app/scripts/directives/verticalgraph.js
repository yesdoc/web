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
        

         // Se evaluan los atributos de la div que contiene el svg
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;
            
          // Se crea el SVG y se lo introduce en <div vgraph>
          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%')
            .style('height', '300px')
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
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            // se delimita el rango de valores para el eje Y ( la variable y es
            // una función que coloca lo pasado por parametro en una posicion
            // entre 0 y height)
            var y = d3.scale.linear()
                .range([height, 0]);


            // Propiedades del eje X
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat(d3.time.format("%d-%m-%Y"));

            // Propiedades del eje Y
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10, "kg");


            // Se establece el dominio de datos para el eje X (se pasan los
            // elementos pertenecientes por ser ordinal)
            x.domain(data.map(function(d) { return d.date; }));

            // Se establece el dominio de datos para el eje Y (Se pasa el
            // minimo y el maximo por ser lineal)
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            // Se crea un objeto <g>(shape group),se lo introduce en <svg>
            // correspondiente a la información del eje de las X
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" );

            // Se crea un objeto <g>(shape group),se lo introduce en <svg>
            // correspondiente a la información del eje de las Y
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Peso Kg");

            // Se crean las barras verticales y se las posiciona
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.date); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); });

          };
        });
      }
    };
  }]);
