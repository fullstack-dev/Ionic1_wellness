// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('app', ['ionic', 'ngAnimate', 'ionic-material', 'ionic-native-transitions', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

.run(function ($ionicPlatform, $rootScope, $ionicNativeTransitions, $timeout, $state, homeFactory, $ionicLoading, $cordovaSQLite) {//, $cordovaSQLite

    $rootScope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };

    $rootScope.hide = function () {
        $ionicLoading.hide();
    };

    $rootScope.autoLogin = function () {
        $rootScope.show();
        $rootScope.UserData = JSON.parse(localStorage.getItem('userLoginData'));
        homeFactory
            .apiCall('authenticate', 'POST', $rootScope.UserData)
            .then(
                function (response) {
                    var details = response.data;
                    if (response.status == 200) {
                        if (response.data.success == false) {
                            if (localStorage.getItem('preferLanguage') == 'spanish') {
                                navigator.notification.alert(
                                    appConstant.spanish.message.common.loginCredentialError, // message
                                    $state.go('login'), // callback
                                    'Inválido', // title
                                    $rootScope.label.common.done // buttonName
                                );
                            } else {
                                navigator.notification.alert(
                                    appConstant.english.message.common.loginCredentialError, // message
                                    $state.go('login'), // callback
                                    'Invalid', // title
                                    $rootScope.label.common.done // buttonName
                                );
                            }

                            return false;
                        } else {
                            $rootScope.hide();
                            var year = new Date(parseInt(details.data.dob)).getFullYear();
                            var d = new Date();
                            var n = d.getFullYear();
                            $rootScope.userAge = n - year;
                            if (details.data.gender == 1)
                                $rootScope.userGender = 'Male';
                            else
                                $rootScope.userGender = 'Female';

                            $rootScope.userExamPhysicianName = details.data.physicianName;
                            $rootScope.promotionalMessage = details.data.promotionalText;
                            $rootScope.userZipcode = details.data.zipCode;

                            var userExamDate = new Date(parseInt(details.data.wellnessExamDate));
                            var date = userExamDate.getDate();
                            var month = userExamDate.getMonth() + 1;
                            var year = userExamDate.getFullYear();

                            $rootScope.examTakenDate = date + '/' + month + '/' + year;
                            localStorage.setItem('userId', details.data.userId);
                            if (details.data.employee == false) {
                                $rootScope.employee = false;
                                $rootScope.patient = true;
                                $rootScope.examNotTaken = false;
                                $rootScope.examTaken = false;
                            } else {
                                $rootScope.employee = true;
                                $rootScope.patient = false;
                                if (details.data.wellnessExamStatus == 2) {
                                    $rootScope.examCompleted = true;
                                    $rootScope.examNotTaken = false;
                                    $rootScope.examTaken = false;
                                } else if (details.data.wellnessExamStatus == 1) {
                                    $rootScope.examNotTaken = false;
                                    $rootScope.examTaken = true;
                                    $rootScope.examCompleted = false;
                                } else {
                                    $rootScope.examNotTaken = true;
                                    $rootScope.examTaken = false;
                                    $rootScope.examCompleted = false;
                                }
                            }
                            first = 0;
                            cordova.plugins.backgroundMode.setDefaults({
                                title: 'Health Wizz is running in background',
                                text: 'Running.',
                                icon: "icon"
                            });
                            cordova.plugins.backgroundMode.enable();

                            // Called when background mode has been activated
                            cordova.plugins.backgroundMode.onactivate = function () {
                                $interval(function () {
                                    // Modify the currently displayed notification
                                    var backgroundData = JSON.parse(localStorage.getItem('userLoginData'));
                                    homeFactory
                                        .apiCall('authenticate', 'POST', backgroundData)
                                        .then(
                                            function (response) {});
                                }, 1740000);
                            }
                            $rootScope.showFooter = true;
                            // m
                            $state.go('menu.homepage');
                        }
                    } else {
                        $timeout(function () {
                            navigator.splashscreen.hide();
                        }, 100);
                        $state.go('login');
                    }

                });

    };


    $ionicPlatform.ready(function () {
        if (localStorage.getItem('userId')) {
            $rootScope.autoLogin();
        } else {
            // $timeout(function () {
            //     navigator.splashscreen.hide();
            // }, 100);
            $state.go('login');
        }

        $rootScope.exitApp = function () {
            ionic.Platform.exitApp();
        }

        $ionicNativeTransitions.enable(true);
        window.open = cordova.InAppBrowser.open;

        if (localStorage.getItem('preferLanguage') == 'english') {
            $rootScope.label = appConstant.english.label;
            $rootScope.message = appConstant.english.message;
            $rootScope.speciality = appConstant.english.speciality;
            $rootScope.months = appConstant.english.months;
            $rootScope.exercise = appConstant.english.exercise;
            $rootScope.alcoholQuestions = appConstant.english.alcoholQuestions;
            $rootScope.faqData = faqConstant.english;
        } else if (localStorage.getItem('preferLanguage') == 'spanish') {
            $rootScope.label = appConstant.spanish.label;
            $rootScope.message = appConstant.spanish.message;
            $rootScope.speciality = appConstant.spanish.speciality;
            $rootScope.months = appConstant.spanish.months;
            $rootScope.exercise = appConstant.spanish.exercise;
            $rootScope.alcoholQuestions = appConstant.spanish.alcoholQuestions;
            $rootScope.faqData = faqConstant.spanish;
        } else {
            navigator.globalization.getLocaleName(
                function (locale) {
                    if (locale.value == "es_ES" || locale.value == "es_US") {
                        $rootScope.label = appConstant.spanish.label;
                        $rootScope.message = appConstant.spanish.message;
                        $rootScope.speciality = appConstant.spanish.speciality;
                        $rootScope.months = appConstant.spanish.months;
                        $rootScope.exercise = appConstant.spanish.exercise;
                        $rootScope.alcoholQuestions = appConstant.spanish.alcoholQuestions;
                        $rootScope.faqData = faqConstant.spanish;
                        localStorage.setItem('preferLanguage', 'spanish');
                    } else {
                        $rootScope.label = appConstant.english.label;
                        $rootScope.message = appConstant.english.message;
                        $rootScope.speciality = appConstant.english.speciality;
                        $rootScope.months = appConstant.english.months;
                        $rootScope.exercise = appConstant.english.exercise;
                        $rootScope.alcoholQuestions = appConstant.english.alcoholQuestions;
                        $rootScope.faqData = faqConstant.english;
                        localStorage.setItem('preferLanguage', 'english');
                    }
                },
                function () {
                    localStorage.setItem('preferLanguage', 'english');
                    $rootScope.label = appConstant.english.label;
                    $rootScope.message = appConstant.english.message;
                    $rootScope.speciality = appConstant.english.speciality;
                    $rootScope.months = appConstant.english.months;
                    $rootScope.exercise = appConstant.english.exercise;
                    $rootScope.alcoholQuestions = appConstant.english.alcoholQuestions;
                    $rootScope.faqData = faqConstant.english;
                }
            );
        }

        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $timeout(function () {
                    navigator.splashscreen.hide();
                }, 100);


                if (localStorage.getItem('userId')) {
                    navigator.notification.alert(
                        $rootScope.message.common.internetError, // message
                        $rootScope.exitApp, // callback
                        $rootScope.message.common.internetErrorTitel, // title
                        $rootScope.label.common.okText // buttonName
                    );
                } else {
                    navigator.notification.alert(
                        $rootScope.message.common.internetError, // message
                        $rootScope.none, // callback
                        $rootScope.message.common.internetErrorTitel, // title
                        $rootScope.label.common.okText // buttonName
                    );
                }
            }
        }
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        console.log('app js db:',db);
        if(window.cordova) {
          // App syntax
          console.log('aaa',db);
          db = $cordovaSQLite.openDB({name: "app.db", location: 'default'});//name: "my.db", location: 'default'
          console.log('aaa1',db);
        } else {
          // Ionic serve syntax
          console.log('bbb',db);
          db = window.openDatabase("app.db", "1.0", "My app", -1);
            console.log('bbb1',db);
        }

        // console.log('app js db:',db);

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS team (id integer primary key, name text, content text)");         
    });

    if (localStorage.getItem('userFontSize') == 'smaller') {
        $rootScope.layout = 'styleNew';
        $rootScope.mediaLayout = 'mediaQuery';
    } else if (localStorage.getItem('userFontSize') == 'large') {
        $rootScope.layout = 'styleLarge';
        $rootScope.mediaLayout = 'mediaLarge';
    } else if (localStorage.getItem('userFontSize') == 'larger') {
        $rootScope.layout = 'styleLarger';
        $rootScope.mediaLayout = 'mediaLarger';
    } else {
        $rootScope.layout = 'style';
        $rootScope.mediaLayout = 'mediaQuery';
    }

})

.config(function ($ionicConfigProvider, $ionicNativeTransitionsProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicNativeTransitionsProvider.setDefaultOptions({
        duration: 400, // in milliseconds (ms), default 400,
        slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
        iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
        androiddelay: -1, // same as above but for Android, default -1
        winphonedelay: -1, // same as above but for Windows Phone, default -1,
        fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
    });
    $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'slide',
        direction: 'left'
    });
    $ionicNativeTransitionsProvider.setDefaultBackTransition({
        type: 'slide',
        direction: 'right'
    });

});
