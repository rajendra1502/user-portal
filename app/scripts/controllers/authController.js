'use strict';
userPortalApp.controller('authController', function ($scope, $http, baasboxAPIservice, $location, $rootScope) {
    
  $scope.showMsg = false; 
  $scope.formData = {};
  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  
  $scope.userSignIn = function(){
  if($scope.signin.$valid){
   baasboxAPIservice.checkAuth($scope.formData.email, $scope.formData.password).then(function (response) {
    console.info('login success', response); 
    $rootScope.loggedInUser = true;
    $location.path('/dashboard');  
   })
  }else{  
   $scope.showMsg = true;   
   console.info('Not validate');    
  } 
  }
  
  $scope.userSignUp = function(){
   if($scope.signup.$valid){
       baasboxAPIservice.signUp($scope.formData.email, $scope.formData.spassword, $scope.formData.userName).then(function(response){
        console.info(response); 
        $rootScope.loggedInUser = true;
        $location.path('/dashboard');
       })
   } else {
       $scope.showMsg = true; 
      console.info('not valid'); 
   }   
  }
    
});