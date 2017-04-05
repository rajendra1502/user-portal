userPortalApp.controller('globalController', ['$scope', '$location', 'baasboxAPIservice', '$q', '$rootScope','$state', '$stateParams', function ($scope, $location, baasboxAPIservice, $q, $rootScope, $state, $stateParams) {
  
  $scope.userPoiList = [];
  $scope.updateFormPoi;
  
  if (LOCAL_STORAGE_LOGIN_STATUS){
    $rootScope.loggedInUser = true; 
    $rootScope.userEmail = LOCAL_STORAGE_USER_EMAIL;
    $rootScope.isUserRole = LOCAL_STORAGE_ROLE;
    $rootScope.userName = LOCAL_STORAGE_USERNAME;
    $rootScope.apikey = LOCAL_STORAGE_APIKEY;
  }   
 // Generate key
  $rootScope.randomString = function(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
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
    var o = {
                "username": $rootScope.userEmail,
                "action" : "removeKey"
            };
    baasboxAPIservice.updateKey(o).then(function(response){
      $rootScope.apikey = 'N/A';
      localStorage.setItem("apiKey", $rootScope.apikey);
    })
  };       
 
 $scope.generateKey = function(){
     var key = $rootScope.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
     var o = {
                "username": $rootScope.userEmail,
                "apiKey" : key,
                "action" : "addKey"
            };
    baasboxAPIservice.updateKey(o).then(function(response){
      $rootScope.apikey = key;
      localStorage.setItem("apiKey", $rootScope.apikey);
    })
 } 
 $scope.userPoi = function(){
     var userPoiQuery = "where= _author = '"+ $rootScope.userEmail +"'&orderBy=_creation_date+desc";
     console.info(userPoiQuery);
     baasboxAPIservice.getPoiDataQuery(userPoiQuery).then(function (response) {
        if (response.result == 'ok') {
             $scope.userPoiList = response.data;
        } else {
            bassBoxError(response);
        }
    });
 }
 $scope.deletePoi = function(index, poiId){
  var cnfrm = confirm('Are you sure want to remove POI!');
  if(cnfrm == true){
  var content = {
                poiId: poiId,
                isdelete:true
                };
     $scope.userPoiList.splice(index, 1);            
     baasboxAPIservice.deletePoi(content).then(function (response) {
        console.info(response);
        alert('POI deleted successfully!');
        })           
    } else {
      alert('Do not delete!');   
    }           
 }
 $scope.editPoi = function(index, poiId){
    $scope.editPoiData = angular.copy($scope.userPoiList[index]);
    console.info($scope.editPoiData);
    $state.go('editpoi');
    //alert(poiId+'-'+index);  
 }
 
}]);