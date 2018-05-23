var kwaderno =   angular.module('kwaderno', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'digitalfondue.dftabmenu',
    'webStorageModule',
    'ngTable',
    'localytics.directives',
])

// .factory('sessionExpiredHandler', ['$q', '$injector', function($q, $injector) {
//     var sessionExpiredHandler = {
//         responseError: function(response) {
//             // Check if request status is unauthorized due to token expired
//             if (response.status == 401){
//                 if(response.data.error){
//
//                     if(response.data.error.errorDev.internalCode != "NF5001"){
//                         var state       = $injector.get('$state');
//                         var webStorage  = $injector.get('webStorage');
//                         var windows     = $injector.get('$window');
//
//                         // Remove session data from the browser local storage
//                         if(webStorage.local.has('user-identity'))
//                         webStorage.local.remove('user-identity');
//
//                         // Redirect to login page
//                         if(webStorage.local.has('bookmark-branch')){
//                             windows.location.href = webStorage.local.get('bookmark-branch').url;
//                         }
//                         else{
//                             $state.go('login');
//                         }
//                     }
//                     else{
//                         var prompt = $injector.get('prompt');
//                         setTimeout(function () {
//                             prompt.errors(response.data.error.errorDev.dev);
//                         }, 10);
//                     }
//                 }
//             }
//             return $q.reject(response);
//         }
//     };
//     return sessionExpiredHandler;
// }])
//
// .config(['$httpProvider', function($httpProvider){
//     // push sessionExpiredHandler interceptor to http request to handle session expired
//     $httpProvider.interceptors.push('sessionExpiredHandler');
// }])
