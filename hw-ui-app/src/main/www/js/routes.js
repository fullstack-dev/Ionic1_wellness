angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // home page
    .state('menu.homepage', {
        url: '/patient_home',
        views: {
            'side-menu21': {
                templateUrl: 'templates/patient_home.html',
                controller: 'homepageCtrl'
            }
        }
    })

    // my medical records page
    .state('menu.mymedicalrecords',{
        url: '/mymedicalrecords',
        views:{
            'side-menu21':{
                templateUrl: 'templates/mymedicalrecords.html',
                controller: 'mymedicalrecordsCtrl'
            }
        }
    })

    // Get Medical Records page
    .state('menu.myhealthrecords_get', {
        url: '/myhealthrecords_get',
        views: {
            'side-menu21': {
                templateUrl: 'templates/myhealthrecords_get.html',
                controller: 'myhealthrecordsgetCtrl'
            }
        }
    })

    // Share Medical Records page
    .state('menu.myhealthrecords_share', {
        url: '/myhealthrecords_share',
        views: {
            'side-menu21': {
                templateUrl: 'templates/myhealthrecords_share.html',
                controller: 'myhealthrecordsshareCtrl'
            }
        }
    })

    // View Medical Records page
    .state('menu.myhealthrecords_see', {
        url: '/myhealthrecords_see',
        views: {
            'side-menu21': {
                templateUrl: 'templates/myhealthrecords_see.html',
                controller: 'myhealthrecordsseeCtrl'
            }
        }
    })

    // Get Health Records list each item click router
    .state('menu.source_hospital_clinic',{
        url:'/source_hospital_clinic',
        views: {
            'side-menu21': {
                templateUrl:'templates/source_hospital_clinic.html',
                controller:'source_hospital_clinicCtrl'
            }
        }
    })

    .state('menu.source_providers',{
        url:'/source_providers',
        views: {
            'side-menu21': {
                templateUrl:'templates/source_providers.html',
                controller:'source_providersCtrl'
            }
        }
    })

    .state('menu.source_pharmacy',{
        url:'/source_pharmacy',
        views: {
            'side-menu21': {
                templateUrl:'templates/source_pharmacy.html',
                controller:'source_pharmacyCtrl'
            }
        }
    })

    .state('menu.source_lab',{
        url:'/source_lab',
        views: {
            'side-menu21': {
                templateUrl:'templates/source_lab.html',
                controller:'source_labCtrl'
            }
        }
    })

    .state('menu.source_immunization_registry',{
        url:'/source_immunization_registry',
        views: {
            'side-menu21': {
                templateUrl:'templates/source_immunization_registry.html',
                controller:'source_immunization_registryCtrl'
            }
        }
    })

    .state('menu.source_health_insurance',{
        url:'/source_health_insurance',
        views: {
            'side-menu21': {
                templateUrl:'templates/source_health_insurance.html',
                controller:'source_health_insuranceCtrl'
            }
        }
    })

    // Share Health records list each item click router
    .state('menu.share_hospital_clinic',{
        url:'/share_hospital_clinic',
        views: {
            'side-menu21': {
                templateUrl:'templates/share_hospital_clinic.html',
                controller:'share_hospital_clinicCtrl'
            }
        }
    })

    .state('menu.share_providers',{
        url:'/share_providers',
        views: {
            'side-menu21': {
                templateUrl:'templates/share_providers.html',
                controller:'share_providersCtrl'
            }
        }
    })


    //Cerner patient data
    .state('menu.patient_data',{
        url: '/patient_list',
        views: {
            'side-menu21': {
                templateUrl: 'templates/patient_data_epic.html',
                controller: 'patient_dataCtrl'
            }
        }
    })


    //Epic patient data
    .state('menu.patient_data_epic',{
        url: '/patient_list_epic',
        views: {
            'side-menu21': {
                templateUrl: 'templates/patient_data_epic.html',
                controller: 'patient_data_epicCtrl'
            }
        }
    })

    //Epic patient CCD getting
    .state('menu.patient_ccd_epic',{
        url:'/patient_ccd_epic',
        views: {
            'side-menu21': {
                templateUrl: 'templates/patient_ccd_epic.html',
                controller: 'patient_ccd_epicCtrl'
            }
        }
    })

    //CCD detail link page
    .state('menu.patient_ccd_epic_detail',{
        url: '/patient_ccd_epic_detail',
        views: {
            'side-menu21': {
                templateUrl: 'templates/patient_ccd_epic_detail.html',
                controller: 'patient_ccd_epic_detailCtrl'
            }
        }
    })

    //05 pop copy
    .state('popup_screen', {
        url: 'popup_screen',
        templateUrl: 'templates/popup_screen.html',
        controller: 'popup_screenCtrl'
    })

    //
    .state('popup_screen_share', {
        url: 'popup_screen_share',
        templateUrl: 'templates/popup_screen_share.html',
        controller: 'popup_screen_shareCtrl'
    })



    .state('menu.physicianList', {
        url: '/patient_docList',
        views: {
            'side-menu21': {
                templateUrl: 'templates/physicianList.html',
                controller: 'physicianListCtrl'
            }
        }
    })
    
    .state('menu.dashboard', {
        url: '/patient_dashboard',
        views: {
            'side-menu21': {
                templateUrl: 'templates/patient_dashboard.html',
                controller: 'dashboardCtrl'
            }
        }
    })

    .state('menu.yourAppointments', {
        url: '/patient_appointments',
        views: {
            'side-menu21': {
                templateUrl: 'templates/yourAppointments.html',
                controller: 'yourAppointmentsCtrl'
            }
        }
    })

    .state('menu.findAPhysician', {
        url: '/patient_findDoc',
        views: {
            'side-menu21': {
                templateUrl: 'templates/findAPhysician.html',
                controller: 'findAPhysicianCtrl'
            }
        }
    })

    .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        abstract: true
    })

    .state('register', {
        url: '/patient_register',
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
    })

    .state('login', {
        url: '/patient_login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    .state('forgotPassword', {
        url: '/patient_forgotPassword',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl'
    })

    .state('menu.profile', {
        url: '/patient_profile',
        views: {
            'side-menu21': {
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            }
        }
    })

    .state('menu.bmi', {
        url: '/bmi',
        views: {
            'side-menu21': {
                templateUrl: 'templates/bmi.html',
                controller: 'bmiCtrl'
            }
        }
    })

    .state('menu.cancer', {
        url: '/cancer',
        views: {
            'side-menu21': {
                templateUrl: 'templates/cancer.html',
                controller: 'cancerCtrl'
            }
        }
    })

    .state('menu.breast', {
        url: '/breast',
        views: {
            'side-menu21': {
                templateUrl: 'templates/breast.html',
                controller: 'breastCtrl'
            }
        }
    })

    .state('menu.cervical', {
        url: '/cervical',
        views: {
            'side-menu21': {
                templateUrl: 'templates/cervical.html',
                controller: 'cervicalCtrl'
            }
        }
    })

    .state('menu.lung', {
        url: '/lung',
        views: {
            'side-menu21': {
                templateUrl: 'templates/lung.html',
                controller: 'lungCtrl'
            }
        }
    })


    .state('menu.prostate', {
        url: '/prostate',
        views: {
            'side-menu21': {
                templateUrl: 'templates/prostate.html',
                controller: 'prostateCtrl'
            }
        }
    })

    .state('menu.hl7', {
        url: '/uploadReport',
        views: {
            'side-menu21': {
                templateUrl: 'templates/uploadReport.html',
                controller: 'uploadReport'
            }
        }
    })


    .state('menu.colon', {
        url: '/colon',
        views: {
            'side-menu21': {
                templateUrl: 'templates/colon.html',
                controller: 'colonCtrl'
            }
        }
    })

    .state('menu.lastHealthCheckup', {
        url: '/lastHealthCheckup',
        views: {
            'side-menu21': {
                templateUrl: 'templates/lastHealthCheckup.html',
                controller: 'lastHealthCheckupCtrl'
            }
        }
    })

    .state('menu.sleep', {
        url: '/sleep',
        views: {
            'side-menu21': {
                templateUrl: 'templates/sleep.html',
                controller: 'sleepCtrl'
            }
        }
    })


    .state('menu.sleepEdit', {
        url: '/sleepEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/sleepEdit.html',
                controller: 'sleepEditCtrl'
            }
        }
    })


    .state('menu.exercise', {
        url: '/exercise',
        views: {
            'side-menu21': {
                templateUrl: 'templates/exercise.html',
                controller: 'exerciseCtrl'
            }
        }
    })

    .state('menu.exerciseEdit', {
        url: '/ ',
        views: {
            'side-menu21': {
                templateUrl: 'templates/exerciseEdit.html',
                controller: 'exerciseEditCtrl'
            }
        }
    })

    .state('menu.diet', {
        url: '/diet',
        views: {
            'side-menu21': {
                templateUrl: 'templates/diet.html',
                controller: 'dietCtrl'
            }
        }
    })

    .state('menu.dietEdit', {
        url: '/dietEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/dietEdit.html',
                controller: 'dietEditCtrl'
            }
        }
    })

    .state('menu.waist', {
        url: '/waist',
        views: {
            'side-menu21': {
                templateUrl: 'templates/waist.html',
                controller: 'waistCtrl'
            }
        }
    })

    .state('menu.waistEdit', {
        url: '/waistEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/waistEdit.html',
                controller: 'waistEditCtrl'
            }
        }
    })

    .state('menu.diabetes', {
        url: '/diabetes',
        views: {
            'side-menu21': {
                templateUrl: 'templates/diabetes.html',
                controller: 'diabetesCtrl'
            }
        }
    })

    .state('menu.diabetesEdit', {
        url: '/diabetesEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/diabetesEdit.html',
                controller: 'diabetesEditCtrl'
            }
        }
    })

    .state('menu.hyperTension', {
        url: '/hyperTension',
        views: {
            'side-menu21': {
                templateUrl: 'templates/hyperTension.html',
                controller: 'hyperTensionCtrl'
            }
        }
    })

    .state('menu.hyperTensionEdit', {
        url: '/hyperTensionEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/hyperTensionEdit.html',
                controller: 'hyperTensionEditCtrl'
            }
        }
    })

    .state('menu.bmiEdit', {
        url: '/bmiEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/bmiEdit.html',
                controller: 'bmiEditCtrl'
            }
        }
    })

    .state('menu.cardiovascular', {
        url: '/cardiovascular',
        views: {
            'side-menu21': {
                templateUrl: 'templates/cardiovascular.html',
                controller: 'cardiovascularCtrl'
            }
        }
    })


    .state('menu.cardiovascularEdit', {
            url: '/cardiovascularEdit',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/cardiovascularEdit.html',
                    controller: 'cardiovascularEditCtrl'
                }
            }
        })
        .state('menu.alcohol', {
            url: '/alcohol',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/alcohol.html',
                    controller: 'alcoholCtrl'
                }
            }
        })

    .state('menu.alcoholEdit', {
            url: '/alcoholEdit',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/alcoholEdit.html',
                    controller: 'alcoholEditCtrl'
                }
            }
        })
        .state('menu.smoking', {
            url: '/smoking',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/smoking.html',
                    controller: 'smokingCtrl'
                }
            }
        })

    .state('menu.smokingEdit', {
        url: '/smokingEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/smokingEdit.html',
                controller: 'smokingEditCtrl'
            }
        }
    })

    .state('menu.depression', {
        url: '/depression',
        views: {
            'side-menu21': {
                templateUrl: 'templates/depression.html',
                controller: 'depressionCtrl'
            }
        }
    })

    .state('menu.depressionEdit', {
        url: '/depressionEdit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/depressionEdit.html',
                controller: 'depressionEditCtrl'
            }
        }
    })

    .state('menu.fitbit', {
        url: '/fitbit',
        views: {
            'side-menu21': {
                templateUrl: 'templates/fitbit.html',
                controller: 'fitbitCtrl'
            }
        }
    })

    .state('menu.wellness', {
        url: '/wellness',
        views: {
            'side-menu21': {
                templateUrl: 'templates/wellnessExam.html',
                controller: 'wellnessExamCtrl'
            }
        }
    })

    .state('menu.deviceDashboard', {
        url: '/deviceDashboard',
        views: {
            'side-menu21': {
                templateUrl: 'templates/deviceDashboard.html',
                controller: 'deviceDashboardCtrl'
            }
        }
    })
});
