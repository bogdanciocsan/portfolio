
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
                         when("/blog", {
                            templateUrl: 'views/blog.html',
                             controller: 'BlogCtrl' 
                         })
                         .when("/blog/posts/:id", {
                             templateUrl: 'views/single-blog.html',
                             controller: 'BlogSingleCtrl'
                         })
                         .otherwise({
                             redirectTo: '/web'
                         });
                         $locationProvider.html5Mode(true);

                         $locationProvider.hashPrefix('!');
                     }]);
