userPortalApp.controller('globalController', ['$scope', '$location', 'baasboxAPIservice', '$q', '$rootScope','$state', '$stateParams', function ($scope, $location, baasboxAPIservice, $q, $rootScope, $state, $stateParams) {
  
  $scope.userPoiList = [];
  $rootScope.editPoiData=[];
  $rootScope.currentUserData = null;
  $rootScope.editUserDetail = {};
  $scope.isloader = false;
  $scope.showMsg = false; 
  
  if (LOCAL_STORAGE_LOGIN_STATUS){
   // $rootScope.currentUserData = JSON.parse($.cookie(BASSBOX_COOKIE));  
    $rootScope.loggedInUser = true; 
    $rootScope.userEmail = LOCAL_STORAGE_USER_EMAIL;
    $rootScope.isUserRole = LOCAL_STORAGE_ROLE;
    $rootScope.userName = LOCAL_STORAGE_USERNAME;
    $rootScope.apikey = LOCAL_STORAGE_APIKEY;
    $rootScope.passkey = LOCAL_STORAGE_PASSKEY;
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
    $scope.isloader = true;  
    var o = {
                "username": $rootScope.userEmail,
                "action" : "removeKey"
            };
    baasboxAPIservice.updateKey(o).then(function(response){
      $rootScope.apikey = 'N/A';
      localStorage.setItem("apiKey", $rootScope.apikey);
      notif({
            msg: ('Key deleted successfully!'),
            type: "success",
            position: "center"
           });
      $scope.isloader = false;
    })
  };       
 
 $scope.generateKey = function(){
     $scope.isloader = true;
     var key = $rootScope.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
     var o = {
                "username": $rootScope.userEmail,
                "apiKey" : key,
                "passKey": $rootScope.passkey,
                "action" : "addKey"
            };
    baasboxAPIservice.updateKey(o).then(function(response){
      $rootScope.apikey = key;
      localStorage.setItem("apiKey", $rootScope.apikey);
      notif({
            msg: ('Key generated successfully!'),
            type: "success",
            position: "center"
           });
      $scope.isloader = false;
      
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
        notif({
          msg: ('POI deleted successfully!'),
          type: "success",
          position: "center"
        });
        })           
    } else {
      notif({
          msg: ('Try again!'),
          type: "error",
          position: "center"
        });  
    }           
 }
 
 $scope.editPoi = function(index, poiId){
    $rootScope.editPoiData = angular.copy($scope.userPoiList[index]);
    console.info($scope.editPoiData);
    //$state.go('editpoi');
    $('#editPoiModel').modal('show');
 }
 
// function roles() {
//        var uri = baasboxAPIservice.adminUri + "role?orderBy=name+asc";
//        baasboxAPIservice.bassBoxDirectAPI(uri, 'get', null)
//                .then(function (roles) {
//                    console.info('test', roles);
//                    if (roles.result == "ok")
//                        $scope.userEditModel.roles = roles.data;
//                    else
//                        $scope.userEditModel.roles = [];
//                });
//    }
//
//
//
//    $rootScope.$watch('currentUserData', function () {
//        if (!$rootScope.currentUserData)
//            return;
//         get user roles from bassbox
//        roles();
//    })
 
 
 $scope.editUser = function(){
   $scope.editUserDetail.fullName = $rootScope.userName;  
   $('#editUser').modal('show');
 } 
 
 $scope.changePassword = function(){
   $('#changePassword').modal('show');
 } 
 
 $scope.updateUser = function(){
  $scope.isloader = true;   
  var o = {
        username: $scope.editUserDetail.fullName,
        email : $rootScope.userEmail,
        action:"updateuser"
      }
  $rootScope.userName = o.username;
  baasboxAPIservice.editUser(o).then(function (response) {
    if (response.result = 'ok') {
        notif({
          msg: ('User name update successfully!'),
          type: "success",
          position: "center"
        });
      $scope.isloader = false;  
      $('#editUser').modal('hide');
    } else {
       notif({
          msg: (response),
          type: "success",
          position: "center"
        });
      $scope.isloader = false;        
      console.log(response);
    }
    });
  }
    
// Update new password method
    $scope.submitChangePassword = function () {
        var put = {
            password: $scope.editUserDetail.password
        }
        var uri = "/admin/user/" + $rootScope.userName + "/password";
        //console.info(uri); return;
        baasboxAPIservice.bassBoxDirectAPI(uri, 'PUT', put)
                .then(function (response) {
                    console.info(response);
                    if (response.result == 'ok')
                    {
                     $scope.editUserDetail.password = '';
                     $('#changePassword').modal('hide');
                    }
                })
    } 
  }]);