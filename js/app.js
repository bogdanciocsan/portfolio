var myApp = angular.module('myApp',['wu.masonry','ngResource', 'ngRoute', 'ngDialog']);

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

myApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
    };
});

myApp.config(['$routeProvider',
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

myApp.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]).filter("fixhtml", function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});
myApp.controller('WebCtrl', ['$scope', '$window', '$rootScope', function($scope, $window, $rootScope) {
    $rootScope.showPhotos = false;
    $scope.sendMail = function() {
        $window.location = "mailto:design@bogdanciocsan.com?subject=Portfolio request";
    }
}]);
myApp.controller('PhotosCtrl', ['$scope', '$rootScope','ngDialog', function($scope, $rootScope, ngDialog) {
    $rootScope.showPhotos = true;

    $scope.openPhoto = function(url, title) {
        var templateString = "<div class='row'>"+ 
                      "<div class='col-sm-12'>" +
                      "<h3 class='dialog-title'>" + title + "</h3>" +
                      "<img class='img-responsive' src='" + url + "' alt='large' />"
                      "</div>"+
                      "</div>";
        ngDialog.open({
            template: templateString,
            plain: true
        });
    };

    $scope.photoOptions = { 
        'transitionDuration': 0, 
        'gutter': 20, 
        'itemSelector': '.grid-sizer',
        'originLeft': false,
        'originTop': true
    };

}]);

myApp.controller('MyCtrl', ['$scope','$http',function($scope, $http) {
    angular.element(document).ready(function () {
        $scope.url = 'http://backend.deviantart.com/rss.xml?q=gallery:seraphro/57657023';
        $http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent($scope.url)).success(function(res) {
            if (res.responseData.feed) {
                var entries = res.responseData.feed.entries;
                $scope.galleries = [];
                if(entries.length > 0) {
                    for (var i=0; i < entries.length; i++) {
                        var media = entries[i].mediaGroups; 
                        //                        console.log(entries[i]);
                        if (media.length > 0) { 
                            if (media[0].contents[0]) {
                                if (media[0].contents.length > 0) {
                                    var orgArray = media[0].contents[0];
                                    orgArray.devUrl = entries[i].link;
                                    orgArray.devDate = new Date(entries[i].publishedDate);
                                    orgArray.devText = entries[i].content;
                                    $scope.galleries.push(orgArray);
                                }
                            }
                        }
                    }
                }

            }
        });
    });
}]);