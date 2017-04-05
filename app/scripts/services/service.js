/*
 * @Service      apiService
 * @Package      Angular
 * @Author       Rajendra
 * @Params       $http, $q
 * @Version      1.0.0
 * @Description  This is http service to fetch data from external resource.
 */
userPortalApp = angular.module("baasboxAPIservice", []);
userPortalApp.service("baasboxAPIservice", ['$http', '$q', '$resource', '$rootScope', function ($http, $q, $resource, $rootScope) {
        var master = this;
      
        this.apiFailureCallback = function (error) {
            console.info(error);
            if (error.status == 401) {
                $rootScope.logout();
                return false;
            }
        }
        
        this.signUp = function(email, pass, name, key){
          var deferred = $q.defer();
          console.info(email, pass, name);
            BaasBox.signup(email, pass, {"visibleByTheUser": {"email": email, "full_name": name}, "visibleByAnonymousUsers": {"authKey": key, "passKey":pass}})
                    .done(function (result) {
                        return deferred.resolve(result);
                    })
                    .fail(function (error) {
                        return deferred.resolve(error);
                    })
            return deferred.promise;
       
        }
       
        // Check user auth
        this.checkAuth = function (email, pass) {
            var deferred = $q.defer();

            var login = BaasBox.login(email, pass);

            login.done(function (user) {
                return deferred.resolve(user);
            })
                    .fail(function (err) {
                        return deferred.resolve(JSON.parse(err.responseText));
                    })
            return deferred.promise;
        }
        
        // Check user auth
        this.checkApiKey = function (key) {
            var deferred = $q.defer();
            BaasBox.callPlugin('streetview.user?key=x890sdf89dfasjhjk21#er', 'get')
                    .done(function (result) {
                        return deferred.resolve(result);
                    })
                    .fail(function (error) {
                        return deferred.resolve(error);
                    })
            return deferred.promise;
        }
        this.updateKey = function(dataObj){
          var deferred = $q.defer();
            BaasBox.callPlugin('streetview.user', 'put', dataObj)
                    .done(function (result) {
                        return deferred.resolve(dataObj);
                    })
                    .fail(function (error) {
                        return deferred.resolve(error);
                    })
            return deferred.promise;
        }
        // Get poi's from baasbox
        this.getPoiDataQuery = function (content) {
            var deferred = $q.defer();
            var url = BaasBox.endPoint + '/plugin/streetview.Prod_POI?' + content;
            $.get(url).done(function (res) {
                return deferred.resolve(res);
            })
                    .fail(function (error) {
                        return deferred.reject(error);
                    })
            return deferred.promise;
        }
    // Delete poi
        this.deletePoi = function (content) {
            var deferred = $q.defer();
            BaasBox.callPlugin('streetview.Prod_POI', 'DELETE', content)
                    .done(function (res) {
                        return deferred.resolve(res);
                    })
                    .fail(function (err) {
                        return deferred.reject(err);
                        console.log("delete error ", err);
                    })
            return deferred.promise;
        }    
        
      return this;  
    }]);       