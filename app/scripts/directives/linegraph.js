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
          var margin = {top: 20, right: 20, bottom: 30, left: 40};
 
          // Se crea el SVG y se lo introduce en <div vgraph>
          var svg = d3.select(ele[0])
            .append('svg');

          // Se encarga de la parte responsive de la grafica
          $window.onresize = function() {
            scope.$apply();
          };

          scope.$watch( function() {
            scope.render(scope.data);
          });
          // hasta acá


          var svgWidth = d3.select(ele[0])[0][0].offsetWidth,
          svgHeight = 300 ;

          svg
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


          // Dibuja la gráfica
          scope.render = function(data) {
            
            var chartWidth = svgWidth-margin.left-margin.right,
              chartHeight = svgHeight-margin.top-margin.bottom ;

            // Funcion que se encarga de parsear un string con una fecha en  formato iso
            // a date
            var parseDate = d3.time.format.iso.parse;


            // Elimina todos los elementos en el svg
            svg.selectAll('*').remove();
            
            // Si no hay datos, break!
            if (!data){ 
              return;
            }

            // Se preparan los datos que se utilizan para la gráfica
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.value = d.value;
            });


            // se delimita el rango de valores para el eje x (la variable x es
            // una función que coloca lo pasado por parametro en una posicion
            // entre 0 y width)
            var x = d3.time.scale()
                .rangeRound([0, chartWidth]);

            // Se establece el dominio de datos para el eje X (se pasan los
            // elementos pertenecientes por ser ordinal)
            var xValues = data.map(function(d) { return d.date; });
            var init = new Date(xValues[0]);
            var end = new Date(xValues[xValues.length - 1]);
            
            init.setDate(init.getDate());
            end.setDate(end.getDate());
            x.domain([init,end]);

            // se delimita el rango de valores para el eje Y ( la variable y es
            // una función que coloca lo pasado por parametro en una posicion
            // entre 0 y height)
            var y = d3.scale.linear()
                .range([chartHeight, 0]);

            // Propiedades del eje X ;TODO: CAMBIAR FORMATO DE FECHA SEGUN LA
            // DISTANCIA ENTRE LA PRIMER FECHA Y LA ULTIMA
            var xAxis = d3.svg.axis()
                .scale(x)
                .tickPadding(10)
                //.tickSize(-height, -height) // linea vertical
                .orient('bottom')
                .tickValues(xValues)
                .tickFormat(d3.time.format('%d-%m'));

            // Propiedades del eje Y
            var yAxis = d3.svg.axis()
                .scale(y)
                //.tickSize(-width, -width) // Linea horizontal
                .orient('left')
                .ticks(10, 'kg');



            // Se establece el dominio de datos para el eje Y (Se pasa el
            // minimo y el maximo por ser lineal)
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            // Se crea un objeto <g>(shape group),se lo introduce en <svg>
            // correspondiente a la información del eje de las X
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + (chartHeight) + ')')
                .call(xAxis);

            // Se crea un objeto <g>(shape group),se lo introduce en <svg>
            // correspondiente a la información del eje de las Y
            svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis);

            var line = d3.svg.line()
              .x(function(d) { return x(d.date);})
              .y(function(d) {return y(d.value);});

            svg.append('path')
              .attr('class', 'graph');

            svg.selectAll('circle')
              .data(data)
              .enter().append('circle')
                .attr('class', 'dot')
                .attr('r', 5)
                .attr('cx', function(d) { return x(d.date); })
                .attr('cy', function(d) { return y(d.value); })
                .on('mouseover', function(d) { showData(this, d);})
                .on('mouseout', function() { hideData(this);});

            svg.select('.graph')
            .attr('d', line(data));
                

            function showData(dot, it) {
              var coord = d3.mouse(dot);
              var chartTip = d3.select('.tip');

              var l=$('#v').offset().left
                var t=$('#v').offset().top
                chartTip.style('left', (coord[0]+l) + 'px' );
              chartTip.style('top', (coord[1]+t-20) + 'px');
              $('.tip').html(it.value+' kg');
              $('.tip').fadeIn(100);

              d3.select(dot)
                .transition()
                .duration(200)
                .attr('r', 10);
            }
            
            function hideData(dot) {
              $('.tip').fadeOut(50);

              d3.select(dot)
                .transition()
                .duration(100)
                .attr('r', 5);
            }

          };

        });

      }

    };

  }]);
