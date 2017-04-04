userPortalApp.controller('globalController', ['$scope', '$location', 'baasboxAPIservice', '$q', '$rootScope','$state', '$stateParams', function ($scope, $location, baasboxAPIservice, $q, $rootScope, $state, $stateParams) {
  
  if (LOCAL_STORAGE_LOGIN_STATUS){
    $rootScope.loggedInUser = true; 
    $rootScope.userEmail = LOCAL_STORAGE_USER_EMAIL;
    $rootScope.isUserRole = LOCAL_STORAGE_ROLE;
    $rootScope.userName = LOCAL_STORAGE_USERNAME;
    $rootScope.apikey = LOCAL_STORAGE_APIKEY;
  }   
  
$scope.logout = function () {
        console.info('logout function');
        localStorage.clear();
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
        localStorage.clear();
 }
 
         //Watcher to check login
        $rootScope.$watch('loggedInUser', function () {
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
        
  $scope.deleteKey = function(){
    console.log($rootScope.userEmail);
    var o = {
                "username": $rootScope.userEmail,
                "action" : "removeKey"
            };
    baasboxAPIservice.removeKey(o).then(function(response){
      console.info(response);  
    })
  };       
 
}]);