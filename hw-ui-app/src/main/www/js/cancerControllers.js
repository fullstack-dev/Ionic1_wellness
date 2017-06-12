angular.module('app.controllers')

.controller('cancerCtrl', function ($scope, $rootScope, ionicMaterialInk, $ionicHistory, $state) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.prostateData = '';
        $scope.lungData = '';
        $scope.colonData = '';
        $scope.breastData = '';
        $scope.cervicalData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Prostate Cancer') {
                $scope.prostateData = MHIData.data[i];
            } else if (MHIData.data[i].indicatorCode == 'Lung Cancer') {
                $scope.lungData = MHIData.data[i];
            } else if (MHIData.data[i].indicatorCode == 'Colon Cancer') {
                $scope.colonData = MHIData.data[i];
            } else if (MHIData.data[i].indicatorCode == 'Breast Cancer') {
                $scope.breastData = MHIData.data[i];
            } else if (MHIData.data[i].indicatorCode == 'Cervical Cancer') {
                $scope.cervicalData = MHIData.data[i];
            }
        }

        if ($scope.prostateData != '') {
            $scope.prostateCount = true;
            switch ($scope.prostateData.status) {
                case 'GREEN':
                    $scope.prostateHealthy = true;
                    $scope.prostateRisk = false;
                    $scope.prostateHighRisk = false;
                    $scope.prostateNA = false;
                    break;
                case 'YELLOW':
                    $scope.prostateHealthy = false;
                    $scope.prostateRisk = true;
                    $scope.prostateHighRisk = false;
                    $scope.prostateNA = false;
                    break;
                case 'RED':
                    $scope.prostateHealthy = false;
                    $scope.prostateRisk = false;
                    $scope.prostateHighRisk = true;
                    $scope.prostateNA = false;
                    break;
                default:
                    $scope.prostateHealthy = false;
                    $scope.prostateRisk = false;
                    $scope.prostateHighRisk = false;
                    $scope.prostateNA = true;
            }
            if (parseInt($scope.prostateData.nextScreeningDate) > 0) {
                $rootScope.nextProstateScreening = new Date(parseInt($scope.prostateData.nextScreeningDate));
                $scope.prostateNextMonth = $rootScope.nextProstateScreening.getMonth() + 1;
                if ($scope.prostateNextMonth < 10) {
                    $scope.prostateNextMonth = '0' + $scope.prostateNextMonth;
                }
                $scope.prostateNextYear = $rootScope.nextProstateScreening.getFullYear();
            } else {

                $scope.prostateNextMonth = 'NA';
                $scope.prostateNextYear = 'NA';

            }
            if ($scope.prostateData.questions[0].value > 0) {

                $rootScope.lastProstateScreening = new Date(parseInt($scope.prostateData.questions[0].value));
                $scope.prostateMonth = $rootScope.lastProstateScreening.getMonth() + 1;
                if ($scope.prostateMonth < 10) {
                    $scope.prostateMonth = '0' + $scope.prostateMonth;
                }
                $scope.prostateYear = $rootScope.lastProstateScreening.getFullYear();


            } else {
                $scope.prostateMonth = 'NA';
                $scope.prostateYear = 'NA';

                $scope.prostateNA = true;
            }

        } else {
            $scope.prostateMonth = 'NA';
            $scope.prostateYear = 'NA';
            $scope.prostateNextMonth = 'NA';
            $scope.prostateNextYear = 'NA';
            $scope.prostateNA = true;
            $scope.prostateCount = false;
        }

        if ($scope.lungData != '') {
            $scope.lungCount = true;
            switch ($scope.lungData.status) {
                case 'GREEN':
                    $scope.lungHealthy = true;
                    $scope.lungRisk = false;
                    $scope.lungHighRisk = false;
                    $scope.lungNA = false;
                    break;
                case 'YELLOW':
                    $scope.lungHealthy = false;
                    $scope.lungRisk = true;
                    $scope.lungHighRisk = false;
                    $scope.lungNA = false;
                    break;
                case 'RED':
                    $scope.lungHealthy = false;
                    $scope.lungRisk = false;
                    $scope.lungHighRisk = true;
                    $scope.lungNA = false;
                    break;
                default:
                    $scope.lungHealthy = false;
                    $scope.lungRisk = false;
                    $scope.lungHighRisk = false;
                    $scope.lungNA = true;
            }
            if (parseInt($scope.lungData.nextScreeningDate) > 0) {
                $rootScope.nextLungScreening = new Date(parseInt($scope.lungData.nextScreeningDate));
                $scope.lungNextMonth = $rootScope.nextLungScreening.getMonth() + 1;
                if ($scope.lungNextMonth < 10) {
                    $scope.lungNextMonth = '0' + $scope.lungNextMonth;
                }
                $scope.lungNextYear = $rootScope.nextLungScreening.getFullYear();
            } else {

                $scope.lungNextMonth = 'NA';
                $scope.lungNextYear = 'NA';

            }
            for (var i = 0; i < $scope.lungData.questions.length; i++) {
                switch ($scope.lungData.questions[i].code) {
                    case 'LAST_CT_CHEST_SCREENING':
                        if ($scope.lungData.questions[i].value > 0) {
                            $rootScope.lastLungScreening = new Date(parseInt($scope.lungData.questions[i].value));
                            $scope.lungMonth = $rootScope.lastLungScreening.getMonth() + 1;
                            if ($scope.lungMonth < 10) {
                                $scope.lungMonth = '0' + $scope.lungMonth;
                            }
                            $scope.lungYear = $rootScope.lastLungScreening.getFullYear();

                        } else {
                            $scope.lungMonth = 'NA';
                            $scope.lungYear = 'NA';

                            $scope.lungNA = true;
                        }
                        break;
                    default:
                }
            }

        } else {
            $scope.lungMonth = 'NA';
            $scope.lungYear = 'NA';
            $scope.lungNextMonth = 'NA';
            $scope.lungNextYear = 'NA';
            $scope.lungNA = true;
            $scope.lungCount = false;
        }


        if ($scope.colonData != '') {
            $scope.colonCount = true;
            switch ($scope.colonData.status) {
                case 'GREEN':
                    $scope.colonHealthy = true;
                    $scope.colonRisk = false;
                    $scope.colonHighRisk = false;
                    $scope.colonNA = false;
                    break;
                case 'YELLOW':
                    $scope.colonHealthy = false;
                    $scope.colonRisk = true;
                    $scope.colonHighRisk = false;
                    $scope.colonNA = false;
                    break;
                case 'RED':
                    $scope.colonHealthy = false;
                    $scope.colonRisk = false;
                    $scope.colonHighRisk = true;
                    $scope.colonNA = false;
                    break;
                default:
                    $scope.colonHealthy = false;
                    $scope.colonRisk = false;
                    $scope.colonHighRisk = false;
                    $scope.colonNA = true;
            }
            if (parseInt($scope.colonData.nextScreeningDate) > 0) {
                $rootScope.nextColonScreening = new Date(parseInt($scope.colonData.nextScreeningDate));
                $scope.colonNextMonth = $rootScope.nextColonScreening.getMonth() + 1;
                if ($scope.colonNextMonth < 10) {
                    $scope.colonNextMonth = '0' + $scope.colonNextMonth;
                }
                $scope.colonNextYear = $rootScope.nextColonScreening.getFullYear();
            } else {

                $scope.colonNextMonth = 'NA';
                $scope.colonNextYear = 'NA';

            }
            for (var i = 0; i < $scope.colonData.questions.length; i++) {
                switch ($scope.colonData.questions[i].code) {
                    case 'LAST_NORMAL_COLONOSCOPY':
                        if ($scope.colonData.questions[i].value > 0) {

                            $rootScope.lastColonScreening = new Date(parseInt($scope.colonData.questions[i].value));
                            $scope.colonMonth = $rootScope.lastColonScreening.getMonth() + 1;
                            if ($scope.colonMonth < 10) {
                                $scope.colonMonth = '0' + $scope.colonMonth;
                            }
                            $scope.colonYear = $rootScope.lastColonScreening.getFullYear();

                        } else {
                            $scope.colonMonth = 'NA';
                            $scope.colonYear = 'NA';

                            $scope.colonNA = true;
                        }
                        break;
                    default:
                }
            }
        } else {
            $scope.colonMonth = 'NA';
            $scope.colonYear = 'NA';
            $scope.colonNextMonth = 'NA';
            $scope.colonNextYear = 'NA';
            $scope.colonNA = true;
            $scope.colonCount = false;
        }


        if ($scope.breastData != '') {
            $scope.breastCount = true;
            switch ($scope.breastData.status) {
                case 'GREEN':
                    $scope.breastHealthy = true;
                    $scope.breastRisk = false;
                    $scope.breastHighRisk = false;
                    $scope.breastNA = false;
                    break;
                case 'YELLOW':
                    $scope.breastHealthy = false;
                    $scope.breastRisk = true;
                    $scope.breastHighRisk = false;
                    $scope.breastNA = false;
                    break;
                case 'RED':
                    $scope.breastHealthy = false;
                    $scope.breastRisk = false;
                    $scope.breastHighRisk = true;
                    $scope.breastNA = false;
                    break;
                default:
                    $scope.breastHealthy = false;
                    $scope.breastRisk = false;
                    $scope.breastHighRisk = false;
                    $scope.breastNA = true;
            }
            if (parseInt($scope.breastData.nextScreeningDate) > 0) {
                $rootScope.nextBreastScreening = new Date(parseInt($scope.breastData.nextScreeningDate));
                $scope.breastNextMonth = $rootScope.nextBreastScreening.getMonth() + 1;
                if ($scope.breastNextMonth < 10) {
                    $scope.breastNextMonth = '0' + $scope.breastNextMonth;
                }
                $scope.breastNextYear = $rootScope.nextBreastScreening.getFullYear();
            } else {

                $scope.breastNextMonth = 'NA';
                $scope.breastNextYear = 'NA';

            }

            if ($scope.breastData.questions[0].value > 0) {

                $rootScope.lastBreastScreening = new Date(parseInt($scope.breastData.questions[0].value));
                $scope.breastMonth = $rootScope.lastBreastScreening.getMonth() + 1;
                if ($scope.breastMonth < 10) {
                    $scope.breastMonth = '0' + $scope.breastMonth;
                }
                $scope.breastYear = $rootScope.lastBreastScreening.getFullYear();

            } else {
                $scope.breastMonth = 'NA';
                $scope.breastYear = 'NA';

                $scope.breastNA = true;
            }
        } else {
            $scope.breastMonth = 'NA';
            $scope.breastYear = 'NA';
            $scope.breastNextMonth = 'NA';
            $scope.breastNextYear = 'NA';
            $scope.breastNA = true;
            $scope.breastCount = false;
        }


        if ($scope.cervicalData != '') {
            $scope.cervicalCount = true;
            switch ($scope.cervicalData.status) {
                case 'GREEN':
                    $scope.cervicalHealthy = true;
                    $scope.cervicalRisk = false;
                    $scope.cervicalHighRisk = false;
                    $scope.cervicalNA = false;
                    break;
                case 'YELLOW':
                    $scope.cervicalHealthy = false;
                    $scope.cervicalRisk = true;
                    $scope.cervicalHighRisk = false;
                    $scope.cervicalNA = false;
                    break;
                case 'RED':
                    $scope.cervicalHealthy = false;
                    $scope.cervicalRisk = false;
                    $scope.cervicalHighRisk = true;
                    $scope.cervicalNA = false;
                    break;
                default:
                    $scope.cervicalHealthy = false;
                    $scope.cervicalRisk = false;
                    $scope.cervicalHighRisk = false;
                    $scope.cervicalNA = true;
            }
            if (parseInt($scope.cervicalData.nextScreeningDate) > 0) {
                $rootScope.nextCervicalScreening = new Date(parseInt($scope.cervicalData.nextScreeningDate));
                $scope.cervicalNextMonth = $rootScope.nextCervicalScreening.getMonth() + 1;
                if ($scope.cervicalNextMonth < 10) {
                    $scope.cervicalNextMonth = '0' + $scope.cervicalNextMonth;
                }
                $scope.cervicalNextYear = $rootScope.nextCervicalScreening.getFullYear();
            } else {

                $scope.cervicalNextMonth = 'NA';
                $scope.cervicalNextYear = 'NA';

            }
            for (var i = 0; i < $scope.cervicalData.questions.length; i++) {
                switch ($scope.cervicalData.questions[i].code) {
                    case 'LAST_NORMAL_PAP_EXAM':
                        if ($scope.cervicalData.questions[i].value > 0) {

                            $rootScope.lastCervicalScreening = new Date(parseInt($scope.cervicalData.questions[i].value));
                            $scope.cervicalMonth = $rootScope.lastCervicalScreening.getMonth() + 1;
                            if ($scope.cervicalMonth < 10) {
                                $scope.cervicalMonth = '0' + $scope.cervicalMonth;
                            }
                            $scope.cervicalYear = $rootScope.lastCervicalScreening.getFullYear();

                        } else {
                            $scope.cervicalMonth = 'NA';
                            $scope.cervicalYear = 'NA';
                            $scope.cervicalNA = true;
                        }
                        break;
                    default:
                }



            }
        } else {
            $scope.cervicalMonth = 'NA';
            $scope.cervicalYear = 'NA';
            $scope.cervicalNextMonth = 'NA';
            $scope.cervicalNextYear = 'NA';
            $scope.cervicalNA = true;
            $scope.cervicalCount = false;
        }

    });

})


.controller('breastCtrl', function ($scope, $ionicHistory, $rootScope, $timeout, ionicMaterialInk, homeFactory) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.breastData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Breast Cancer') {
                $scope.breastData = MHIData.data[i];
            }

        }
        if ($scope.breastData != '') {

            if ($scope.breastData.questions[0].value > 0) {

                $scope.breastTestDate = new Date(parseInt($scope.breastData.questions[0].value));
            } else {
                $scope.breastTestDate = '';
            }

        } else {
            $scope.breastTestDate = '';
        }

    });

    $scope.updateBreastCancerInfo = function () {
        $rootScope.show();
        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Breast Cancer"
            },

            "questions": [

                {
                    "code": "LAST_NORMAL_MAMMOGRAM_DATE",
                    "value": Date.parse($scope.breastTestDate),
                    "unit": null
}
          ]

        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            $rootScope.getMHIData();
        });
    }
})


.controller('cervicalCtrl', function ($scope, $rootScope, $timeout, ionicMaterialInk, $ionicHistory, homeFactory) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.cervicalData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Cervical Cancer') {
                $scope.cervicalData = MHIData.data[i];
            }

        }
        if ($scope.cervicalData != '') {

            for (var i = 0; i < $scope.cervicalData.questions.length; i++) {
                switch ($scope.cervicalData.questions[i].code) {
                    case 'LAST_NORMAL_PAP_EXAM':
                        if ($scope.cervicalData.questions[i].value > 0) {
                            $scope.cervicalTestDate = new Date(parseInt($scope.cervicalData.questions[i].value));
                        }
                        break;
                    case 'HYSTERECTOMY_HISTORY_NO_CANCER':

                        $scope.cervicalCheck = $scope.cervicalData.questions[i].value;

                        break;
                    default:
                }
            }

        } else {
            $scope.cervicalCheck = 'NO';
            $scope.cervicalTestDate = '';
        }


    });


    $scope.updateCervicalCancerInfo = function () {
        $rootScope.show();
        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Cervical Cancer"
            },

            "questions": [

                {
                    "code": "HYSTERECTOMY_HISTORY_NO_CANCER",
                    "value": $scope.cervicalCheck,
                    "unit": null
},
                {
                    "code": "LAST_NORMAL_PAP_EXAM",
                    "value": Date.parse($scope.cervicalTestDate),
                    "unit": null
}
          ]

        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            $rootScope.getMHIData();

        });
    }



})

.controller('lungCtrl', function ($scope, $rootScope, $timeout, homeFactory, ionicMaterialInk, $ionicHistory) {

    $scope.$on("$ionicView.afterEnter", function (event, data) {

        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.lungData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Lung Cancer') {
                $scope.lungData = MHIData.data[i];
            }

        }
        if ($scope.lungData != '') {

            for (var i = 0; i < $scope.lungData.questions.length; i++) {
                switch ($scope.lungData.questions[i].code) {
                    case 'LAST_CT_CHEST_SCREENING':
                        if ($scope.lungData.questions[i].value > 0) {
                            $scope.lungTestDate = new Date(parseInt($scope.lungData.questions[i].value));
                        }
                        break;
                    case 'SMOKING_HISTORY_ONE_PACK_30YRS':

                        $scope.smokingHistory = $scope.lungData.questions[i].value;

                        break;
                    default:
                }
            }

        } else {
            $scope.smokingHistory = 'NO';
            $scope.lungTestDate = '';
        }


    });


    $scope.updateLungCancerInfo = function () {
        $rootScope.show();
        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Lung Cancer"
            },

            "questions": [

                {
                    "code": "LAST_CT_CHEST_SCREENING",
                    "value": Date.parse($scope.lungTestDate),
                    "unit": null
},
                {
                    "code": "SMOKING_HISTORY_ONE_PACK_30YRS",
                    "value": $scope.smokingHistory,
                    "unit": null
}
          ]

        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            $rootScope.getMHIData();

        });
    }


})

.controller('prostateCtrl', function ($scope, $rootScope, $timeout, ionicMaterialInk, homeFactory, $ionicHistory) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.prostateData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Prostate Cancer') {
                $scope.prostateData = MHIData.data[i];
            }

        }
        if ($scope.prostateData != '') {

            if ($scope.prostateData.questions[0].value > 0) {

                $scope.prostateDate = new Date(parseInt($scope.prostateData.questions[0].value));
            } else {
                $scope.prostateDate = '';
            }

        } else {
            $scope.prostateDate = '';
        }
    });

    $scope.updateProstateCancerInfo = function () {
        $rootScope.show();
        $scope.mhiUpdate = {
            "userId": localStorage.getItem('userId'),
            "indicator": {
                "code": "Prostate Cancer"
            },
            "questions": [
                {
                    "code": "LAST_PROSTATE_SCREENING",
                    "value": Date.parse($scope.prostateDate),
                    "unit": null
                }
          ]
        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            $rootScope.getMHIData();

        });
    }
})

.controller('colonCtrl', function ($scope, $timeout, $rootScope, homeFactory, ionicMaterialInk, $ionicHistory) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.colonData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Colon Cancer') {
                $scope.colonData = MHIData.data[i];
            }

        }
        if ($scope.colonData != '') {
            for (var i = 0; i < $scope.colonData.questions.length; i++) {
                switch ($scope.colonData.questions[i].code) {
                    case 'LAST_NORMAL_COLONOSCOPY':
                        if ($scope.colonData.questions[i].value > 0) {

                            $scope.colonTestDate = new Date(parseInt($scope.colonData.questions[i].value));
                        } else {
                            $scope.colonTestDate = '';
                        }
                        break;
                    case 'ABNORMAL_COLON_HISTORY':
                        $scope.colonCheck = $scope.colonData.questions[i].value;

                        break;
                    default:
                }
            }
        } else {
            $scope.colonCheck = 'NO';
            $scope.colonTestDate = '';
        }

    });

    $scope.updateColonCancerInfo = function () {
        $rootScope.show();
        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Colon Cancer"
            },

            "questions": [

                {
                    "code": "ABNORMAL_COLON_HISTORY",
                    "value": $scope.colonCheck,
                    "unit": null
 }, {
                    "code": "LAST_NORMAL_COLONOSCOPY",
                    "value": Date.parse($scope.colonTestDate),
                    "unit": null
 }
          ]

        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            $rootScope.getMHIData();

        });
    }



});
