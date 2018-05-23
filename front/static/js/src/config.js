kwaderno
    .constant('constant', {
        whitelist_state :   ['login'],                     // routes to ignore session checking
    })
    .run(function($rootScope, $state, webStorage, constant, userSession) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            // $rootScope.action   =   webStorage.local.get("user-view");
            // $rootScope.loggedInName = webStorage.local.get("user-info").fullname;
        });

    })

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/index");

        $stateProvider

        .state('index', {
            url: '/index',
            templateUrl: 'views/login.html',
            title: "WELCOME",
        })

        .state("poem", {
            url: "/poem",
            templateUrl: "views/partials/common.html",
            title: "BIDDING",
            onEnter: function(webStorage, $state) {
                // if (!webStorage.local.has('user-view')) {
                //     $state.go('index');
                // }
            }
        })

        .state("poem.wall", {
            url: "/wall",
            templateUrl: "views/layout/wall.html",
            resolve : {
                role : function($q){
                    var deferred = $q.defer();
                    setTimeout(function () {
                        deferred.resolve()
                    }, 100);
                    return deferred.promise;
                },
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load ([
                        {
                            name: 'css',
                            insertBefore: '#app-level',
                            files: [
                                '/static/css/sidebar.min.css',
                                '/static/css/material-dashboard.min.css',
                            ]
                        
                        }
                    ])
                }
            }
        })

        .state("poem.news", {
            url: "/news",
            templateUrl: "views/layout/news.html",
            resolve : {
                role : function($q){
                    var deferred = $q.defer();
                    setTimeout(function () {
                        deferred.resolve()
                    }, 100);
                    return deferred.promise;
                },
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load ([
                        {
                            name: 'css',
                            insertBefore: '#app-level',
                            files: [
                                '/static/css/sidebar.min.css',
                                '/static/css/material-dashboard.min.css',
                            ]
                        
                        }
                    ])
                }
            }
        })

        .state("poem.profile", {
            url: "/profile",
            templateUrl: "views/layout/profile.html",
            resolve : {
                role : function($q){
                    var deferred = $q.defer();
                    setTimeout(function () {
                        deferred.resolve()
                    }, 100);
                    return deferred.promise;
                },
            }
        })
    }]);
