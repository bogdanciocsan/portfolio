
portfolioApp.controller('WebCtrl', ['$scope', '$window', '$rootScope', function($scope, $window, $rootScope) {
    $rootScope.state = 'web';
    $scope.sendMail = function() {
        $window.location = "mailto:design@bogdanciocsan.com?subject=Portfolio request";
    }
}]).controller('PhotosCtrl', ['$scope', '$rootScope','ngDialog', function($scope, $rootScope, ngDialog) {
    $rootScope.state = 'photos';

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

}]).controller('MyCtrl', ['$scope','$http',function($scope, $http) {
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
}]).controller('BlogCtrl',['$scope','$http','$rootScope', function($scope, $http,$rootScope) {
    $rootScope.state = 'blog';
    $http.get('http://bogdan.dk/wp-blog/cms/wp-json/wp/v2/posts').then(function(res) {
        console.log(res); 
        if(res) {
            $scope.blogposts = res.data;
        }
    }, function(err) {
        console.log(err);
    });   
}]).controller('BlogSingleCtrl',['$scope','$http','$rootScope','$routeParams', function($scope, $http,$rootScope, $routeParams) {
    $rootScope.state = 'blog';
    
    $scope.postURL = 'http://bogdan.dk/wp-blog/cms/wp-json/wp/v2/posts?slug=' + $routeParams.id;
    $http.get($scope.postURL).then(function(res) {
        console.log(res); 
        if(res) {
            $scope.post = res.data[0];
            
            setTimeout(prettyPrint,100);
        }
    }, function(err) {
        console.log(err);
    });   
}]);