angular.module('app.controllers')

.controller('bmiCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.bmiData = '';
        for (var i = 0; i < MHIData.data.length; i++) {

            if (MHIData.data[i].indicatorCode == 'BMI') {
                $scope.bmiData = MHIData.data[i];
            }
        }
        if ($scope.bmiData != '') {

            switch ($scope.bmiData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = true;

            }

            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.bmiData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days  ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months  ago';
                else
                    $scope.lastUpdated = daysDifference + ' month  ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            var bmiValue = $scope.bmiData.calculatedValue;
            bmiValue = parseFloat(bmiValue).toFixed(2);
            for (var i = 0; i < $scope.bmiData.questions.length; i++) {
                switch ($scope.bmiData.questions[i].code) {
                    case 'Height':
                        $scope.userHeight = $scope.bmiData.questions[i].value;
                        $scope.userHeightUnit = $scope.bmiData.questions[i].unit;
                        break;
                    case 'Weight':
                        $scope.userWeight = $scope.bmiData.questions[i].value;
                        $scope.userWeightUnit = $scope.bmiData.questions[i].unit;
                        break;
                    default:
                }
            }

            $scope.powerOfBMI = 2;
            if ($scope.userWeightUnit == 'lb') {
                bmiValue = bmiValue * 2.20462;
                bmiValue = parseFloat(bmiValue).toFixed(2);
                $rootScope.yourBMIText = bmiValue.concat(" ").concat('lb/m');
            } else {
                $rootScope.yourBMIText = bmiValue.concat(" ").concat('kg/m');
            }

        } else {

            $rootScope.yourBMIText = $rootScope.label.bmiView.notDoneText;
            $scope.powerOfBMI = '';
            $scope.userWeight = 'NA';
            $scope.userWeightUnit = '';
            $scope.userHeight = 'NA';
            $scope.userHeightUnit = '';
            $scope.NA = true;
            $scope.lastUpdated = 'Never';
        }
    });




    $scope.modifyBMI = function () {
        $timeout($state.go('menu.bmiEdit'), 1000);
    }
})

.controller('bmiEditCtrl', function ($scope, $rootScope, $state, $timeout, $ionicHistory, homeFactory, $ionicLoading) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        $scope.weightText = true;
        $scope.heightText = true;

        if (first == 0) {
            $scope.weightUnit = 'kg';
            $scope.heightUnit = 'cm';
            $scope.weight = '';
            $scope.height = '';

            $scope.getFirstMHIData();
            var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
            $scope.bmiData = '';
            for (var i = 0; i < MHIData.data.length; i++) {

                if (MHIData.data[i].indicatorCode == 'BMI') {
                    $scope.bmiData = MHIData.data[i];
                }
            }
        } else {
            var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
            $scope.bmiData = '';
            for (var i = 0; i < MHIData.data.length; i++) {

                if (MHIData.data[i].indicatorCode == 'BMI') {
                    $scope.bmiData = MHIData.data[i];
                }
            }
            if ($scope.bmiData != '') {
                for (var i = 0; i < $scope.bmiData.questions.length; i++) {
                    switch ($scope.bmiData.questions[i].code) {
                        case 'Height':
                            $scope.height = parseFloat($scope.bmiData.questions[i].value);
                            $scope.heightUnit = $scope.bmiData.questions[i].unit;
                            break;
                        case 'Weight':
                            $scope.weight = parseFloat($scope.bmiData.questions[i].value);
                            $scope.weightUnit = $scope.bmiData.questions[i].unit;
                            break;
                        default:
                    }
                }
            } else {
                $scope.weightUnit = 'kg';
                $scope.heightUnit = 'cm';
                $scope.weight = '';
                $scope.height = '';
            }
        }
    });

    $rootScope.MHInavigate = function (index) {
        if (index == 1) {
            $timeout(function () {
                $ionicHistory.goBack();
            }, 100);
        }
    };
    $scope.changeMass = function () {
        if ($scope.weightUnit == 'kg') {
            $scope.weight = $scope.weight / 2.20462;
        } else {
            $scope.weight = $scope.weight * 2.20462;
        }
    }

    $scope.changeHeight = function () {

        if ($scope.heightUnit == 'cm') {
            $scope.height = $scope.height * 2.54;
        } else {
            $scope.height = $scope.height / 2.54;
        }
    }

    $scope.getFirstMHIData = function () {
        $rootScope.show();
        var id = localStorage.getItem('userId');
        var link = 'getMHIStatus/' + id + '?' + Math.random();
        homeFactory
            .apiCall(link, 'GET', id)
            .then(
                function (response) {
                    $scope.result = response.data;
                    localStorage.setItem('dashboardData', JSON.stringify(response.data));
                    for (var i = 0; i < $scope.result.data.length; i++) {

                        switch ($scope.result.data[i].indicatorCode) {
                            case 'Last Health Checkup':
                                $rootScope.healthCheckupData = $scope.result.data[i];
                                break;
                            default:
                        }
                    }
                    $scope.getFirstExamData();

                });
    }





    $scope.getFirstExamData = function () {
        if ($rootScope.healthCheckupData != 'undefined' && $rootScope.healthCheckupData) {
            $rootScope.hide();
            if ($rootScope.healthCheckupData.questions[0].value != 'undefined' && $rootScope.healthCheckupData.questions[0].value != null) {
                $rootScope.checkUpDoneIndicator = true;
                $rootScope.checkUpNotDoneIndicator = false;
                $rootScope.lastHealthCheckupDate = new Date(parseInt($rootScope.healthCheckupData.questions[0].value));
                $rootScope.lastHealthDate = $rootScope.lastHealthCheckupDate.getDate();
                $rootScope.lastHealthMonth = $rootScope.months[$rootScope.lastHealthCheckupDate.getMonth()].name;
                $rootScope.lastHealthYear = $rootScope.lastHealthCheckupDate.getFullYear();
                var saveMonth = $rootScope.lastHealthCheckupDate.getMonth();
                var d = new Date();
                var n = d.getFullYear();
                var m = d.getMonth();
                var myDate = new Date($rootScope.lastHealthCheckupDate);
                var myEpoch = myDate.getTime() / 1000.0;
                var currentEpoch = d.getTime() / 1000.0;
                var difference = currentEpoch - myEpoch;
                if (difference > 31556926) {
                    $rootScope.checkUpDoneIndicator = false;
                    $rootScope.checkUpDueIndicator = true;
                } else {
                    $rootScope.checkUpDoneIndicator = true;
                    $rootScope.checkUpDueIndicator = false;
                }
                if (localStorage.getItem('preferLanguage') == 'english') {
                    $rootScope.lastHealthCheckup = appConstant.english.label.common.lastHealthCheckupText;
                } else {
                    $rootScope.lastHealthCheckup = appConstant.spanish.label.common.lastHealthCheckupText;
                }
            } else {
                $rootScope.checkUpDoneIndicator = false;
                $rootScope.checkUpNotDoneIndicator = true;
                $rootScope.lastHealthCheckup = $rootScope.label.lastHealthCHeckupView.notKnowHealthCheckupDate;
                $rootScope.lastHealthMonth = '';
                $rootScope.lastHealthYear = '';
            }
        } else {
            $rootScope.hide();
            $rootScope.checkUpDoneIndicator = false;
            $rootScope.checkUpNotDoneIndicator = true;
            $rootScope.lastHealthCheckup = $rootScope.label.lastHealthCHeckupView.notKnowHealthCheckupDate;
            $rootScope.lastHealthMonth = '';
            $rootScope.lastHealthYear = '';
        }
    };


    $rootScope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });

    };

    $rootScope.hide = function () {
        $ionicLoading.hide();
    };

    $scope.bmiCalc = function () {
        $rootScope.show();

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "BMI"
            },

            "questions": [

                {
                    "code": "weight",
                    "value": $scope.weight,
                    "unit": $scope.weightUnit
                },

                {
                    "code": "height",
                    "value": $scope.height,
                    "unit": $scope.heightUnit
                }
          ]

        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            if (first == 0) {
                $scope.getFirstMHIData();
                $rootScope.hide();
                $timeout(navigator.notification.confirm(
                    $rootScope.label.bmiEditView.successMessage, // message
                    $state.go('menu.dashboard'), // callback
                    $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                ), 2000);
            } else {
                $rootScope.getMHIData();
            }


        });

    }

    $scope.goToBMI = function () {
        $timeout($rootScope.$ionicGoBack(), 1000);
    }

})


.controller('lastHealthCheckupCtrl', function ($scope, $rootScope, $ionicHistory, $state, $timeout, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        if ($rootScope.healthCheckupData != 'undefined' && $rootScope.healthCheckupData) {
            if ($rootScope.healthCheckupData.questions[0].value != null) {
                $scope.healthCheckupDate = new Date(parseInt($rootScope.healthCheckupData.questions[0].value));
            } else {
                $scope.remember = true;
            }
        }
    });

    $scope.modifyDate = function () {
        $rootScope.show();

        if ($scope.remember == true) {
            $scope.healthCheckupDate = '';
        }


        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Last Health Checkup"
            },

            "questions": [

                {
                    "code": "HEALTH_CHECKUP",
                    "value": Date.parse($scope.healthCheckupDate),
                    "unit": ""
                }
          ]

        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            $rootScope.getMHIData();
            if ($scope.remember == true) {
                $rootScope.checkUpDoneIndicator = false;
                $rootScope.checkUpDueIndicator = false;
                $rootScope.checkUpNotDoneIndicator = true;
                $rootScope.lastHealthCheckup = $rootScope.label.lastHealthCHeckupView.notKnowHealthCheckupDate;
                $rootScope.lastHealthMonth = '';
                $rootScope.lastHealthYear = '';
                $rootScope.lastHealthCheckupDate = '';
            } else {
                $rootScope.checkUpDoneIndicator = true;
                $rootScope.checkUpNotDoneIndicator = false;
                $rootScope.lastHealthCheckupDate = $scope.healthCheckupDate;
                $rootScope.lastHealthDate = $rootScope.lastHealthCheckupDate.getDate();
                $rootScope.lastHealthMonth = $rootScope.months[$rootScope.lastHealthCheckupDate.getMonth()].name;

                $rootScope.lastHealthYear = $rootScope.lastHealthCheckupDate.getFullYear();
                var saveMonth = $rootScope.lastHealthCheckupDate.getMonth();
                var d = new Date();
                var n = d.getFullYear();
                var m = d.getMonth();
                var myDate = new Date($rootScope.lastHealthCheckupDate);
                var myEpoch = myDate.getTime() / 1000.0;
                var currentEpoch = d.getTime() / 1000.0;
                var difference = currentEpoch - myEpoch;
                if (difference > 31556926) {
                    $rootScope.checkUpDoneIndicator = false;
                    $rootScope.checkUpDueIndicator = true;
                } else {
                    $rootScope.checkUpDoneIndicator = true;
                    $rootScope.checkUpDueIndicator = false;
                }
                if (localStorage.getItem('preferLanguage') == 'english') {
                    $rootScope.lastHealthCheckup = appConstant.english.label.common.lastHealthCheckupText;
                } else {
                    $rootScope.lastHealthCheckup = appConstant.spanish.label.common.lastHealthCheckupText;
                }

            }
        });

    };
    $scope.none = function () {}

})

.controller('sleepCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.sleepData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Sleep') {
                $scope.sleepData = MHIData.data[i];
            }

        }
        if ($scope.sleepData != '') {
            switch ($scope.sleepData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.healthyText;
                    $scope.MHIInfo = $rootScope.label.sleepView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.riskText;
                    $scope.MHIInfo = $rootScope.label.sleepView.infoYellow;
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.highRiskText;
                    $scope.MHIInfo = $rootScope.label.sleepView.infoRed;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.Status = 'NA';
                    $scope.MHIInfo = $rootScope.label.sleepView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.sleepData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months  ago';
                else
                    $scope.lastUpdated = daysDifference + ' month  ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }




            for (var i = 0; i < $scope.sleepData.questions.length; i++) {
                switch ($scope.sleepData.questions[i].code) {
                    case 'FEEL_TIRED':
                        $scope.tiredValue = $scope.sleepData.questions[i].value;
                        break;
                    case 'MALE_COLLAR':
                        $scope.maleShritCollarValue = $scope.sleepData.questions[i].value;
                        break;
                    case 'STOP_BREATH_SLEEPING':
                        $scope.breathingValue = $scope.sleepData.questions[i].value;
                        break;
                    case 'SNORE_LOUDLY':
                        $scope.snoreValue = $scope.sleepData.questions[i].value;
                        break;
                    case 'TREATED_HIGHBLOOD_PRESSURE':
                        $scope.sleep = $scope.sleepData.questions[i].value;
                        break;
                    case 'FEMALE_COLLAR':
                        $scope.femaleShirtCollarValue = $scope.sleepData.questions[i].value;
                        break;
                    default:
                }
            }


        } else {
            $scope.femaleShirtCollarValue = 'NA';
            $scope.maleShritCollarValue = 'NA';
            $scope.breathingValue = 'NA';
            $scope.tiredValue = 'NA';
            $scope.snoreValue = 'NA';
            $scope.Status = 'NA';
            $scope.NA = true;
            $scope.lastUpdated = 'Never';
        }

        $scope.hypertensionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Hypertension') {
                $scope.hypertensionData = MHIData.data[i];
            }

        }

        if ($scope.hypertensionData != '') {
            switch ($scope.hypertensionData.status) {
                case 'GREEN':
                    $scope.hypertensionhealthy = true;
                    $scope.hypertensionrisk = false;
                    $scope.hypertensionhighRisk = false;
                    $scope.hypertensionNA = false;
                    break;
                case 'YELLOW':
                    $scope.hypertensionhealthy = false;
                    $scope.hypertensionrisk = true;
                    $scope.hypertensionhighRisk = false;
                    $scope.hypertensionNA = false;
                    break;
                case 'RED':
                    $scope.hypertensionhealthy = false;
                    $scope.hypertensionrisk = false;
                    $scope.hypertensionhighRisk = true;
                    $scope.hypertensionNA = false;
                    break;
                default:
                    $scope.hypertensionhealthy = false;
                    $scope.hypertensionrisk = false;
                    $scope.hypertensionhighRisk = false;
                    $scope.hypertensionNA = true;

            }
            for (var i = 0; i < $scope.hypertensionData.questions.length; i++) {
                switch ($scope.hypertensionData.questions[i].code) {
                    case 'SYSTOLIC_BLOOD':
                        $scope.systolic = $scope.hypertensionData.questions[i].value;
                        break;
                    case 'DIASTOLIC_BLOOD':
                        $scope.diastolic = $scope.hypertensionData.questions[i].value;
                        break;
                    default:
                }
            }
            $scope.bpInfo = $scope.systolic + '/' + $scope.diastolic + ' mmHg';
        } else {
            $scope.bpInfo = 'NA';
            $scope.hypertensionNA = true;
        }

    });



    $scope.modifySleep = function () {
        $timeout($state.go('menu.sleepEdit'), 1000);
    }
})

.controller('sleepEditCtrl', function ($scope, $rootScope, $state, $timeout, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.sleepData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Sleep') {
                $scope.sleepData = MHIData.data[i];
            }
        }

        if ($scope.sleepData != '') {
            for (var i = 0; i < $scope.sleepData.questions.length; i++) {
                switch ($scope.sleepData.questions[i].code) {
                    case 'FEEL_TIRED':
                        switch ($scope.sleepData.questions[i].value) {
                            case 'YES':
                                $scope.fatigued = true;
                                break;
                            case 'NO':
                                $scope.fatigued = false;
                                break;
                        }
                        break;
                    case 'MALE_COLLAR':
                        switch ($scope.sleepData.questions[i].value) {
                            case 'YES':
                                $scope.maleCollar = true;
                                break;
                            case 'NO':
                                $scope.maleCollar = false;
                                break;
                        }
                        break;
                    case 'STOP_BREATH_SLEEPING':
                        switch ($scope.sleepData.questions[i].value) {
                            case 'YES':
                                $scope.breathing = true;
                                break;
                            case 'NO':
                                $scope.breathing = false;
                                break;
                        }
                        break;
                    case 'SNORE_LOUDLY':
                        switch ($scope.sleepData.questions[i].value) {
                            case 'YES':
                                $scope.snore = true;
                                break;
                            case 'NO':
                                $scope.snore = false;
                                break;
                        }
                        break;
                    case 'FEMALE_COLLAR':
                        switch ($scope.sleepData.questions[i].value) {
                            case 'YES':
                                $scope.femaleCollar = true;
                                break;
                            case 'NO':
                                $scope.femaleCollar = false;
                                break;
                        }
                        break;
                    default:
                }
            }
        } else {
            $scope.snore = false;
            $scope.fatigued = false;
            $scope.breathing = false;
            $scope.maleCollar = false;
            $scope.femaleCollar = false;
        }

    });

    $scope.editSleep = function () {
        $rootScope.show();
        var snoreStatus, fatiguedStatus, breathingStatus, highBPStatus, femaleCollarStatus, maleCollarStatus = '';

        if ($scope.snore == true) {
            snoreStatus = 'YES';
        } else {

            snoreStatus = 'NO';
        }

        if ($scope.fatigued == true) {
            fatiguedStatus = 'YES';
        } else {

            fatiguedStatus = 'NO';
        }

        if ($scope.breathing == true) {
            breathingStatus = 'YES';
        } else {

            breathingStatus = 'NO';
        }

        if ($scope.highBP == true) {
            highBPStatus = 'YES';
        } else {

            highBPStatus = 'NO';
        }


        if ($scope.femaleCollar == true) {
            femaleCollarStatus = 'YES';
        } else {

            femaleCollarStatus = 'NO';
        }

        if ($scope.maleCollar == true) {
            maleCollarStatus = 'YES';
        } else {

            maleCollarStatus = 'NO';
        }

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Sleep"
            },

            "questions": [

                {
                    "code": "SNORE_LOUDLY",
                    "value": snoreStatus,
                    "unit": ""
                },

                {
                    "code": "FEEL_TIRED",
                    "value": fatiguedStatus,
                    "unit": ""
                },

                {
                    "code": "STOP_BREATH_SLEEPING",
                    "value": breathingStatus,
                    "unit": ""
                },

                {
                    "code": "TREATED_HIGHBLOOD_PRESSURE",
                    "value": highBPStatus,
                    "unit": ""
                },

                {
                    "code": "FEMALE_COLLAR",
                    "value": femaleCollarStatus,
                    "unit": ""
                },

                {
                    "code": "MALE_COLLAR",
                    "value": maleCollarStatus,
                    "unit": ""
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

.controller('exerciseCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        $scope.entities = $rootScope.exercise;

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.exerciseData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Exercise') {
                $scope.exerciseData = MHIData.data[i];
            }

        }

        if ($scope.exerciseData != '') {
            switch ($scope.exerciseData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.healthyText;
                    $scope.MHIInfo = $rootScope.label.exerciseView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.riskText;
                    $scope.MHIInfo = $rootScope.label.exerciseView.infoYellow;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.NA = true;
                    $scope.Status = 'NA';
                    $scope.MHIInfo = $rootScope.label.exerciseView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.exerciseData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months  ago';
                else
                    $scope.lastUpdated = daysDifference + ' month  ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            switch ($scope.exerciseData.questions[0].value) {
                case 'NO EXERCISE':
                    $scope.selectedExercise = $scope.entities[0].name;
                    break;
                case 'MODERATE':
                    $scope.selectedExercise = $scope.entities[1].name;
                    break;
                case 'VIGOROUS':
                    $scope.selectedExercise = $scope.entities[2].name;
                    break;
                case 'EQUAL MIX':
                    $scope.selectedExercise = $scope.entities[3].name;
                    break;
                default:
            }

        } else {
            $scope.selectedExercise = 'NA';
            $scope.NA = true;
            $scope.Status = 'NA';
            $scope.lastUpdated = 'Never';
        }
    });



    $scope.modifyExercise = function () {
        $timeout($state.go('menu.exerciseEdit'), 1000);
    }
})

.controller('exerciseEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    var entity = '';
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        $scope.entities = $rootScope.exercise;

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.exerciseData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Exercise') {
                $scope.exerciseData = MHIData.data[i];
            }

        }

        if ($scope.exerciseData != '') {

            switch ($scope.exerciseData.questions[0].value) {
                case 'NO EXERCISE':
                    $scope.entities[0].checked = true;
                    break;
                case 'MODERATE':
                    $scope.entities[1].checked = true;
                    break;
                case 'VIGOROUS':
                    $scope.entities[2].checked = true;
                    break;
                case 'EQUAL MIX':
                    $scope.entities[3].checked = true;
                    break;
                default:
            }
        }
    });

    $scope.more = [false, false, false, false];
    $scope.moreInfo = function (value) {
        if ($scope.more[value] == true)
            $scope.more[value] = false;
        else
            $scope.more[value] = true;
    }



    $scope.updateSelection = function (position, entities) {

        angular.forEach(entities, function (subscription, index) {
            if (position != index)
                subscription.checked = false;
        });
        entity = entities[position].value;
    }


    $scope.updateExercise = function () {
        $rootScope.show();
        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Exercise"
            },

            "questions": [

                {
                    "code": "EXE_STATUS",
                    "value": entity,
                    "unit": ""
                }]

        };

        var link = 'saveUserMhi/';
        homeFactory.apiCall(link, 'POST', $scope.mhiUpdate).then(function (response) {
            $rootScope.hide();
            $scope.details = response.data;
            $rootScope.getMHIData();


        });

    }


})

.controller('depressionCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        $scope.healthy = false;
        $scope.risk = false;
        $scope.highRisk = false;
        $scope.options = [{
                name: 'No at all',
                value: 'NOT AT ALL'
    }, {
                name: 'Several days',
                value: 'SEVERAL DAYS'
    }, {
                name: 'More than half the days',
                value: 'MORE THAN HALF THE DAYS'
    }, {
                name: 'Nearly day',
                value: 'NEARLY DAY'
    }
  ];

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.depressionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Depression') {
                $scope.depressionData = MHIData.data[i];
            }

        }

        if ($scope.depressionData != '') {
            switch ($scope.depressionData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.healthyText;
                    $scope.MHIInfo = $rootScope.label.depressionView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.riskText;
                    $scope.MHIInfo = $rootScope.label.depressionView.infoYellow;
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.highRiskText;
                    $scope.MHIInfo = $rootScope.label.depressionView.infoRed;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.Status = 'NA';
                    $scope.MHIInfo = $rootScope.label.depressionView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.depressionData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months  ago';
                else
                    $scope.lastUpdated = daysDifference + ' month  ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            $scope.depData = $scope.depressionData;

            for (var i = 0; i < $scope.depData.questions.length; i++) {
                switch ($scope.depData.questions[i].code) {
                    case 'FEELING_DOWN':
                        $scope.feelingDown = $scope.depData.questions[i].value;
                        break;
                    case 'THOUGHTS_DEAD_HURTING':
                        $scope.thoughts = $scope.depData.questions[i].value;
                        break;
                    case 'TROUBLE_CONCENTRATING':
                        $scope.concentrating = $scope.depData.questions[i].value;
                        break;
                    case 'POOR_APPETITE':
                        $scope.appetite = $scope.depData.questions[i].value;
                        break;
                    case 'TROUBLE_FALLING':
                        $scope.sleep = $scope.depData.questions[i].value;
                        break;
                    case 'LITTLE_INTEREST':
                        $scope.interest = $scope.depData.questions[i].value;
                        break;
                    case 'MOVING_SPEAKING_SLOWLY':
                        $scope.moving = $scope.depData.questions[i].value;
                        break;
                    case 'FEELING_BAD':
                        $scope.failure = $scope.depData.questions[i].value;
                        break;
                    case 'FEELING TIRED':
                        $scope.tired = $scope.depData.questions[i].value;
                        break;
                    default:
                }
            }




        } else {
            $scope.interest = 'NA';
            $scope.feelingDown = 'NA';
            $scope.sleep = 'NA';
            $scope.tired = 'NA';
            $scope.appetite = 'NA';
            $scope.failure = 'NA';
            $scope.concentrating = 'NA';
            $scope.moving = 'NA';
            $scope.thoughts = 'NA';
            $scope.NA = true;
            $scope.Status = 'NA';
            $scope.lastUpdated = 'Never';
        }

    });


    $scope.modifyDepression = function () {
        $timeout($state.go('menu.depressionEdit'), 1000);
    }
})

.controller('depressionEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.depressionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Depression') {
                $scope.depressionData = MHIData.data[i];
            }
        }

        if ($scope.depressionData != '') {
            $scope.depData = $scope.depressionData;

            for (var i = 0; i < $scope.depData.questions.length; i++) {
                switch ($scope.depData.questions[i].code) {
                    case 'FEELING_DOWN':
                        $scope.feelingDown = $scope.depData.questions[i].value;
                        break;
                    case 'THOUGHTS_DEAD_HURTING':
                        $scope.thoughts = $scope.depData.questions[i].value;
                        break;
                    case 'TROUBLE_CONCENTRATING':
                        $scope.concentrating = $scope.depData.questions[i].value;
                        break;
                    case 'POOR_APPETITE':
                        $scope.appetite = $scope.depData.questions[i].value;
                        break;
                    case 'TROUBLE_FALLING':
                        $scope.sleep = $scope.depData.questions[i].value;
                        break;
                    case 'LITTLE_INTEREST':
                        $scope.interest = $scope.depData.questions[i].value;
                        break;
                    case 'MOVING_SPEAKING_SLOWLY':
                        $scope.moving = $scope.depData.questions[i].value;
                        break;
                    case 'FEELING_BAD':
                        $scope.failure = $scope.depData.questions[i].value;
                        break;
                    case 'FEELING TIRED':
                        $scope.tired = $scope.depData.questions[i].value;
                        break;
                    default:
                }
            }
        } else {
            $scope.interest = 'NOT AT ALL';
            $scope.feelingDown = 'NOT AT ALL';
            $scope.sleep = 'NOT AT ALL';
            $scope.tired = 'NOT AT ALL';
            $scope.appetite = 'NOT AT ALL';
            $scope.failure = 'NOT AT ALL';
            $scope.concentrating = 'NOT AT ALL';
            $scope.moving = 'NOT AT ALL';
            $scope.thoughts = 'NOT AT ALL';
        }

    });




    $scope.options = [{
            name: 'No at all',
            value: 'NOT AT ALL'
    }, {
            name: 'Several days',
            value: 'SEVERAL DAYS'
    }, {
            name: 'More than half the days',
            value: 'MORE THAN HALF THE DAYS'
    }, {
            name: 'Nearly day',
            value: 'NEARLY DAY'
    }
  ];

    $scope.modifyDepression = function () {
        $rootScope.show();

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Depression"
            },

            "questions": [

                {
                    "code": "LITTLE_INTEREST",
                    "value": $scope.interest,
                    "unit": ""
                },

                {
                    "code": "FEELING_DOWN",
                    "value": $scope.feelingDown,
                    "unit": ""
                },

                {
                    "code": "TROUBLE_FALLING",
                    "value": $scope.sleep,
                    "unit": ""
                },

                {
                    "code": "FEELING TIRED",
                    "value": $scope.tired,
                    "unit": ""
                },

                {
                    "code": "POOR_APPETITE",
                    "value": $scope.appetite,
                    "unit": ""
                },

                {
                    "code": "FEELING_BAD",
                    "value": $scope.failure,
                    "unit": ""
                },

                {
                    "code": "TROUBLE_CONCENTRATING",
                    "value": $scope.concentrating,
                    "unit": ""
                },

                {
                    "code": "MOVING_SPEAKING_SLOWLY",
                    "value": $scope.moving,
                    "unit": ""
                },

                {
                    "code": "THOUGHTS_DEAD_HURTING",
                    "value": $scope.thoughts,
                    "unit": ""
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



.controller('dietCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.nutritionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Nutrition') {
                $scope.nutritionData = MHIData.data[i];
            }
        }

        if ($scope.nutritionData != '') {
            switch ($scope.nutritionData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.healthyText;
                    $scope.MHIInfo = $rootScope.label.dietView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.riskText;
                    $scope.MHIInfo = $rootScope.label.dietView.infoYellow;

                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.NA = true;
                    $scope.Status = 'NA';
                    $scope.MHIInfo = $rootScope.label.dietView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.nutritionData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months ago';
                else
                    $scope.lastUpdated = daysDifference + ' month ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            for (var i = 0; i < $scope.nutritionData.questions.length; i++) {
                switch ($scope.nutritionData.questions[i].code) {
                    case 'FRUITS':
                        $scope.fruitsCheck = $scope.nutritionData.questions[i].value;
                        break;
                    case 'MEAT_INTAKE':
                        $scope.redMeat = $scope.nutritionData.questions[i].value;
                        break;
                    case 'VEGETABLES':
                        $scope.vegCheck = $scope.nutritionData.questions[i].value;
                        break;
                    case 'LEGUMES_BEANS':
                        $scope.beansCheck = $scope.nutritionData.questions[i].value;
                        break;
                    case 'FISH_MEAL':
                        $scope.fattyFish = $scope.nutritionData.questions[i].value;
                        break;
                    case 'DIETARY_SALT':
                        $scope.restricting = $scope.nutritionData.questions[i].value;
                        break;
                    default:
                }
            }



        } else {
            $scope.fattyFish = 'NA';
            $scope.redMeat = 'NA';
            $scope.beansCheck = 'NA';
            $scope.fruitsCheck = 'NA';
            $scope.vegCheck = 'NA';
            $scope.restricting = 'NA';
            $scope.NA = true;
            $scope.Status = 'NA';
            $scope.lastUpdated = 'Never';
        }
    });


    $scope.modifyDiet = function () {
        $timeout($state.go('menu.dietEdit'), 1000);
    }
})

.controller('dietEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.nutritionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Nutrition') {
                $scope.nutritionData = MHIData.data[i];
            }
        }
        if ($scope.nutritionData != '') {

            for (var i = 0; i < $scope.nutritionData.questions.length; i++) {
                switch ($scope.nutritionData.questions[i].code) {
                    case 'FRUITS':
                        switch ($scope.nutritionData.questions[i].value) {
                            case 'YES':
                                $scope.fruitsCheck = true;
                                break;
                            case 'NO':
                                $scope.fruitsCheck = false;
                                break;
                        }
                        break;
                    case 'MEAT_INTAKE':
                        switch ($scope.nutritionData.questions[i].value) {
                            case 'YES':
                                $scope.redMeat = true;
                                break;
                            case 'NO':
                                $scope.redMeat = false;
                                break;
                        }
                        break;
                    case 'VEGETABLES':
                        switch ($scope.nutritionData.questions[i].value) {
                            case 'YES':
                                $scope.vegCheck = true;
                                break;
                            case 'NO':
                                $scope.vegCheck = false;
                                break;
                        }
                        break;
                    case 'LEGUMES_BEANS':
                        switch ($scope.nutritionData.questions[i].value) {
                            case 'YES':
                                $scope.beansCheck = true;
                                break;
                            case 'NO':
                                $scope.beansCheck = false;
                                break;
                        }
                        break;
                    case 'FISH_MEAL':
                        switch ($scope.nutritionData.questions[i].value) {
                            case 'YES':
                                $scope.fattyFish = true;
                                break;
                            case 'NO':
                                $scope.fattyFish = false;
                                break;
                        }
                        break;
                    case 'DIETARY_SALT':
                        switch ($scope.nutritionData.questions[i].value) {
                            case 'YES':
                                $scope.restricting = true;
                                break;
                            case 'NO':
                                $scope.restricting = false;
                                break;
                        }
                        break;
                    default:
                }
            }

        }

    });

    $scope.dietModify = function () {
        $rootScope.show();
        var fattyFishStatus, redMeatStatus, beansCheckStatus, fruitsCheckStatus, vegCheckStatus, restrictingStatus = '';


        if ($scope.fattyFish == true) {
            fattyFishStatus = 'YES';
        } else {

            fattyFishStatus = 'NO';
        }

        if ($scope.redMeat == true) {
            redMeatStatus = 'YES';
        } else {

            redMeatStatus = 'NO';
        }

        if ($scope.beansCheck == true) {
            beansCheckStatus = 'YES';
        } else {

            beansCheckStatus = 'NO';
        }

        if ($scope.fruitsCheck == true) {
            fruitsCheckStatus = 'YES';
        } else {

            fruitsCheckStatus = 'NO';
        }


        if ($scope.vegCheck == true) {
            vegCheckStatus = 'YES';
        } else {

            vegCheckStatus = 'NO';
        }

        if ($scope.restricting == true) {
            restrictingStatus = 'YES';
        } else {

            restrictingStatus = 'NO';
        }

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Nutrition"
            },

            "questions": [

                {
                    "code": "FISH_MEAL",
                    "value": fattyFishStatus,
                    "unit": ""
                },

                {
                    "code": "MEAT_INTAKE",
                    "value": redMeatStatus,
                    "unit": ""
                },

                {
                    "code": "LEGUMES_BEANS",
                    "value": beansCheckStatus,
                    "unit": ""
                },

                {
                    "code": "FRUITS",
                    "value": fruitsCheckStatus,
                    "unit": ""
                },

                {
                    "code": "VEGETABLES",
                    "value": vegCheckStatus,
                    "unit": ""
                },

                {
                    "code": "DIETARY_SALT",
                    "value": restrictingStatus,
                    "unit": ""
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

.controller('hyperTensionCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.hypertensionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Hypertension') {
                $scope.hypertensionData = MHIData.data[i];
            }
        }
        if ($scope.hypertensionData != '') {
            switch ($scope.hypertensionData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.normalText;
                    $scope.MHIInfo = $rootScope.label.hyperTensionView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.riskText;
                    $scope.MHIInfo = $rootScope.label.hyperTensionView.infoYellow;
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.highRiskText;
                    $scope.MHIInfo = $rootScope.label.hyperTensionView.infoRed;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.Status = 'NA';
                    $scope.MHIInfo = $rootScope.label.hyperTensionView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.hypertensionData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months ago';
                else
                    $scope.lastUpdated = daysDifference + ' month ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            for (var i = 0; i < $scope.hypertensionData.questions.length; i++) {
                switch ($scope.hypertensionData.questions[i].code) {
                    case 'TREATED_HIGH_BLOOD_PRESSURE':
                        $scope.HighBPCheck = $scope.hypertensionData.questions[i].value;
                        break;
                    case 'SYSTOLIC_BLOOD':
                        $scope.systolic = $scope.hypertensionData.questions[i].value;
                        break;
                    case 'DIASTOLIC_BLOOD':
                        $scope.diastolic = $scope.hypertensionData.questions[i].value;
                        break;
                    default:
                }
            }

        } else {
            $scope.systolic = 'NA';
            $scope.diastolic = 'NA';
            $scope.HighBPCheck = 'NA';
            $scope.NA = true;
            $scope.Status = 'NA';
            $scope.lastUpdated = 'Never';
        }
    });


    $scope.modifyHypertension = function () {
        $timeout($state.go('menu.hyperTensionEdit'), 1000);
    }
})

.controller('hyperTensionEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        $scope.lowBPText = true;
        $scope.highBPText = true;
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.hypertensionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Hypertension') {
                $scope.hypertensionData = MHIData.data[i];
            }
        }
        if ($scope.hypertensionData != '') {

            for (var i = 0; i < $scope.hypertensionData.questions.length; i++) {
                switch ($scope.hypertensionData.questions[i].code) {
                    case 'TREATED_HIGH_BLOOD_PRESSURE':
                        if ($scope.hypertensionData.questions[i].value == 'YES')
                            $scope.treatedHighBP = true;
                        else
                            $scope.treatedHighBP = false;
                        break;
                    case 'SYSTOLIC_BLOOD':
                        $scope.highBP = parseInt($scope.hypertensionData.questions[i].value);
                        break;
                    case 'DIASTOLIC_BLOOD':
                        $scope.lowBP = parseInt($scope.hypertensionData.questions[i].value);
                        break;
                    default:
                }
            }
        } else {
            $scope.highBP = '';
            $scope.lowBP = '';
            $scope.treatedHighBP = false;
        }
    });

    $scope.hyperTensionModify = function () {
        $rootScope.show();
        var treatedHighBPStatus = '';

        if ($scope.treatedHighBP == true) {
            treatedHighBPStatus = 'YES';
        } else {

            treatedHighBPStatus = 'NO';
        }
        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Hypertension"
            },

            "questions": [

                {
                    "code": "SYSTOLIC_BLOOD",
                    "value": $scope.highBP,
                    "unit": "mmHg"
                },

                {
                    "code": "DIASTOLIC_BLOOD",
                    "value": $scope.lowBP,
                    "unit": "mmHg"
                },

                {
                    "code": "TREATED_HIGH_BLOOD_PRESSURE",
                    "value": treatedHighBPStatus,
                    "unit": ""
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

.controller('waistCtrl', function ($scope, $timeout, $state, $rootScope, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.waistData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Waist Circumference') {
                $scope.waistData = MHIData.data[i];
            }

        }
        if ($scope.waistData != '') {
            switch ($scope.waistData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.waistView.info;
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.waistView.infoRed;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.MHIInfo = $rootScope.label.waistView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.waistData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months ago';
                else
                    $scope.lastUpdated = daysDifference + ' month ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }




            if ($scope.waistData.questions[0].value > 0) {
                $scope.waist = $scope.waistData.questions[0].value + ' inches';
            } else {
                $scope.waist = 'NA';
                $scope.NA = true;
                $scope.lastUpdated = 'Never';
            }
        } else {
            $scope.waist = 'NA';
            $scope.NA = true;
            $scope.lastUpdated = 'Never';

        }
    });

    $scope.modifyWaist = function () {
        $timeout($state.go('menu.waistEdit'), 1000);
    }
})

.controller('waistEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.waistData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Waist Circumference') {
                $scope.waistData = MHIData.data[i];
            }

        }
        $scope.waistText = true;
        if ($scope.waistData != '') {
            if ($scope.waistData.questions[0].value > 0) {
                $scope.waist = parseFloat($scope.waistData.questions[0].value);
            } else {
                $scope.waist = '';
            }
        } else {
            $scope.waist = '';
        }

    });

    $scope.updateWaist = function () {
        $rootScope.show();

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Waist Circumference"
            },

            "questions": [

                {
                    "code": "WAIST_CIRCUMFERENCE",
                    "value": $scope.waist,
                    "unit": ""
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

.controller('diabetesCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.diabetesData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Diabetes') {
                $scope.diabetesData = MHIData.data[i];
            }

        }
        if ($scope.diabetesData != '') {
            switch ($scope.diabetesData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.dibetesView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.dibetesView.infoYellow;

                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.dibetesView.infoRed;

                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.MHIInfo = $rootScope.label.dibetesView.info;


            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.diabetesData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months ago';
                else
                    $scope.lastUpdated = daysDifference + ' month ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            for (var i = 0; i < $scope.diabetesData.questions.length; i++) {
                switch ($scope.diabetesData.questions[i].code) {
                    case 'ETHINICITY_BACKGROUND':

                        $scope.ethinicity = $scope.diabetesData.questions[i].value;

                        break;
                    case 'RELATIVE_WITH_DIABETES':
                        $scope.diabetesInheritance = $scope.diabetesData.questions[i].value;

                        break;
                    case 'HBA1C_LEVEL':
                        $scope.HbA = $scope.diabetesData.questions[i].value;
                        break;
                    case 'FASTING_GLUCOSE':
                        $scope.glucoseLevel = $scope.diabetesData.questions[i].value;
                        break;
                    default:
                }
            }
        } else {
            $scope.glucoseLevel = 'NA';
            $scope.HbA = 'NA';
            $scope.diabetesInheritance = 'NA';
            $scope.ethinicity = 'NA';
            $scope.NA = true;
            $scope.lastUpdated = 'Never';
        }

        $scope.bmiData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'BMI') {
                $scope.bmiData = MHIData.data[i];
            }

        }

        if ($scope.bmiData != '') {

            switch ($scope.bmiData.status) {
                case 'GREEN':
                    $scope.bmihealthy = true;
                    $scope.bmirisk = false;
                    $scope.bmihighRisk = false;
                    $scope.bmiNA = false;
                    break;
                case 'YELLOW':
                    $scope.bmihealthy = false;
                    $scope.bmirisk = true;
                    $scope.bmihighRisk = false;
                    $scope.bmiNA = false;
                    break;
                case 'RED':
                    $scope.bmihealthy = false;
                    $scope.bmirisk = false;
                    $scope.bmihighRisk = true;
                    $scope.bmiNA = false;
                    break;
                default:
                    $scope.bmihealthy = false;
                    $scope.bmirisk = false;
                    $scope.bmihighRisk = false;
                    $scope.bmiNA = true;

            }

            var bmiValue = $scope.bmiData.calculatedValue;
            bmiValue = parseFloat(bmiValue).toFixed(2);
            for (var i = 0; i < $scope.bmiData.questions.length; i++) {
                switch ($scope.bmiData.questions[i].code) {
                    case 'Height':
                        $scope.userHeightUnit = $scope.bmiData.questions[i].unit;
                        break;
                    case 'Weight':
                        $scope.userWeightUnit = $scope.bmiData.questions[i].unit;
                        break;
                    default:
                }
            }
            $scope.powerOfBMI = 2;
            if ($scope.userWeightUnit == 'lb') {
                bmiValue = bmiValue * 2.20462;
                bmiValue = parseFloat(bmiValue).toFixed(2);
                $scope.yourBMIText = bmiValue.concat(" ").concat('lb/m');
            } else {
                $scope.yourBMIText = bmiValue.concat(" ").concat('kg/m');
            }

        } else {
            $scope.bmiNA = true;
            $scope.yourBMIText = $rootScope.label.bmiView.notDoneText;
            $scope.powerOfBMI = '';
        }
        $scope.nutritionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Nutrition') {
                $scope.nutritionData = MHIData.data[i];
            }

        }

        if ($scope.nutritionData != '') {
            switch ($scope.nutritionData.status) {
                case 'GREEN':
                    $scope.nutritionhealthy = true;
                    $scope.nutritionrisk = false;
                    $scope.nutritionNA = false;
                    break;
                case 'YELLOW':
                    $scope.nutritionhealthy = false;
                    $scope.nutritionrisk = true;
                    $scope.nutritionNA = false;
                    break;
                default:
                    $scope.nutritionhealthy = false;
                    $scope.nutritionhighRisk = false;
                    $scope.nutritionNA = true;

            }


        } else {
            $scope.nutritionNA = true;
        }



    });

    $scope.modifyDiabetes = function () {
        $timeout($state.go('menu.diabetesEdit'), 1000);
    }
})

.controller('diabetesEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.diabetesData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Diabetes') {
                $scope.diabetesData = MHIData.data[i];
            }

        }
        $scope.glucoseLevelText = true;
        $scope.HbAText = true;
        if ($scope.diabetesData != '') {

            for (var i = 0; i < $scope.diabetesData.questions.length; i++) {
                switch ($scope.diabetesData.questions[i].code) {
                    case 'ETHINICITY_BACKGROUND':
                        if ($scope.diabetesData.questions[i].value == 'YES')
                            $scope.diabetesFemaleEthnic = true;
                        else
                            $scope.diabetesFemaleEthnic = false;
                        break;
                    case 'RELATIVE_WITH_DIABETES':
                        if ($scope.diabetesData.questions[i].value == 'YES')
                            $scope.diabetesInheritance = true;
                        else
                            $scope.diabetesInheritance = false;
                        break;
                    case 'FASTING_GLUCOSE_LEVEL_GRT100':
                        if ($scope.diabetesData.questions[i].value == 'YES')
                            $scope.manyOcasionLevel = true;
                        else
                            $scope.manyOcasionLevel = false;
                        break;
                    case 'HBA1C_LEVEL':
                        $scope.HbA = parseInt($scope.diabetesData.questions[i].value);
                        break;
                    case 'FASTING_GLUCOSE':
                        $scope.glucoseLevel = parseInt($scope.diabetesData.questions[i].value);
                        break;
                    default:
                }
            }

        } else {
            $scope.diabetesInheritance = false;
            $scope.diabetesFemaleEthnic = false;
            $scope.HbA = '';
            $scope.glucoseLevel = '';
            $scope.manyOcasionLevel = false;
        }

    });

    $scope.editDiabetes = function () {
        $rootScope.show();
        var diabetesInheritanceStatus = '';
        if ($scope.diabetesInheritance == true) {
            diabetesInheritanceStatus = 'YES';
        } else {

            diabetesInheritanceStatus = 'NO';
        }

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Diabetes"
            },

            "questions": [

                {
                    "code": "RELATIVE_WITH_DIABETES",
                    "value": diabetesInheritanceStatus,
                    "unit": ""
                },

                {
                    "code": "HBA1C_LEVEL",
                    "value": $scope.HbA,
                    "unit": "%"
                },

                {
                    "code": "FASTING_GLUCOSE",
                    "value": $scope.glucoseLevel,
                    "unit": "mg/dL"
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

.controller('cardiovascularCtrl', function ($scope, $timeout, $state, $rootScope, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.cardioData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Cardio') {
                $scope.cardioData = MHIData.data[i];
            }

        }
        if ($scope.cardioData != '') {
            switch ($scope.cardioData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.cardiovascularView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.cardiovascularView.infoYellow;
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.MHIInfo = $rootScope.label.cardiovascularView.infoRed;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.MHIInfo = $rootScope.label.cardiovascularView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.cardioData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months ago';
                else
                    $scope.lastUpdated = daysDifference + ' month ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            for (var i = 0; i < $scope.cardioData.questions.length; i++) {
                switch ($scope.cardioData.questions[i].code) {
                    case 'TOTAL_CHOLESTEROL':

                        $scope.totalCholestrol = $scope.cardioData.questions[i].value;

                        break;
                    case 'HDL_CHOLESTEROL':
                        $scope.hdlCholestrol = $scope.cardioData.questions[i].value;

                        break;
                    default:
                }
            }

            $scope.heartRisk = $scope.cardioData.calculatedValue;
            $scope.heartRisk = $scope.heartRisk + '% in 10 years ';

        } else {
            $scope.totalCholestrol = 'NA';
            $scope.hdlCholestrol = 'NA';
            $scope.NA = true;
            $scope.heartRisk = 'NA';
            $scope.lastUpdated = 'Never';
        }
        $scope.hypertensionData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Hypertension') {
                $scope.hypertensionData = MHIData.data[i];
            }

        }

        if ($scope.hypertensionData != '') {

            switch ($scope.hypertensionData.status) {
                case 'GREEN':
                    $scope.hypertensionhealthy = true;
                    $scope.hypertensionrisk = false;
                    $scope.hypertensionhighRisk = false;
                    $scope.hypertensionNA = false;
                    break;
                case 'YELLOW':
                    $scope.hypertensionhealthy = false;
                    $scope.hypertensionrisk = true;
                    $scope.hypertensionhighRisk = false;
                    $scope.hypertensionNA = false;
                    break;
                case 'RED':
                    $scope.hypertensionhealthy = false;
                    $scope.hypertensionrisk = false;
                    $scope.hypertensionhighRisk = true;
                    $scope.hypertensionNA = false;
                    break;
                default:
                    $scope.hypertensionhealthy = false;
                    $scope.hypertensionrisk = false;
                    $scope.hypertensionhighRisk = false;
                    $scope.hypertensionNA = true;

            }

            for (var i = 0; i < $scope.hypertensionData.questions.length; i++) {
                switch ($scope.hypertensionData.questions[i].code) {
                    case 'SYSTOLIC_BLOOD':
                        $scope.systolic = $scope.hypertensionData.questions[i].value;
                        break;
                    default:
                }
            }
            $scope.bpInfo = $scope.systolic + ' mmHg';
        } else {
            $scope.bpInfo = 'NA';
            $scope.hypertensionNA = true;
        }
        $scope.smokingData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Smoking') {
                $scope.smokingData = MHIData.data[i];
            }

        }

        if ($scope.smokingData != '') {

            switch ($scope.smokingData.status) {
                case 'GREEN':
                    $scope.smokinghealthy = true;
                    $scope.smokinghighRisk = false;
                    $scope.smokingNA = false;
                    break;
                case 'RED':
                    $scope.smokinghealthy = false;
                    $scope.smokinghighRisk = true;
                    $scope.smokingNA = false;
                    break;
                default:
                    $scope.smokinghealthy = false;
                    $scope.smokinghighRisk = false;
                    $scope.smokingNA = true;

            }

            $scope.smoking = $scope.smokingData.questions[0].value;
        } else {
            $scope.smoking = 'NA';

            $scope.smokingNA = true;
        }

    });

    $scope.modifyCardiovascular = function () {
        $timeout($state.go('menu.cardiovascularEdit'), 1000);
    }
})

.controller('cardiovascularEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.cardioData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Cardio') {
                $scope.cardioData = MHIData.data[i];
            }

        }

        $scope.hdlCholestrolText = true;
        $scope.totalCholestrolText = true;
        if ($scope.cardioData != '') {

            for (var i = 0; i < $scope.cardioData.questions.length; i++) {
                switch ($scope.cardioData.questions[i].code) {
                    case 'TOTAL_CHOLESTEROL':

                        $scope.totalCholestrol = parseInt($scope.cardioData.questions[i].value);

                        break;
                    case 'HDL_CHOLESTEROL':
                        $scope.hdlCholestrol = parseInt($scope.cardioData.questions[i].value);

                        break;
                    default:
                }
            }

        } else {
            $scope.totalCholestrol = '';
            $scope.hdlCholestrol = '';
        }

    });

    $scope.editCardiovascular = function () {
        $rootScope.show();

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Cardio"
            },

            "questions": [

                {
                    "code": "TOTAL_CHOLESTEROL",
                    "value": $scope.totalCholestrol,
                    "unit": "mg/dL"
                },

                {
                    "code": "HDL_CHOLESTEROL",
                    "value": $scope.hdlCholestrol,
                    "unit": "mg/dL"
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

.controller('alcoholCtrl', function ($scope, $timeout, $state, $rootScope, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.alcoholData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Alcohol') {
                $scope.alcoholData = MHIData.data[i];
            }

        }
        // alert(JSON.stringify($rootScope.alcoholData));
        if ($scope.alcoholData != '') {
            switch ($scope.alcoholData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.normalText;
                    $scope.MHIInfo = $rootScope.label.alcoholView.info;
                    break;
                case 'YELLOW':
                    $scope.healthy = false;
                    $scope.risk = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.riskText;
                    $scope.MHIInfo = $rootScope.label.alcoholView.infoYellow;
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.Status = $rootScope.label.common.highRiskText;
                    $scope.MHIInfo = $rootScope.label.alcoholView.infoRed;
                    break;
                default:
                    $scope.healthy = false;
                    $scope.risk = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.Status = 'NA';
                    $scope.MHIInfo = $rootScope.label.alcoholView.info;

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.alcoholData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months ago';
                else
                    $scope.lastUpdated = daysDifference + ' month ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            $scope.Alcohol = $scope.alcoholData;

            for (var i = 0; i < $scope.Alcohol.questions.length; i++) {
                switch ($scope.Alcohol.questions[i].code) {
                    case 'SIX_OR_MORE_DRINKS':
                        $scope.thirdAnswer = $scope.Alcohol.questions[i].value;
                        break;
                    case 'DRINK_ALCOHOL':
                        $scope.firstAnswer = $scope.Alcohol.questions[i].value;
                        break;
                    case 'DRINK_IN_A_DAY':
                        $scope.secondAnswer = $scope.Alcohol.questions[i].value;
                        break;
                    default:
                }
            }
        } else {
            $scope.firstAnswer = 'NA';
            $scope.secondAnswer = 'NA';
            $scope.thirdAnswer = 'NA';
            $scope.NA = true;
            $scope.Status = 'NA';
            $scope.lastUpdated = 'Never';
        }

    });


    $scope.modifyAlcohol = function (position, entities) {
        $timeout($state.go('menu.alcoholEdit'), 1000);
    }

})

.controller('alcoholEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.alcoholData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Alcohol') {
                $scope.alcoholData = MHIData.data[i];
            }

        }
        $scope.entities = $rootScope.alcoholQuestions;
        $scope.first = {};
        $scope.second = {};
        $scope.third = {};
        if ($scope.alcoholData != '') {
            for (var i = 0; i < $scope.alcoholData.questions.length; i++) {
                switch ($scope.alcoholData.questions[i].code) {
                    case 'SIX_OR_MORE_DRINKS':
                        switch (($scope.alcoholData.questions[i].value).toUpperCase()) {
                            case 'NEVER':
                                $scope.entities[2].options[0].checked = true;
                                break;
                            case 'LESS THAN MONTHLY':
                                $scope.entities[2].options[1].checked = true;
                                break;
                            case 'MONTHLY':
                                $scope.entities[2].options[2].checked = true;
                                break;
                            case 'WEEKLY':
                                $scope.entities[2].options[3].checked = true;
                                break;
                            case 'DAILY OR ALMOST DAILY':
                                $scope.entities[2].options[4].checked = true;
                                break;
                        }
                        $scope.third.selectedAnswer = ($scope.alcoholData.questions[i].value).toUpperCase();
                        break;
                    case 'DRINK_ALCOHOL':
                        switch (($scope.alcoholData.questions[i].value).toUpperCase()) {
                            case 'NEVER':
                                $scope.entities[0].options[0].checked = true;
                                break;
                            case 'MONTHLY OR LESS':
                                $scope.entities[0].options[1].checked = true;
                                break;
                            case '2 TO 4 TIMES A MONTH':
                                $scope.entities[0].options[2].checked = true;
                                break;
                            case '2 TO 3 TIMES A WEEK':
                                $scope.entities[0].options[3].checked = true;
                                break;
                            case '4 OR MORE TIMES A WEEK':
                                $scope.entities[0].options[4].checked = true;
                                break;
                        }
                        $scope.first.selectedAnswer = ($scope.alcoholData.questions[i].value).toUpperCase();
                        break;
                    case 'DRINK_IN_A_DAY':
                        switch (($scope.alcoholData.questions[i].value).toUpperCase()) {
                            case '1 OR 2':
                                $scope.entities[1].options[0].checked = true;
                                break;
                            case '3 OR 4':
                                $scope.entities[1].options[1].checked = true;
                                break;
                            case '5 OR 6':
                                $scope.entities[1].options[2].checked = true;
                                break;
                            case '7 OR 9':
                                $scope.entities[1].options[3].checked = true;
                                break;
                            case '10 OR MORE':
                                $scope.entities[1].options[4].checked = true;
                                break;

                        }
                        $scope.second.selectedAnswer = ($scope.alcoholData.questions[i].value).toUpperCase();
                        break;
                    default:
                }
            }
        }
    });


    $scope.updateSelection = function (position, entities, id) {
        angular.forEach(entities, function (subscription, index) {
            if (position != index)
                subscription.checked = false;
        });
        if (id == 1) {
            $scope.first.selectedAnswer = entities[position].name;
        } else if (id == 2) {
            $scope.second.selectedAnswer = entities[position].name;
        } else {
            $scope.third.selectedAnswer = entities[position].name;
        }

    }

    $scope.updateAlcohol = function () {
        $rootScope.show();
        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Alcohol"
            },

            "questions": [

                {
                    "code": "DRINK_ALCOHOL",
                    "value": ($scope.first.selectedAnswer).toUpperCase(),
                    "unit": ""
                },

                {
                    "code": "DRINK_IN_A_DAY",
                    "value": ($scope.second.selectedAnswer).toUpperCase(),
                    "unit": ""
                },

                {
                    "code": "SIX_OR_MORE_DRINKS",
                    "value": ($scope.third.selectedAnswer).toUpperCase(),
                    "unit": ""
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

.controller('smokingCtrl', function ($scope, $timeout, $state, $rootScope, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.smokingData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Smoking') {
                $scope.smokingData = MHIData.data[i];
            }
        }
        if ($scope.smokingData != '') {
            switch ($scope.smokingData.status) {
                case 'GREEN':
                    $scope.healthy = true;
                    $scope.highRisk = false;
                    $scope.NA = false;
                    $scope.Status = 'Normal';
                    break;
                case 'RED':
                    $scope.healthy = false;
                    $scope.highRisk = true;
                    $scope.NA = false;
                    $scope.Status = 'High Risk';
                    break;
                default:
                    $scope.healthy = false;
                    $scope.highRisk = false;
                    $scope.NA = true;
                    $scope.Status = 'NA';

            }
            var d = new Date();
            var n = d.getTime();
            var updatedDate = n - parseInt($scope.smokingData.lastUpdatedDate);
            var daysDifference = Math.floor(updatedDate / 1000 / 60 / 60 / 24);
            var hoursDifference = Math.floor(updatedDate / 1000 / 60 / 60);
            var minutesDifference = Math.floor(updatedDate / 1000 / 60);
            var secondsDifference = Math.floor(updatedDate / 1000);

            if (daysDifference > 0 && daysDifference < 31) {
                $scope.lastUpdated = daysDifference + ' days ago';
            } else if (daysDifference >= 31) {
                daysDifference = daysDifference % 30;
                if (daysDifference > 1)
                    $scope.lastUpdated = daysDifference + ' months ago';
                else
                    $scope.lastUpdated = daysDifference + ' month ago';
            } else {
                if (hoursDifference > 0) {
                    $scope.lastUpdated = hoursDifference + ' hours ago';
                } else {
                    if (minutesDifference > 0) {
                        $scope.lastUpdated = minutesDifference + ' minutes ago';
                    } else {
                        if (secondsDifference > 0) {
                            $scope.lastUpdated = secondsDifference + ' seconds ago';
                        }
                    }
                }
            }



            $scope.smoking = $scope.smokingData.questions[0].value;
        } else {
            $scope.smoking = 'NA';
            $scope.NA = true;
            $scope.Status = 'NA';
            $scope.lastUpdated = 'Never';
        }

    });

    $scope.modifySmoke = function (position, entities) {
        $timeout($state.go('menu.smokingEdit'), 1000);
    }
})

.controller('smokingEditCtrl', function ($scope, $rootScope, $timeout, $state, $ionicHistory, homeFactory) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.smokingData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Smoking') {
                $scope.smokingData = MHIData.data[i];
            }

        }
        if ($scope.smokingData != '') {
            if ($scope.smokingData.questions[0].value == 'YES') {
                $scope.smoking = true;
            } else {
                $scope.smoking = false;
            }
        } else {
            $scope.smoking = false;
        }

    });

    $scope.updateSmoking = function () {
        $rootScope.show();
        var smokingStatus = '';


        if ($scope.smoking == true) {
            smokingStatus = 'YES';
        } else {
            smokingStatus = 'NO';
        }

        $scope.mhiUpdate = {

            "userId": localStorage.getItem('userId'),

            "indicator": {
                "code": "Smoking"
            },

            "questions": [

                {
                    "code": "DO_YOU_SMOKE",
                    "value": smokingStatus,
                    "unit": ""
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

