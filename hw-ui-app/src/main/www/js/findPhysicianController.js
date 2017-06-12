angular.module('app.controllers')

.controller('physicianListCtrl', function ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk, $rootScope, $state, $ionicLoading, homeFactory) {

    /*$rootScope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };*/

    $scope.physicianBio = function (bioText) {
        navigator.notification.alert(
            bioText, //message 
            $rootScope.none, // callback
            'Info', // title
            $rootScope.label.common.done // buttonName 
        );
    }

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $rootScope.show();
        // Set Ink
        ionicMaterialInk.displayEffect();

        if ($rootScope.physicianData.length > 0) {
            $scope.physician = $rootScope.physicianData;
            // Set Motion
            $timeout(function () {
                $rootScope.hide();
                ionicMaterialMotion.fadeSlideInRight();
            }, 1000);
        } else {
            var myEl = angular.element(document.querySelector('#docList'));
            myEl.empty();
            myEl.append('<div class="box-body" id="streaming_data" style="height: 100%; position: relative;"><div class="text-center" style="margin-top: 30%;line-height: 30px;font-size: 25px;color: #072a29!important;">No Results available for given criteria.</div><div class="text-muted text-center" style="font-size:20px;"></div></div>');
            $rootScope.hide();

        }



    });

})

.controller('findAPhysicianCtrl', function ($scope, $rootScope, $state, $ionicPlatform, homeFactory, $ionicHistory) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        $scope.docSpeciality = $rootScope.speciality;
        $scope.zipCodeValidation = true;
        $scope.miles = "5";
        $scope.zipcode = $rootScope.userZipcode;
        var previousViewData = $ionicHistory.backView();
        if (previousViewData != null) {
            if (previousViewData.stateName == 'menu.bmi' || previousViewData.stateName == 'menu.bmiEdit') {
                $scope.docType = '13';
            } else if (previousViewData.stateName == 'menu.sleep' || previousViewData.stateName == 'menu.sleepEdit') {
                $scope.docType = '43';
            } else if (previousViewData.stateName == 'menu.diet' || previousViewData.stateName == 'menu.dietEdit') {
                $scope.docType = '11';
            } else if (previousViewData.stateName == 'menu.waist' || previousViewData.stateName == 'menu.waistEdit') {
                $scope.docType = '27';
            } else if (previousViewData.stateName == 'menu.cardiovascular' || previousViewData.stateName == 'menu.cardiovascularEdit') {
                $scope.docType = '5';
            } else if (previousViewData.stateName == 'menu.alcohol' || previousViewData.stateName == 'menu.alcoholEdit') {
                $scope.docType = '42';
            } else if (previousViewData.stateName == 'menu.smoking' || previousViewData.stateName == 'menu.smokingEdit') {
                $scope.docType = '49';
            } else if (previousViewData.stateName == 'menu.depression' || previousViewData.stateName == 'menu.depressionEdit') {
                $scope.docType = '41';
            } else if (previousViewData.stateName == 'menu.colon') {
                $scope.docType = '14';
            } else if (previousViewData.stateName == 'menu.cervical') {
                $scope.docType = '25';
            } else if (previousViewData.stateName == 'menu.breast') {
                $scope.docType = '44';
            } else if (previousViewData.stateName == 'menu.prostate') {
                $scope.docType = '52';
            } else {
                $scope.docType = '13';
            }
        } else {
            $scope.docType = '13';
        }


    });


    $scope.keyPressed = function (keyEvent, formModel) {
        if (keyEvent.keyCode == 13) {
            $scope.physicianList();
        }
    };

    $ionicPlatform.registerBackButtonAction(function (event) {
        //if specified state matches else go back
        if ($ionicHistory.currentStateName() === 'menu.findAPhysician') {
            navigator.app.exitApp();
        } else {
            $ionicHistory.goBack();
        }
    }, 100);

    $scope.physicianList = function () {
        if ($scope.miles == null) {
            $scope.miles = 5;
        }
        $scope.filterSpeciality = $scope.docSpeciality[parseInt($scope.docType) - 1].term;
        //$rootScope.mileFilter = $scope.miles;
        //$rootScope.radius = (parseFloat($scope.miles) * 1609.34).toString();
        $rootScope.show();
        var link = 'geoCode/' + $scope.zipcode;
        homeFactory.apiCall(link, 'GET', $scope.zipcode).then(
            function (response) {
                if (response.status == 200) {
                    $rootScope.currentLat = response.data.data.lat;
                    $rootScope.currentLng = response.data.data.lng;
                    $rootScope.UserData = {
                        "lat": $rootScope.currentLat,
                        "lng": $rootScope.currentLng,
                        "radius": $scope.miles,
                        "keyword": ($scope.filterSpeciality).toLowerCase(),
                        "limit": 100
                    };
                    $scope.getDocList($rootScope.UserData);
                } else {
                    navigator.notification.alert(
                        $rootScope.message.common.invalidZipcode, //message 
                        $rootScope.none, // callback
                        $rootScope.label.common.invalid, // title
                        $rootScope.label.common.done // buttonName 
                    );
                }
            });
    };

    $scope.getDocList = function (value) {
        homeFactory.apiCall('findPhyscian', 'POST', value).then(
            function (response) {
                if (response.status == 200) {
                    $rootScope.hide();
                    $rootScope.physicianData = response.data.data.physicianData;
                    $state.go('menu.physicianList');
                } else {
                    navigator.notification.alert(
                        $rootScope.message.common.serviceUnavailable, //message 
                        $state.go('menu.findAPhysician'), // callback
                        $rootScope.label.common.serviceUnavailableTitle, // title
                        $rootScope.label.common.done // buttonName 
                    );
                }
            });
    }

});
