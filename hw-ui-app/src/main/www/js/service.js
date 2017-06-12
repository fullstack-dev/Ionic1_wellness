angular
    .module('app.services', [])
    .factory(
        'homeFactory',
        function ($http) {
            return {
                loginDetails: function (credentials) {

                    return $http({
                        method: 'POST',
                        url: 'http://192.168.35.57:8090/hw-ui/authenticate',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(credentials)

                    }).success(function (response) {
                        /* console.log("success"); */
                        return response;
                    }).error(function (response) {
                        /* console.log("error"); */
                        return response;

                    });

                },
                verifyEmail: function (email) {

                    return $http({
                        method: 'GET',
                        url: 'http://192.168.35.57:8090/hw-ui/checkEmail?emailId=' + email,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        /*
                         * param:{
                         * 
                         * emailId:email },
                         */
                        data: JSON.stringify(email)

                    }).success(function (response) {
                        // console.log(url);
                        return response;
                    }).error(function (response) {
                        /* console.log("error"); */
                        return response;

                    });

                },
                RegisterDetails: function (values) {
                    return $http({
                        method: 'POST',
                        url: 'http://192.168.35.57:8090/hw-ui/register',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(values)
                    }).success(function (response) {
                        /* console.log("success"); */
                        return response;
                    }).error(function (response) {
                        /* console.log("error"); */
                        return response;
                    });

                },

                ProfileDetails: function (values) {
                    return $http({
                        method: 'GET',
                        url: 'http://192.168.35.57:8090/hw-ui/userProfile/' + values,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                        /*
                         * ,
                         * 
                         * params : { id : values }
                         */
                    }).success(function (response) {
                        /* console.log("success"); */
                        return response;
                    }).error(function (response) {
                        /* console.log("error"); */
                        return response;
                    });

                },
                updateDetails: function (values) {
                    return $http({
                        method: 'PUT',
                        url: 'http://192.168.35.57:8090/hw-ui/updateProfile',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(values)
                    }).success(function (response) {
                        /* console.log("success"); */
                        return response;
                    }).error(function (response) {
                        /* console.log("error"); */
                        return response;
                    });

                },
                forgotPass: function (value) {
                    return $http({
                        method: 'GET',
                        url: 'http://192.168.35.57:8090/hw-ui/forgotPassword?emailId=' + value,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(value)
                    }).success(function (response) {
                        console.log("success mail");
                        return response;
                    }).error(function (response) {
                        console.log("error mail");
                        return response;
                    });
                },
                finaAPhysician: function (value) {
                    return $http({
                        method: 'POST',
                        url: 'http://192.168.35.57:8090/hw-ui/searchGooglePlaces',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(value)
                    }).success(function (response) {
                        console.log("success list");
                        return response;
                    }).error(function (response) {
                        console.log("error list");
                        return response;
                    });
                },
                getLatLng: function (value) {
                    return $http({
                        method: 'GET',
                        url: 'http://192.168.35.57:8090/hw-ui/geoCode/' + value,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(value)
                    }).success(function (response) {
                        console.log("success mail");
                        return response;
                    }).error(function (response) {
                        console.log("error mail");
                        return response;
                    });
                }
            }
        }).service('LoginFactory', ['$http', function ($http) {

		}])

.service('BlankService', [function () {

		}]);
