'use strict';
/*
 * Application config
 * @Package      Angular
 * @Author       Rajendra yadav
 * @modules      ngAnimate, ngRoute, ngTouch, apiService
 * @Version      1.0.0
 * @Description  Applcation config file to load all required modules, define basic settings ,
 define routing if needed.
 */

var userPortalApp = angular.module('userPortalApp', ['ui.router','ngResource', 'baasboxAPIservice'])
    .constant('version', 'v1.0.0')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        
        // for authenticated routings
        var onlyLoggedIn = function ($location, $q, $rootScope,$state) {
        console.info('Logged in status :: ' + $rootScope.loggedInUser);
            if ($rootScope.loggedInUser ) {
              console.info($rootScope.loggedInUser)  
            } else {
                $state.go('home');
            }

        };
        
        // for non authenticated routings
            var notLoggedIn = function ($location, $q, $rootScope, state) {
                console.info($rootScope.loggedInUser);
                if ($rootScope.loggedInUser) {
                    $state.go('/dashboard');
                } else {
                   
                }


            };
            
        $stateProvider
        .state('login', {
                    url: '/',
                    templateUrl: 'views/login.html',
                    controller : 'authController',
//                    resolve: {loggedIn: notLoggedIn} 
                })
        .state('dashboard', {
                    templateUrl: 'views/dashboard.html',
                    url: '/dashboard',
                    resolve: {loggedIn: onlyLoggedIn}    
                })        
    }) 
    .run(function ($rootScope, $location, $http, $stateParams) {            // Init callback function 
            $rootScope.allowedURLtoPass = false;
            console.info('Application run');
              $rootScope.$on("$stateChangeStart", function (event, next, current) {
                if (next.routeType == 'admin') {
                    $rootScope.isAdmin = true;
                }


            });
            $rootScope.$on("$stateChangeSuccess", function (event, next, current, $stateParams) {


            });

        })