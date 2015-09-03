'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileMeasurementsCtrl
 * @description
 * # ProfileMeasurementsCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileMeasurementsCtrl', function ($scope,$location,$cookies, ProfileMeasurements, ProfileMeasurementsLatest) {
        if(!$cookies.get('profile_id')){
            $location.path('/login');
        }else{
            var data = ProfileMeasurementsLatest.get({id: $cookies.get('profile_id')},function(){
                $scope.measurements=data.resource;
            });   

            $scope.data=[]
                var d = ProfileMeasurements.get({id: $cookies.get('profile_id')},function(){
                    var dr=d.resource
                    var graph=[];
                    for (var i  in dr){
                        if(dr[i].measurement_type.id == '1'){
                            graph[graph.length]={name:dr[i].measurement_type.name,score:dr[i].value}
                        }
                    }
                    $scope.data=graph;
                });   
            /*
            $scope.data = [
                {name: "Greg", score: 98},
                {name: "Ari", score: 96},
                {name: 'Q', score: 75},
                {name: "Loser", score: 48}
            ];
            */
        }

});
