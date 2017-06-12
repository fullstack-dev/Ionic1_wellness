angular.module('app.services', [])

.factory(
    'homeFactory',
    function ($http, $rootScope, $timeout) {
        return {
            authorizationCall: function(link, type, clientid){
                return $http({
                    method: type,
                    url: link,
                    headers:{
                        'Accept': 'application/json+fhir'
                    },
                    timeout: 25000
                }).success(function(response){
                    return response;
                }).error(function(response){
                    return response;
                });
            },
            apiCall: function (link, type, credentials) {
                return $http({
                    method: type,
                    url: url.concat(link),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(credentials),
                    timeout: 25000
                }).success(function (response) {
                    return response;
                }).error(function (response) {
                    $rootScope.hide();
                    // $timeout(function () {
                    //     navigator.splashscreen.hide();
                    // }, 100);
                    if (window.Connection) {
                        if (navigator.connection.type == Connection.NONE) {

                            if (localStorage.getItem('preferLanguage') == 'spanish') {
                                navigator.notification.alert(
                                    appConstant.spanish.message.common.internetError, // message
                                    $rootScope.none, // callback
                                    appConstant.spanish.message.common.internetErrorTitel, // title
                                    appConstant.spanish.label.common.okText // buttonName
                                );
                            } else {
                                navigator.notification.alert(
                                    appConstant.english.message.common.internetError, // message
                                    $rootScope.none, // callback
                                    appConstant.english.message.common.internetErrorTitel, // title
                                    appConstant.english.label.common.okText // buttonName
                                );
                            }
                        } else if (response != undefined || response != null) {
                            if (response.code == 102) {
                                navigator.notification.alert(
                                    $rootScope.message.common.loginCredentialError, // message
                                    $rootScope.none, // callback
                                    'Error', // title
                                    $rootScope.label.common.okText // buttonName
                                );
                            } else if (response.code == 101) {
                                navigator.notification.alert(
                                    $rootScope.message.common.accountDeactive, // message
                                    $rootScope.none, // callback
                                    $rootScope.message.common.accountNotActiveTitle, // title
                                    $rootScope.label.common.okText // buttonName
                                );
                            }
                        } else {

                            if (localStorage.getItem('preferLanguage') == 'spanish') {
                                navigator.notification.alert(
                                    appConstant.spanish.message.common.serverError, // message
                                    $rootScope.none, // callback
                                    'Error', // title
                                    appConstant.spanish.label.common.okText // buttonName
                                );
                            } else {
                                navigator.notification.alert(
                                    appConstant.english.message.common.serverError, // message
                                    $rootScope.none, // callback
                                    'Error', // title
                                    appConstant.english.label.common.okText // buttonName
                                );
                            }
                        }
                    }
                    return response;
                })
            },
            disconnectCall: function (link, type) {
                return $http({
                    method: type,
                    url: link,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 25000
                }).success(function (response) {
                    return response;
                }).error(function (response) {
                    $rootScope.hide();
                    $timeout(function () {
                        navigator.splashscreen.hide();
                    }, 100);
                    if (window.Connection) {
                        if (navigator.connection.type == Connection.NONE) {
                            if (localStorage.getItem('preferLanguage') == 'spanish') {
                                navigator.notification.alert(
                                    appConstant.spanish.message.common.internetError, // message
                                    $rootScope.none, // callback
                                    appConstant.spanish.message.common.internetErrorTitel, // title
                                    appConstant.spanish.label.common.okText // buttonName
                                );
                            } else {
                                navigator.notification.alert(
                                    appConstant.english.message.common.internetError, // message
                                    $rootScope.none, // callback
                                    appConstant.english.message.common.internetErrorTitel, // title
                                    appConstant.english.label.common.okText // buttonName
                                );

                            }

                        } else if (response.data.userId == null) {
                            navigator.notification.alert(
                                response.message, // message
                                $rootScope.none, // callback
                                'Error', // title
                                $rootScope.label.common.okText // buttonName
                            );
                        } else {
                            if (localStorage.getItem('preferLanguage') == 'spanish') {
                                navigator.notification.alert(
                                    appConstant.spanish.message.common.serverError, // message
                                    $rootScope.none, // callback
                                    'Error', // title
                                    appConstant.spanish.label.common.okText // buttonName
                                );
                            } else {
                                navigator.notification.alert(
                                    appConstant.english.message.common.serverError, // message
                                    $rootScope.none, // callback
                                    'Error', // title
                                    appConstant.english.label.common.okText // buttonName
                                );

                            }
                        }
                    }
                    return response;
                })

            }
        }
    })

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
    var self = this;

    // Handle query's and potential errors
    self.query = function (query, parameters) {
        parameters = parameters || [];
        var q = $q.defer();

        $ionicPlatform.ready(function () {
            $cordovaSQLite.execute(db, query, parameters)
                .then(function (result) {
                    q.resolve(result);
                }, function (error) {
                    console.warn('I found an error');
                    console.warn(error);
                    q.reject(error);
                });
        });
        return q.promise;
    }

    // Proces a result set
    self.getAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    }

    // Proces a single result
    self.getById = function(result) {
        var output = null;
        output = angular.copy(result.rows.item(0));
        return output;
    }

    return self;
})

.factory('Team', function($cordovaSQLite, DBA) {
    var self = this;

    self.all = function() {
        return DBA.query("SELECT id, name, content FROM team")
            .then(function(result){
                return DBA.getAll(result);
            });
    }

    self.get = function(memberId) {
        var parameters = [memberId];
        console.log('memberId',memberId);
        return DBA.query("SELECT id, name, content FROM team WHERE id = (?)", parameters)
            .then(function(result) {
                console.log('result',result);
                console.log('single-result',DBA.getById(result));
                return DBA.getById(result);
            });
    }

    self.add = function(member) {
        var parameters = [member.id, member.name, member.content];
        return DBA.query("INSERT INTO team (id, name, content) VALUES (?,?,?)", parameters);
    }

    self.remove = function(member) {
        var parameters = [member.id];
        return DBA.query("DELETE FROM team WHERE id = (?)", parameters);
    }

    self.update = function(origMember, editMember) {
        var parameters = [editMember.id, editMember.name, origMember.id];
        return DBA.query("UPDATE team SET id = (?), name = (?), content = (?) WHERE id = (?)", parameters);
    }

    return self;
});
