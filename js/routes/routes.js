
portfolioApp.config(['$routeProvider',
              function($routeProvider) {
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
              }]);
