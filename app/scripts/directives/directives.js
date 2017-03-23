userPortalApp.directive("compareTo", function () {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function (scope, element, attributes, ngModel) {
                    console.info('test');
                    ngModel.$validators.compareTo = function (modelValue) {

                        if (scope.otherModelValue != undefined) {
                            return modelValue == scope.otherModelValue;
                        }


                    };

                    scope.$watch("otherModelValue", function () {
                        ngModel.$validate();
                    });
                }
            };
        });