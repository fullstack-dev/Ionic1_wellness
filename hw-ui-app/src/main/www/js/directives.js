angular.module('app.directives', [])
.directive('ionSearchSelect', ['$ionicModal', '$ionicGesture', function ($ionicModal, $ionicGesture) {
    return {
        restrict: 'E',
        scope: {
            options: "=",
            optionSelected: "="
        },
        controller: function ($scope, $element, $attrs) {
            $scope.searchSelect = {
                title: $attrs.title || "Search Insurance Provider",
                keyProperty: $attrs.keyProperty,
                valueProperty: $attrs.valueProperty,
                templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
                animation: $attrs.animation || 'slide-in-up',
                option: null,
                searchvalue: "",
                enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
            };

            $ionicGesture.on('tap', function (e) {

                if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
                    if ($scope.optionSelected) {
                        $scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
                    }
                } else {
                    $scope.searchSelect.option = $scope.optionSelected;
                }
                $scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
            }, $element);

            $scope.saveOption = function () {
                if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
                    for (var i = 0; i < $scope.options.length; i++) {
                        var currentOption = $scope.options[i];
                        if (currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
                            $scope.optionSelected = currentOption;
                            break;
                        }
                    }
                } else {
                    $scope.optionSelected = $scope.searchSelect.option;
                }
                $scope.searchSelect.searchvalue = "";
                $scope.modal.hide();
            };

            $scope.clearSearch = function () {
                $scope.searchSelect.searchvalue = "";
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
            };
            $scope.$on('$destroy', function () {
                if ($scope.modal) {
                    $scope.modal.hide();
                }
            });

            $scope.OpenModalFromTemplate = function (templateUrl) {
                $ionicModal.fromTemplateUrl(templateUrl, {
                    scope: $scope,
                    animation: $scope.searchSelect.animation
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
        }
    };
}])
.directive('appHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/header.html'
    };
})

.directive('phonenumberDirective', ['$filter', function ($filter) {
    /*
    Intended use:
    	<phonenumber-directive placeholder='prompt' model='someModel.phonenumber'></phonenumber-directive>
    Where:
    	someModel.phonenumber: {String} value which to bind only the numeric characters [0-9] entered
    		ie, if user enters 617-2223333, value of 6172223333 will be bound to model
    	prompt: {String} text to keep in placeholder when no numeric input entered
    */

    function link(scope, element, attributes) {

        // scope.inputValue is the value of input element used in template
        scope.inputValue = scope.phonenumberModel;

        scope.$watch('inputValue', function (value, oldValue) {

            value = String(value);
            var number = value.replace(/[^0-9]+/g, '');
            scope.phonenumberModel = number;
            scope.inputValue = $filter('phonenumber')(number);
        });
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            phonenumberPlaceholder: '=placeholder',
            phonenumberModel: '=model',
        },
        //templateUrl: '/static/phonenumberModule/template.html',
        template: '<input ng-model="inputValue" type="tel" name="mobile" class="phonenumber" placeholder="{{phonenumberPlaceholder}}" title="Phonenumber (Format: (999) 9999-9999)">',
    };
}])

.directive('registerphoneDirective', ['$filter', function ($filter) {
    /*
    Intended use:
    	<phonenumber-directive placeholder='prompt' model='someModel.phonenumber'></phonenumber-directive>
    Where:
    	someModel.phonenumber: {String} value which to bind only the numeric characters [0-9] entered
    		ie, if user enters 617-2223333, value of 6172223333 will be bound to model
    	prompt: {String} text to keep in placeholder when no numeric input entered
    */

    function link(scope, element, attributes) {

        // scope.inputValue is the value of input element used in template
        scope.inputValue = scope.phonenumberModel;

        scope.$watch('inputValue', function (value, oldValue) {

            value = String(value);
            var number = value.replace(/[^0-9]+/g, '');
            scope.phonenumberModel = number;
            scope.inputValue = $filter('phonenumber')(number);
        });
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            phonenumberPlaceholder: '=placeholder',
            phonenumberModel: '=model',
        },
        //templateUrl: '/static/phonenumberModule/template.html',
        template: '<input ng-model="inputValue" type="tel" name="mobile" class="phonenumber" placeholder="{{phonenumberPlaceholder}}" title="Phonenumber (Format: (999) 9999-9999)" required>',
    };
	}])

.filter('phonenumber', function () {
    /* 
    Format phonenumber as: c (xxx) xxx-xxxx
    	or as close as possible if phonenumber length is not 10
    	if c is not '1' (country code not USA), does not use country code
    */

    return function (number) {
        /* 
	    @param {Number | String} number - Number that will be formatted as telephone number
	    Returns formatted number: (###) ###-####
	    	if number.length < 4: ###
	    	else if number.length < 7: (###) ###

	    Does not handle country codes that are not '1' (USA)
	    */
        if (!number) {
            return '';
        }

        number = String(number);

        // Will return formattedNumber. 
        // If phonenumber isn't longer than an area code, just show number
        var formattedNumber = number;

        // if the first character is '1', strip it out and add it back
        var c = (number[0] == '1') ? '1 ' : '';
        number = number[0] == '1' ? number.slice(1) : number;

        // # (###) ###-#### as c (area) front-end
        var area = number.substring(0, 3);
        var front = number.substring(3, 6);
        var end = number.substring(6, 10);

        if (front) {
            formattedNumber = (c + "(" + area + ") " + front);
        }
        if (end) {
            formattedNumber += ("-" + end);
        }
        return formattedNumber;
    };
})
// .directive('appVersion', function () {
//     return function (scope, elm, attrs) {
//         cordova.getAppVersion(function (version) {
//             elm.text(version);
//         });
//     };
// })

.directive('focusMe', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            $timeout(function () {
                element[0].focus();
                if (ionic.Platform.isAndroid()) {
                    cordova.plugins.Keyboard.show();
                }
            }, 150);
        }
    };
})

.directive('blankDirective', [function () {

}]);


