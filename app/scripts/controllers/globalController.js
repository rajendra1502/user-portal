userPortalApp.controller('globalController', ['$scope', '$location', 'baasboxAPIservice', '$q', '$rootScope','$state', '$stateParams', function ($scope, $location, baasboxAPIservice, $q, $rootScope, $state, $stateParams) {
        
$scope.logout = function () {
        console.info('logout function');
        BaasBox.logout()
            .done(function (res) {
                console.log(res);
                $location.path('/');
            })
            .fail(function (error) {
                console.log("error ", error);
            })
        $rootScope.loggedInUser = false;    
        $.removeCookie(BASSBOX_COOKIE);
 }
 
         //Watcher to check login
        $rootScope.$watch('loggedInUser', function () {
            if ($stateParams.sceneID) {
                setLocalStorage("sharedurlPanoID", $stateParams.sceneID);
            }
            if ($rootScope.loggedInUser == undefined) {
                return;
                //show landing page
            } else if ($rootScope.loggedInUser == true) {

//                  $location.path('/home');
            } else {
                if ($rootScope.allowedURLtoPass) {

                } else {
                    $location.path('/');
                }

            }
        });
 
}]);