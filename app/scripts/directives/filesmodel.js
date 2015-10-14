'use strict';

/**
 * @ngdoc directive
 * @name saludWebApp.directive:fileDrag
 * @description
 * # fileDrag
 */
angular.module('saludWebApp')
.directive('filesModel',function (){
  return {
    controller: function($parse, $element, $attrs, $scope){
      var exp = $parse($attrs.filesModel);

      $element.on('change', function(evt){
        var files = evt.target.files;
        console.log(files[0].name);
        console.log(files[0].size);

        $scope.aFile.description = files[0].name
        $scope.aFile.real_name = files[0].name

        exp.assign($scope, this.files);

        $scope.$apply();

        $scope.getFile();
      });
    }
  };
});


