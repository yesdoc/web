'use strict';

/**
 *  * @ngdoc directive
 *   * @name saludWebApp.directive:prueba
 *    * @description 
 *     * # prueba
 *      */
angular.module('saludWebApp')

//Directiva que indica el funcionamiento de la etiqueta tabs
.directive('tabs', ['$window', function ($window) {

    return {
        restrict: "E",
        transclude: true,
        scope: {},

        controller: function($scope, $element) {
        
            var panes = $scope.panes = [];

            // Función que determina que mostrar al seleccionar una pestaña
            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                // Llama a una función declarada en la directiva pane
                if (pane.load !== undefined) {
                    pane.load();    
                }
                pane.selected = true;           
            };
            // Función que es llamada desde la directiva pane
            this.addPane = function(pane) {
                if (panes.length === 0){
                    $scope.select(pane);
                }
                panes.push(pane);
            };
        },
        templateUrl:'scripts/directives/directives-views/template-tabs.html',
        replace: true
    };
}])


.directive("pane", ["$http", "$templateCache", "$controller", "$compile",
        function($http, $templateCache, $controller, $compile) {

    return {
        require: "^tabs",
        restrict: "E",
        transclude: true,
        scope: { tabTitle: "@" },
        // Función link que gestiona todos los cambios de la vista  
        link: function(scope, element, attrs, tabsCtrl) {
        
            var templateCtrl, templateScope;
            // Corrobora que existan los atributos en la vista
            if (attrs.template && attrs.controller) {
                
                // Función que determina que mostrar dependiendo de lo que se selecciona,
                // es llamada desde la función `select` de la directiva `tabs`
                scope.load = function() {
                
                    // Recupera el atributo template y lo almacena en cache
                    $http.get(attrs.template, {cache: $templateCache})
                         // Se crea un nuevo entorno para el template recuperado
                        .then(function(response) {
                            templateScope = scope.$new();
                            templateScope.isTabbedPane = true;
                            templateCtrl = $controller(attrs.controller, {$scope: templateScope});
                            element.html(response.data);
                            element.children().data('$ngControllerController', templateCtrl);
                            $compile (element.contents()) (templateScope);
                        }); 
                };
            }
            tabsCtrl.addPane(scope);
        },
        template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
        replace: true
    };
}]);
