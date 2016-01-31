
portfolioApp.config(['$routeProvider','$locationProvider',
                     function($routeProvider, $locationProvider) {
                         $routeProvider.
                         when('/web', {
                             templateUrl: 'views/web.html',
                             controller: 'WebCtrl'
                         }).
                         when('/photos', {
                             templateUrl: 'views/photos.html',
                             controller: 'PhotosCtrl'
                         }).
                         otherwise({
                             redirectTo: '/web'
                         });
                         $locationProvider.html5Mode(true);

                         $locationProvider.hashPrefix('!');
                     }]);
