userPortalApp.controller('poiController', ['$scope', '$location', 'baasboxAPIservice', '$q', '$rootScope','$state', '$stateParams', function ($scope, $location, baasboxAPIservice, $q, $rootScope, $state, $stateParams) {
 
 $scope.updatePoi = function(){
  $scope.showMsg = false;  
  $scope.isloader = true; 
   var obj = {
            "id":$rootScope.editPoiData.id,
            "poiLng": $rootScope.editPoiData.poiLng,
            "poiWebsite": '',
            "poiCategoryID": '',
            "poiCategory": '',
            "poiCategoryType": 'POILocation',
            "poiFavIndex": '',
            "poiImageID": '',
            "poiAltitude": $rootScope.editPoiData.poiAltitude,
            "poiEmail": $rootScope.editPoiData.poiEmail,
            "poiSceneId": '',
            "poiSubCategoryID": '',
            "poiSubcategory": '',
            "poiDescription": '',
            "poiAddress": '',
            "poiDistrict": '',
            "poiMuncipality": '',
            "poiPanoDate": '',
            "poiLat": $rootScope.editPoiData.poiLat,
            "poiName": $rootScope.editPoiData.poiName,
            "poiArabicName": $rootScope.editPoiData.poiArabicName,
            "poiUUID": "",
            "poiAuthorID": '',
            "poiPhone": $rootScope.editPoiData.poiPhone,
            "poiFax" : '',
            "poiStatus": ""
        }
    //  console.info($scope.editPoiData); return;  
    baasboxAPIservice.updatePoi(obj).then(function (response) {
       notif({
          msg: ('Poi update successfully!'),
          type: "success",
          position: "center"
        });
      $scope.isloader = false; 
       $('#editPoiModel').modal('hide');
       $scope.userPoi();
    })    
 }
 
}]);