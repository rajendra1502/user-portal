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
        
        this.signUp = function(email, pass, name){
          var deferred = $q.defer();
          console.info(email, pass, name);
            BaasBox.signup(email, pass, {"visibleByTheUser": {"email": email, "full_name": name}})
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
      return this;  
    }]);       