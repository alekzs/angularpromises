var promises = angular.module('promises', []);

promises.factory('Providers', ['$http', '$q', '$timeout', function($http, $q, $timeout) {
    var index = 0;
    var providerService = {
        simpleDataProvider: $q.defer(),
        loadData: function() {
            $timeout(function() {
                index++;
                providerService.simpleDataProvider.notify({
                    number: index
                });
            }, 10);
            return providerService.simpleDataProvider;
        }
    };
    return providerService;
}]);

promises.directive('simpleComponentOne', ['Providers', function(Providers) {
    return {
        restrict: 'E',
        replace: true,
        controllerAs: 'vm',
        controller: ['$scope', function($scope) {
            var vm = this;
            var internal = {
                init: function() {
                    Providers.simpleDataProvider.promise.then(null, null, internal.onUpdate);
                },
                onUpdate: function(data) {
                    console.log('resolved 1');
                    vm.specialNumber = data.number;
                }
            };

            internal.init();
        }],
        templateUrl: 'templates/simple-component-one.html'
    }
}]);

promises.directive('simpleComponentTwo', ['Providers', function(Providers) {
    return {
        restrict: 'E',
        replace: true,
        controllerAs: 'vm',
        controller: ['$scope', function($scope) {
            var vm = this;
            var internal = {
                init: function() {
                    Providers.simpleDataProvider.promise.then(null, null, internal.onUpdate);
                },
                onUpdate: function(data) {
                    console.log('resolved 2');
                    vm.specialNumber = data.number;
                }
            };

            internal.init();
        }],
        templateUrl: 'templates/simple-component-two.html'
    }
}]);

promises.directive('simpleComponentThree', ['Providers', function(Providers) {
    return {
        restrict: 'E',
        replace: true,
        controllerAs: 'vm',
        controller: ['$scope', function($scope) {
            var vm = this;
            var internal = {
                init: function() {
                    Providers.simpleDataProvider.promise.then(null, null, internal.onUpdate);
                },
                onUpdate: function(data) {
                    console.log('resolved 3');
                    vm.specialNumber = data.number;
                }
            };

            vm.loadData = function() {
                Providers.loadData();
            };

            internal.init();
        }],
        templateUrl: 'templates/simple-component-three.html'
    }
}]);