'use strict';
userPortalApp.controller('authController', function ($scope, $http, baasboxAPIservice, $location, $rootScope) {
  
  $scope.isInvalid = false;
  $scope.showMsgSignup = false;
  $scope.formData = {};
  $rootScope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
// Login   
  $scope.userSignIn = function(){
  if($scope.signin.$valid){
   baasboxAPIservice.checkAuth($scope.formData.email, $scope.formData.password).then(function (response) {
    console.info('resp',response);   
    if(response.http_code !== 401){
    $rootScope.currentUserData = response;    
    localStorage.setItem("logged_in_status", true);
    $rootScope.loggedInUser = true;
    $rootScope.userEmail = response.username;
    $rootScope.isUserRole = response.roles[0];
    $rootScope.userName = response.visibleByTheUser['full_name'] ? response.visibleByTheUser['full_name'] : 'User';
    $rootScope.apikey = response.visibleByAnonymousUsers['authKey'] ? response.visibleByAnonymousUsers['authKey'] : 'N/A';
    $rootScope.passkey = response.visibleByAnonymousUsers['passKey'] ? response.visibleByAnonymousUsers['passKey'] : 'N/A';
    localStorage.setItem("userName", $rootScope.userName);
    localStorage.setItem("userEmail", $rootScope.userEmail);
    localStorage.setItem("apiKey", $rootScope.apikey);
    localStorage.setItem("passKey", $rootScope.passkey);
    localStorage.setItem("role", $rootScope.isUserRole);
    $scope.isInvalid = false;
    $location.path('/dashboard');
    } else {
    $scope.isInvalid = true;    
    console.info('Invalid user name or password !');          
    }  
   })
  }else{  
   $scope.showMsg = true;   
   console.info('Not validate');    
  } 
  }
 
  
// Registration
  $scope.userSignUp = function(){
    console.info('signup');  
   if($scope.signup.$valid){
       var key = $rootScope.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
       baasboxAPIservice.signUp($scope.formData.email, $scope.formData.spassword, $scope.formData.userName, key).then(function(response){
        if (response.result != "error") {
        localStorage.setItem("logged_in_status", true);
        $rootScope.currentUserData = response;  
        $rootScope.loggedInUser = true;
        $rootScope.userEmail = response.username;
        $rootScope.isUserRole = response.roles[0];
        $rootScope.userName = response.visibleByTheUser['full_name'] ? response.visibleByTheUser['full_name'] : 'User';
        $rootScope.apikey = response.visibleByAnonymousUsers['authKey'] ? response.visibleByAnonymousUsers['authKey'] : 'N/A';
        $rootScope.passkey = response.visibleByAnonymousUsers['passKey'] ? response.visibleByAnonymousUsers['passKey'] : 'N/A';
        localStorage.setItem("userName", $rootScope.userName);
        localStorage.setItem("userEmail", $rootScope.userEmail);
        localStorage.setItem("apiKey", $rootScope.apikey);
        localStorage.setItem("passKey", $rootScope.passkey);
        localStorage.setItem("role", $rootScope.isUserRole);
        $location.path('/dashboard');
       } else {
        $scope.signuperror = response.message;
        console.info($scope.signuperror);
       }
       })
   } else {
      $scope.showMsgSignup = true;
      console.info('not valid'); 
   }   
  }
 
 $scope.CheckApiKey = function(){
    baasboxAPIservice.checkApiKey().then(function(response){
       console.info('dd',response);
       })
 }     
});