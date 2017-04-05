userPortalApp.controller('poiController', ['$scope', '$location', 'baasboxAPIservice', '$q', '$rootScope','$state', '$stateParams', function ($scope, $location, baasboxAPIservice, $q, $rootScope, $state, $stateParams) {
 
 $scope.updatePoi = function(){
  $scope.showMsg = false;     
  console.info($scope.updateFormPoi); 
  if($scope.updateFormPoi.$valid){   
   $scope.showMsg = false;   
   alert('ttt');    
  } else {
   $scope.showMsg = true;   
   alert('kkk');   
  }
 }
 
}]);