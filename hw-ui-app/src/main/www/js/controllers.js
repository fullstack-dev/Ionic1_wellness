angular.module('app.controllers', ['ngCordova', 'cb.x2js'])

// Homepage Controller
.controller('homepageCtrl', function ($scope, $rootScope, $timeout, $state, $ionicPlatform, ionicMaterialInk, $ionicHistory, $ionicModal, $ionicLoading, homeFactory, $ionicPopup) {
    $scope.gotoHealthIndex = function(){
        alert("healthIndex");
    }
    
    $scope.gotoCircles = function(){
        alert("circles");
    }

    $scope.gotoChallenges = function(){
        alert("challenges");
    }

    $scope.gotoHealthCoins = function(){
        alert("healthcoins");
    }   

    $scope.gotoMyMedicalRecords = function(){
        $state.go("menu.mymedicalrecords");
    } 

})

// My Medical Records Controller
.controller('mymedicalrecordsCtrl', function($scope, $rootScope, $timeout, $state, $ionicPlatform, $ionicHistory, $ionicModal, $ionicLoading, homeFactory, $ionicPopup){
    $scope.getmedicalrecords = function(){
        $state.go("menu.myhealthrecords_get");
    }

    $scope.sharemedicalrecords = function(){
        $state.go("menu.myhealthrecords_share");
    }

    $scope.seemedicalrecords = function(){
        $state.go("menu.myhealthrecords_see");
    }
})

// Get Medical Records Controller
.controller('myhealthrecordsgetCtrl', function($scope, $rootScope, $timeout, $state, homeFactory){
    $scope.hospital_clinic = function(){
        $state.go("menu.source_hospital_clinic");
    }

    $scope.providers = function(){
        $state.go("menu.source_hospital_clinic");
    }

    $scope.pharmacy = function(){
        $state.go("menu.source_hospital_clinic");
    }

    $scope.lab = function(){
        $state.go("menu.source_hospital_clinic");
    }

    $scope.immunization_registry = function(){
        $state.go("menu.source_hospital_clinic");
    }

    $scope.health_insurance = function() {
        $state.go("menu.source_hospital_clinic");
    }
})

// Share Medical Records Controller
.controller('myhealthrecordsshareCtrl', function($scope, $rootScope, $timeout, $state, homeFactory){
    $scope.share_hospital_clinic = function(){
        
    }

    $scope.share_providers = function(){
        $state.go("menu.share_providers");
    }
})

// View Medical Records Controller
.controller('myhealthrecordsseeCtrl', function($scope, $rootScope, $timeout, $state, homeFactory, Team){
    
    Team.all().then(function(response){
        console.log(response);

        $rootScope.downloadedDocuments = [];

        $rootScope.downloadedDocuments = [{
            year: 2017,
            folder: [
                {day_title: 'Epic patient Document',
                sub_folder: [
                ]}
            ]
        }];

        for(var i = 0;i<response.length;i ++){
            $rootScope.downloadedDocuments[0].folder[0].sub_folder.push({content: response[i].name, display: response[i].content});
        }

        console.log($rootScope.downloadedDocuments);
    });
    
    $scope.expand_year = function(downloadedDocument) {
       downloadedDocument.show = !downloadedDocument.show;
    }

    $scope.expand_content = function(folder){
        folder.show = !folder.show;

    }

    $scope.listitem_click = function(sub_folder){
      $scope.display_json_body = sub_folder.display;
      localStorage.removeItem('epic_ccd_detail_url');
      localStorage.setItem('epic_ccd_detail_url',$scope.display_json_body);
      console.log('display_json_body', localStorage.getItem('epic_ccd_detail_url'));
      $state.go('menu.patient_ccd_epic_detail');
    }

    $scope.share_function = function(){
        $state.go("menu.myhealthrecords_share");
    }
})

// Get Health Records list item click functions
//Hospital or Clinic controller
.controller('source_hospital_clinicCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $rootScope.hide();
    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $scope.connected_provider_name = '';
        $scope.connected_hospital_name = '';

        if(localStorage.getItem('accessToken_epic')){
            $scope.connected_provider_name = localStorage.getItem('provider_name');
        }else{
            $scope.connected_provider_name = '';
        }
    });

    $scope.selected_provider_name = function(){
        if(localStorage.getItem('provider_name') && $scope.connected_provider_name != ''){
            if(localStorage.getItem('accessToken_epic')){
                $rootScope.epic_auth_login();
            }
            else{
                $rootScope.cerner_auth_login();
            }
        }else{
            console.log('there is not any action');
        }
    }

    $scope.download = function(){
        alert("Download from email or scan paper document.");
    }

    $scope.update_function = function(){
        var e_state = document.getElementById("selected_state");
        var selected_statename = e_state.options[e_state.selectedIndex].text;

        var e_provider = document.getElementById("selected_provider");
        var selected_provider = e_provider.options[e_provider.selectedIndex].text;
        
        if(selected_statename == "Virginia"){
            switch(selected_provider){
                case "Inova Alexandria Hospital":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Inova Alexandria Hospital');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Hospital Fairfax County System":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fairfax Hospital Fairfax County System');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Hospital Fairfax County System Georgetown Medical School":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fairfax Hospital Fairfax County System Georgetown Medical School');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Hospital Fairfax County System George Washington University Medical School":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fairfax Hospital Fairfax County System George Washington University Medical School');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Childrens Hospital":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Inova Fairfax Childrens Hospital');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fair Oaks Hospital Fairfax":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fair Oaks Hospital Fairfax');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Loudoun Hospital Leesburg":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Loudoun Hospital Leesburg');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Mount Vernon Hospital Alexandria":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Mount Vernon Hospital Alexandria');
                    $rootScope.epic_auth_login();
                    break;
                case "Cape Fear Valley-Bladen County Hospital":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Cape Fear Valley-Bladen County Hospital');
                    $rootScope.cerner_auth_login();
                    break;
                case "Cape Fear Valley Hoke Hospital Raeford":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Cape Fear Valley Hoke Hospital Raeford');
                    $rootScope.cerner_auth_login();
                    break;
                case "Cape Fear Valley Medical Center Fayetteville":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Cape Fear Valley Medical Center Fayetteville');
                    $rootScope.cerner_auth_login();
                    break;
                default:
                    alert("please select provider's name");
                    break;
            }
        }else{

        }
    }

    // epic OAuth 2 login function
    $rootScope.epic_auth_login = function(){
        var scope_epic = "launch/patient,patient/Observation.read,openid";
        var redirectUri_epic = "http://localhost:8000";
        var serviceUri_epic = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/";
        // var clientid_epic = "cee5a068-b429-4e90-a6a4-7060cfce31e1";
        var clientid_epic = "50bbf475-04eb-4175-8a19-74d63319fde8";
        console.log(clientid_epic);
        var link = "https://open-ic.epic.com/Argonaut/api/FHIR/Argonaut/metadata";//metadata endpoint

        if(localStorage.getItem('accessToken_epic')){
            $state.go("menu.patient_data_epic");
        }else{
            $rootScope.show();
            homeFactory
            .authorizationCall(link, 'GET', clientid_epic)
                .then(function(result){
                    $scope.response = result;
                    var authorization_url_epic = result.data.rest[0].security.extension[0].extension[0].valueUri;
                    var token_url_epic = result.data.rest[0].security.extension[0].extension[1].valueUri;
                    $rootScope.token_url_epic = token_url_epic;

                    localStorage.setItem('token_url_epic', token_url_epic);
                    
                    console.log("token_url: ",localStorage.getItem('token_url_epic'));
                    
                    var authenticate_url_epic = authorization_url_epic + "?response_type=code&client_id="+clientid_epic+"&scope="+scope_epic+"&aud="+serviceUri_epic+"&redirect_uri="+redirectUri_epic;
                    console.log("authenticate_url_epic: ", authenticate_url_epic);
                     
                     $rootScope.hide();

                    //getting Epic authorization code
                    var ref1 = window.open(authenticate_url_epic, '_blank', 'location=no');
                    console.log("ref1:", ref1);
                    ref1.addEventListener('loadstart', function(event) { 
                        if((event.url).startsWith(redirectUri_epic)) {
                            requestToken_epic = (event.url).split("code=")[1];
                            console.log("auth_code:"+requestToken_epic);
                            
                            $rootScope.show();

                            $http({
                                method: "POST", 
                                url: $rootScope.token_url_epic, 
                                data: "grant_type=authorization_code" + "&code=" + requestToken_epic + "&redirect_uri="+ redirectUri_epic + "&client_id=" + clientid_epic})
                                .success(function(data) {
                                    console.log("data"+JSON.stringify(data));
                                    accessToken_epic = data.access_token;//access token
                                    patientId_epic = data.patient;
                                    token_Type_epic = data.toekn_type;
                                    expires_in_epic = data.expires_in;

                                    localStorage.setItem('accessToken_epic', accessToken_epic);
                                    localStorage.setItem('patientId_epic', patientId_epic);
                                    localStorage.setItem('expires_in_epic',expires_in_epic);

                                    console.log("access token: ", localStorage.getItem(accessToken_epic));
                                    console.log("patient id: ", localStorage.getItem(patientId_epic));

                                    $state.go('menu.patient_data_epic');
                                    $rootScope.hide();
                                                                                
                                })
                                .error(function(data, status) {
                                    console.log("error data: "+ JSON.stringify(data));
                                    
                                    alert("Server Not Available.\nPlease try again.");
                                    $rootScope.hide();
                                });
                            ref1.close();
                        }else{
                            console.log("error");
                        }                  
                    });
                },function(reason) {
                    $rootScope.hide();
                    alert("Server Not Available.\nPlease try again.");
                    console.log(reason); // Error!
                }); 
        }
    }

    // Cerner OAuth 2 login function
    $rootScope.cerner_auth_login = function(){
        var scope = "launch/patient,online_access,patient/Patient.read";
        var serviceUri = "https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/"
        
        localStorage.setItem('serviceUri', serviceUri);
        
        var redirectUri = "http://localhost:8100/";
        var clientid_cerner = "f7236f00-0b42-4566-87fd-e2917621d6fd";
        
        console.log(clientid_cerner);
        var link = serviceUri + "metadata";
        
        if(localStorage.getItem('accessToken')){
            $state.go("menu.patient_data");
        }else{
            $rootScope.show();
            homeFactory
            .authorizationCall(link, 'GET', clientid_cerner)
                .then(function(result){
                    $scope.response = result;
                    var token_url = result.data.rest[0].security.extension[0].extension[0].valueUri;
                    
                    localStorage.setItem('token_url',token_url);
                    
                    console.log("token_url: ", localStorage.getItem('token_url'));

                    var authorization_url = result.data.rest[0].security.extension[0].extension[1].valueUri;
                    
                    $rootScope.hide();
                    console.log("authorization_url: ",authorization_url);

                    var authenticate_url = authorization_url + "?" + "response_type=code&" + "client_id=" + encodeURIComponent(clientid_cerner) + "&"
                     + "scope=" + encodeURIComponent(scope) + "&" + "aud=" + encodeURIComponent(serviceUri) + "&"
                     + "redirect_uri=" + encodeURIComponent(redirectUri); 
                    
                    var ref = window.open(authenticate_url, '_blank', 'location=no');
                    console.log("ref: ", ref);
                    ref.addEventListener('loadstart', function(event) { 
                        if((event.url).startsWith(redirectUri)) {
                            requestToken = (event.url).split("code=")[1];//authorization code
                            console.log("auth_code:"+requestToken);
                            
                            $rootScope.show();
                            $http({method: "POST", url: token_url, data: "client_id=" + clientid_cerner + "&redirect_uri="+ redirectUri + "&grant_type=authorization_code" + "&code=" + requestToken })
                            .success(function(data) {
                                console.log("data"+JSON.stringify(data));
                                accessToken = data.access_token;
                                refreshToken = data.refresh_token;
                                patientId = data.patient;
                                expires_in = data.expires_in;
                                token_Type = data.toekn_type;
                                
                                localStorage.setItem('accessToken', accessToken);
                                localStorage.setItem('refreshToken', refreshToken);
                                localStorage.setItem('patientId', patientId);
                                localStorage.setItem('expires_in', expires_in);

                                console.log("accessToken: ",localStorage.getItem('accessToken'));
                                console.log("refreshToken: ",localStorage.getItem('refreshToken'));
                                console.log("patientId: ",localStorage.getItem('patientId'));
                                
                                $state.go('menu.patient_data');

                                $rootScope.hide();
                            }) 
                            .error(function(data, status) {
                                console.log("data"+data);
                                $rootScope.hide();
                                alert("Server Not Available.\nPlease try again.");
                            });
                            ref.close();
                        }                  
                    });
                },function(reason) {
                    $rootScope.hide();
                    console.log(reason); // Error!
                    alert("Server Not Available.\nPlease try again.");
                });
        }
    }

})

// Cerner Patient Data Display Controller
.controller('patient_dataCtrl', function($scope, $http, $ionicModal, $rootScope, $state, ionicMaterialInk, $timeout){
    
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    var patientId_temp = localStorage.getItem('patientId');
    var serviceUri_temp = localStorage.getItem('serviceUri');

    var patient_url = serviceUri_temp + "Patient/" + patientId_temp;
    
    console.log("patient_url: ", patient_url);
    
    $rootScope.name = "";
    $rootScope.birthday = "";
    $rootScope.gender = "";

    $rootScope.show();

    //getting patient data
    $http({
        url: patient_url, 
        method: "GET", 
        headers:{
            "Authorization": "Bearer "+localStorage.getItem('accessToken')
        },
        timeout: 25000 })
        .success(function(data) {
            console.log("patient_data_cerner: ", JSON.stringify(data));

            $rootScope.patient_data_cerner = JSON.stringify(data);

            var birthdayValue = data.birthDate;//patient birthday
            var genderValue = data.gender;//patient gender
            var name = data.name[0].given.join(" ") +" "+ data.name[0].family.join(" ");//patient name
            
            $rootScope.name = name;
            $rootScope.birthday = birthdayValue;
            $rootScope.gender = genderValue;
            console.log("name:", $rootScope.name);
            console.log("birthday:", $rootScope.birthday);
            console.log("gender:", $rootScope.gender);

            $rootScope.hide();

            console.log("expires_in", localStorage.getItem('expires_in'));
            var expires_time = parseInt(localStorage.getItem('expires_in'));
            console.log("reap_expires_in", (expires_time-5) * 1000);
            setInterval(function(){$scope.getAccessTokenFromRefresh();}, (expires_time-5) * 1000);
                                    
        })
        .error(function(data, status){
            console.log("error data: ", data);    
            $rootScope.hide();
            localStorage.removeItem('accessToken');
        });

    //when access token expire, getting access token from refresh token again.
    $scope.getAccessTokenFromRefresh = function(){
        // getting access token from refresh token
        console.log("token_url: ", localStorage.getItem('token_url'));
        console.log("refreshToken: ", localStorage.getItem('refreshToken'));

        $rootScope.show();
        $http({
            method: "POST", 
            url: localStorage.getItem('token_url'), 
            data: "&grant_type=refresh_token" + "&refresh_token=" + localStorage.getItem('refreshToken'),
            timeout: 25000 })
            .success(function(data) {
                $rootScope.hide();
                console.log("refresh_data: ", JSON.stringify(data));
                accessToken_r = data.access_token;//access token from refresh token
                expires_in_r = data.expires_in;

                console.log('expires_in_r', expires_in_r);

                localStorage.removeItem('accessToken');
                console.log("accessToken_r: ",localStorage.getItem('accessToken'));
                localStorage.setItem('accessToken', accessToken_r);

                console.log("accessToken_r: ",localStorage.getItem('accessToken'));
            })
            .error(function(data, status){
                console.log("error: ", data);
                $rootScope.hide();
                localStorage.removeItem('accessToken');
            });
    }

    // patient_data_epic button click function
    $scope.view_data = function(){

    }

    // go Epic patient ccd form
    $scope.download_continuity_of_care_document = function(){
        
    }

    $scope.view_medical_records = function(){
        
    }

    $scope.download_medical_records = function(){
        
    }
})


//Epic patient data display controller
.controller('patient_data_epicCtrl', function($scope, $http, $ionicModal, $rootScope, $state, ionicMaterialInk, $timeout, Team, $cordovaSQLite){
    
    var patient_url_epic = "https://open-ic.epic.com/argonaut/api/FHIR/Argonaut/Patient/" + localStorage.getItem('patientId_epic');//, $cordovaSQLite, Team
    console.log('patient_url_epic', patient_url_epic);
    
    $rootScope.name = "";
    $rootScope.birthday = "";
    $rootScope.gender = "";

    $rootScope.show();    

    $http({
        url: patient_url_epic, 
        method: "GET", 
        headers:{
            "Authorization": "Bearer " + localStorage.getItem('accessToken_epic')
        },
        timeout: 25000 })
        .success(function(data) {
            console.log("patient_data_epic: ", JSON.stringify(data));

            $rootScope.patient_data_epic = JSON.stringify(data);

            var birthdayValue = data.birthDate;
            var genderValue = data.gender;
            var name = data.name[0].given.join(" ") +" "+ data.name[0].family.join(" ");
            
            $rootScope.name = name;
            $rootScope.birthday = birthdayValue;
            $rootScope.gender = genderValue;

            console.log("name:", $rootScope.name);
            console.log("birthday:", $rootScope.birthday);
            console.log("gender:", $rootScope.gender);

            $rootScope.hide();

            console.log("expires_in_epic", localStorage.getItem('expires_in_epic'));
            var expires_time = parseInt(localStorage.getItem('expires_in_epic'));
            console.log("reap_expires_in_epic", (expires_time-5) * 1000);
            setTimeout(function(){
              localStorage.removeItem('accessToken_epic')
            }, expires_time * 1000);                                                                                        
        })
        .error(function(data, status){
            console.log("error data: ", data);
            $rootScope.hide();
            localStorage.removeItem('accessToken_epic');
            $rootScope.epic_auth_login();
        });


    // patient_data_epic button click function
    $rootScope.view_data = function(){
      $state.go('menu.patient_ccd_epic');
    }

    // go Epic patient ccd form
    $rootScope.download_continuity_of_care_document = function(){
        
        var patient_ccd_url = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/DocumentReference?patient="  + localStorage.getItem('patientId_epic');
        console.log("patient CCD base url: ", patient_ccd_url);
        
        $rootScope.show();

        $http({
                url: patient_ccd_url,
                method: "GET",
                headers:{
                },
                timeout: 25000})
            .success(function(data){
                console.log("CCD data: ", JSON.stringify(data));

                $rootScope.hide();

                var total = data.total;
                var count = parseInt(total);
                console.log("link's count: ", count);
                if(count == 0){
                    alert("Server Not Available.\nPlease try again.");
                }

                var resource_created = [], resource_text = [], resource_content = [];
                var resource_display_temp = [];

                for (var i = 0;i < count; i ++){
                    var temp = data.entry[i].resource.created;
                    resource_text[i] = data.entry[i].resource.class.text;

                    var currentdate = new Date().toLocaleDateString();
                    console.log('current date: ', currentdate);

                    resource_created[i] = currentdate;
                    resource_display_temp[i] = resource_text[i] + resource_created[i];
                    resource_content[i] = data.entry[i].resource.content[0].attachment.url;

                    if(!localStorage.getItem('index')){
                      var temp = 0;
                    }else{
                      temp = parseInt(localStorage.getItem('index'));
                    }

                    var member =  { id: temp, name: resource_display_temp[i], content: resource_content[i]};
                    $scope.createNewTeamMember(member);

                    localStorage.removeItem('index');
                    localStorage.setItem('index',temp + 1);

                    console.log("after adding team", $scope.team);
                    $state.go('popup_screen');
                }
            })
            .error(function(data, status){
                console.log("error data: ", data);
                alert("Server Not Available.\nPlease try again.");
                $rootScope.hide();
            });        
    }

    $scope.view_medical_records = function(){
        $state.go('menu.patient_ccd_epic');
    }

    $scope.download_medical_records = function(){

        var patient_ccd_url = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/DocumentReference?patient="  + localStorage.getItem('patientId_epic');
        console.log("patient CCD base url: ", patient_ccd_url);
        
        $rootScope.show();

        $http({
                url: patient_ccd_url,
                method: "GET",
                headers:{
                },
                timeout: 25000})
            .success(function(data){
                console.log("CCD data: ", JSON.stringify(data));

                $rootScope.hide();

                var total = data.total;
                var count = parseInt(total);
                console.log("link's count: ", count);
                if(count == 0){
                    alert("Server Not Available.\nPlease try again.");
                }

                var resource_created = [], resource_text = [], resource_content = [];
                var resource_display_temp = [];

                for (var i = 0;i < count; i ++){
                    var temp = data.entry[i].resource.created;
                    resource_text[i] = data.entry[i].resource.class.text;

                    var currentdate = new Date().toLocaleDateString();
                    console.log('current date: ', currentdate);

                    resource_created[i] = currentdate;
                    resource_display_temp[i] = resource_text[i] + resource_created[i];
                    resource_content[i] = data.entry[i].resource.content[0].attachment.url;

                    console.log(resource_created);
                    console.log(resource_text);
                    console.log(resource_content);

                    if(!localStorage.getItem('index')){
                      var temp = 0;
                    }else{
                      temp = parseInt(localStorage.getItem('index'));
                    }

                    console.log('temp',temp);
                    console.log('localStorage-temp',parseInt(localStorage.getItem('index')));
                    var member =  { id: temp, name: resource_display_temp[i], content: resource_content[i]};
                    $scope.createNewTeamMember(member);

                    localStorage.removeItem('index');
                    localStorage.setItem('index',temp + 1);

                    console.log("after adding team", $scope.team);
                    $state.go('popup_screen');                   
                }
            })
            .error(function(data, status){
                console.log("error data: ", data);
                alert("Server Not Available.\nPlease try again.");
                $rootScope.hide();
            });
    }

    $scope.team = [];
    $scope.team = null;

    $scope.updateTeam = function() {
      Team.all().then(function(team){
        $scope.team = team;
      });
    }

    $scope.updateTeam();

    $scope.createNewTeamMember = function(member) {
      Team.add(member);
      $scope.updateTeam();
    };

    $scope.removeMember = function(member) {
      Team.remove(member);
      $scope.updateTeam();
    };
    
    $scope.editMember = function(origMember, editMember) {
      Team.update(origMember, editMember);
      $scope.updateTeam();
    };

})

// Epic Patient CCD data getting and display controller
.controller('patient_ccd_epicCtrl', function($scope, $http, $ionicModal, $rootScope, $state, ionicMaterialInk, $timeout){
    var patient_ccd_url = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/DocumentReference?patient="  + localStorage.getItem('patientId_epic');
    console.log("patient CCD base url: ", patient_ccd_url);
    
    $rootScope.show();

    $http({
            url: patient_ccd_url,
            method: "GET",
            headers:{
            },
            timeout: 25000})
        .success(function(data){
            console.log("CCD data: ", JSON.stringify(data));

            $rootScope.hide();

            var total = data.total;
            var count = parseInt(total);
            console.log("link's count: ", count);
            if(count == 0){
                alert("Server Not Available.\nPlease try again.");
            }

            var resource_created = [], resource_text = [], resource_content = [];
            var resource_display_temp = [];

            for (var i = 0;i < count; i ++){
              var temp = data.entry[i].resource.created;
              resource_text[i] = data.entry[i].resource.class.text;

              var year = temp.substring(0, 4);
              var month = temp.substring(5, 7);
              var day = temp.substring(8, 10);

              var res1 = month.concat("/", day);
              var res2 = res1.concat("/", year);
              var date = " ".concat(res2);

              resource_created[i] = date;
              resource_display_temp[i] = resource_text[i] + resource_created[i];
              resource_content[i] = data.entry[i].resource.content[0].attachment.url;

              console.log(resource_created);
              console.log(resource_text);
              console.log(resource_content);
                
            }

            $scope.resource_display = resource_display_temp;
            $scope.resource_content_url = resource_content;

        })
        .error(function(data, status){
            console.log("error data: ", data);
            $rootScope.hide();
            alert("Server Not Available.\nPlease try again.");
        });
    
    $scope.Url_Click=function($index){
      $rootScope.hide();
      localStorage.removeItem('epic_ccd_detail_url');
      localStorage.setItem('epic_ccd_detail_url',$scope.resource_content_url[$index]);
      $state.go('menu.patient_ccd_epic_detail');
    }

})

//CCD detail link page
.controller('patient_ccd_epic_detailCtrl', function($scope, x2js, $http, $ionicModal, $rootScope, $state, ionicMaterialInk, $timeout, $sce){
    // CCD content url saving variable
    var patient_ccd_content_url = localStorage.getItem('epic_ccd_detail_url')
    console.log("patient CCD base url: ", patient_ccd_content_url);
    $scope.added_data = {
        xml: ''
    };

    $rootScope.show();

    $http({
            url: patient_ccd_content_url,
            method: "GET",
            headers:{
            },
            timeout: 25000})
        .success(function(data){
            console.log("CCD data without header: ", data);

            var header_added_xml_string ="<?xml version=\"1.0\" encoding=\"UTF-8\"?><?xml-stylesheet type='text/xsl' href='css/CDA.xsl'?>"+data;
            
            var xml_object = StringToXML(header_added_xml_string);
            console.log("CCD XML object: ", xml_object);
            
            var xml = xml_object;
            console.log("xml object: ",xml);
            var xsl = loadXMLDoc("css/CDA.xsl");
            console.log("xsl: ",xsl);

            $rootScope.hide();

            if (document.implementation && document.implementation.createDocument) {
                xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xsl);
                resultDocument = xsltProcessor.transformToFragment(xml, document);
                document.getElementById('container').appendChild(resultDocument);
            }
        })          
        .error(function(data, status){
            console.log("error data: ", data);
            alert("Server Not Available.\nPlease try again.");
            $rootScope.hide();
        });

    //Change String to XML
    function StringToXML(oString) {
         //code for IE
        if (window.ActiveXObject) { 
            var oXML = new ActiveXObject("Microsoft.XMLDOM"); oXML.loadXML(oString);
            return oXML;
        }
         // code for Chrome, Safari, Firefox, Opera, etc. 
        else {
            return (new DOMParser()).parseFromString(oString, "text/xml");
        }
    }

    // XML document loading
    function loadXMLDoc(filename) {
        if (window.ActiveXObject) {
             xhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } else {
             xhttp = new XMLHttpRequest();
        }
        xhttp.open("GET", filename, false);
        xhttp.send("");
        return xhttp.responseXML;
     }
})

.controller('popup_screenCtrl', function($scope, $http, $ionicModal, $rootScope, $state, ionicMaterialInk, $timeout){
  $scope.close_function = function(){
    $state.go("menu.mymedicalrecords");
  }
})

.controller('popup_screen_shareCtrl', function($scope, $http, $ionicModal, $rootScope, $state, ionicMaterialInk, $timeout){
  $scope.share_close_function = function(){
    $state.go("menu.mymedicalrecords");
  }
})

//Health Insurance controller.
.controller('source_health_insuranceCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $rootScope.hide();
    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $scope.connected_provider_name = '';
        $scope.connected_hospital_name = '';

        if(localStorage.getItem('accessToken_epic')){
            $scope.connected_provider_name = localStorage.getItem('provider_name');
        }else{
            $scope.connected_provider_name = '';
        }
    });

    $scope.selected_provider_name = function(){
        if(localStorage.getItem('provider_name')){
            if(localStorage.getItem('accessToken_epic')){
                $rootScope.epic_auth_login();
            }
            else{
                $rootScope.cerner_auth_login();
            }
        }else{
            console.log('there is not any action');
        }
    }

    $scope.download = function(){
        alert("Download from email or scan paper document.");
    }

    $scope.update_function = function(){
        var e_state = document.getElementById("selected_state");
        var selected_statename = e_state.options[e_state.selectedIndex].text;

        var e_provider = document.getElementById("selected_provider");
        var selected_provider = e_provider.options[e_provider.selectedIndex].text;
        
        if(selected_statename == "Virginia"){
            switch(selected_provider){
                case "ADVANTAGE Health Solutions, Inc.":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'ADVANTAGE Health Solutions, Inc.');
                    $rootScope.epic_auth_login();
                    break;
                case "Aetna":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Aetna');
                    $rootScope.epic_auth_login();
                    break;
                case "Altius Health Plans":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Altius Health Plans');
                    $rootScope.epic_auth_login();
                    break;
                case "Anthem Blue Cross":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Anthem Blue Cross');
                    $rootScope.epic_auth_login();
                    break;
                case "APWU Health Plan":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'APWU Health Plan');
                    $rootScope.epic_auth_login();
                    break;
                case "AvMed Health Plans, Inc":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','AvMed Health Plans, Inc');
                    $rootScope.epic_auth_login();
                    break;
                case "Blue Cross Blue Shield of Florida":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Blue Cross Blue Shield of Florida');
                    $rootScope.epic_auth_login();
                    break;
                case "Blue Cross Blue Shield of Louisiana":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Blue Cross Blue Shield of Louisiana');
                    $rootScope.epic_auth_login();
                    break;
                case "Blue Cross Blue Shield of Rhode Island":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Blue Cross Blue Shield of Rhode Island');
                    $rootScope.epic_auth_login();
                case "Captal Health Plan, Inc.":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Captal Health Plan, Inc.');
                    $rootScope.cerner_auth_login();
                    break;
                case "CareFirst BCBS":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','CareFirst BCBS');
                    $rootScope.cerner_auth_login();
                    break;
                case "CDPHP Universal Benefits Inc.":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','CDPHP Universal Benefits Inc.');
                    $rootScope.cerner_auth_login();
                    break;
                case "Centers for Medicare & Medicaid Services(CMS)":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Centers for Medicare & Medicaid Services(CMS)');
                    $rootScope.cerner_auth_login();
                    break;
                case "Coventy Health Care":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Coventy Health Care');
                    $rootScope.cerner_auth_login();
                    break;
                default:
                    alert("please select provider's name");
                    break;
            }
        }else{

        }
    }
})

//Providers controller
.controller('source_providersCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $rootScope.hide();
    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $scope.connected_provider_name = '';
        $scope.connected_hospital_name = '';

        if(localStorage.getItem('accessToken_epic')){
            $scope.connected_provider_name = localStorage.getItem('provider_name');
        }else{
            $scope.connected_provider_name = '';
        }
    });

    $scope.selected_provider_name = function(){
        if(localStorage.getItem('provider_name')){
            if(localStorage.getItem('accessToken_epic')){
                $rootScope.epic_auth_login();
            }
            else{
                $rootScope.cerner_auth_login();
            }
        }else{
            console.log('there is not any action');
        }
    }

    $scope.download = function(){
        alert("Download from email or scan paper document.");
    }

    $scope.update_function = function(){
        var e_state = document.getElementById("selected_state");
        var selected_statename = e_state.options[e_state.selectedIndex].text;

        var e_provider = document.getElementById("selected_provider");
        var selected_provider = e_provider.options[e_provider.selectedIndex].text;
        
        if(selected_statename == "Virginia"){
            switch(selected_provider){
                case "Dr. Kerri Gray, MD Primary Care Doctor":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Dr. Kerri Gray, MD Primary Care Doctor');
                    $rootScope.epic_auth_login();
                    break;
                case "Dr. Joseph T.McDonald, MD Internist":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Dr. Joseph T.McDonald, MD Internist');
                    $rootScope.epic_auth_login();
                    break;
                case "Dr. John Chuke, MD Internist":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Dr. John Chuke, MD Internist');
                    $rootScope.epic_auth_login();
                    break;
                case "Dr. Mary Benjamin, MD Internist":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Dr. Mary Benjamin, MD Internist');
                    $rootScope.epic_auth_login();
                    break;
                case "Dr. Timothy Koch, MD Gastroenterologist":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Dr. Timothy Koch, MD Gastroenterologist');
                    $rootScope.cerner_auth_login();
                    break;
                case "Dr. Christopher Warner, MD,FACOG OB-GYN":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Dr. Christopher Warner, MD,FACOG OB-GYN');
                    $rootScope.cerner_auth_login();
                    break;
                case "Dr. Alfreda Jones, MD OB-GYN":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Dr. Alfreda Jones, MD OB-GYN');
                    $rootScope.cerner_auth_login();
                    break;
                default:
                    alert("please select provider's name");
                    break;
            }
        }else{

        }
    }
})

//Pharmacy controller
.controller('source_pharmacyCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $rootScope.hide();
    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $scope.connected_provider_name = '';
        $scope.connected_hospital_name = '';

        if(localStorage.getItem('accessToken_epic')){
            $scope.connected_provider_name = localStorage.getItem('provider_name');
        }else{
            $scope.connected_provider_name = '';
        }
    });

    $scope.selected_provider_name = function(){
        if(localStorage.getItem('provider_name')){
            if(localStorage.getItem('accessToken_epic')){
                $rootScope.epic_auth_login();
            }
            else{
                $rootScope.cerner_auth_login();
            }
        }else{
            console.log('there is not any action');
        }
    }

    $scope.download = function(){
        alert("Download from email or scan paper document.");
    }

    $scope.update_function = function(){
        var e_state = document.getElementById("selected_state");
        var selected_statename = e_state.options[e_state.selectedIndex].text;

        var e_provider = document.getElementById("selected_provider");
        var selected_provider = e_provider.options[e_provider.selectedIndex].text;
        
        if(selected_statename == "Virginia"){
            switch(selected_provider){
                case "CVS Caremark":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'CVS Caremark');
                    $rootScope.epic_auth_login();
                    break;
                case "Fry`s Food Store":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Fry`s Food Store');
                    $rootScope.epic_auth_login();
                    break;
                case "King Soopers":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','King Soopers');
                    $rootScope.epic_auth_login();
                    break;
                case "Medstar Health":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Medstar Health');
                    $rootScope.epic_auth_login();
                    break;
                case "Medstar Union Memorial":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Medstar Union Memorial');
                    $rootScope.epic_auth_login();
                    break;
                case "PillPack":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','PillPack');
                    $rootScope.epic_auth_login();
                    break;
                case "Rite Aid":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Rite Aid');
                    $rootScope.cerner_auth_login();
                    break;
                case "Smith`s":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Smith`s');
                    $rootScope.cerner_auth_login();
                    break;
                case "Walgreens":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Walgreens');
                    $rootScope.cerner_auth_login();
                    break;
                default:
                    alert("please select provider's name");
                    break;
            }
        }else{

        }
    }
})

// Lab controller
.controller('source_labCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $rootScope.hide();
    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $scope.connected_provider_name = '';
        $scope.connected_hospital_name = '';

        if(localStorage.getItem('accessToken_epic')){
            $scope.connected_provider_name = localStorage.getItem('provider_name');
        }else{
            $scope.connected_provider_name = '';
        }
    });

    $scope.selected_provider_name = function(){
        if(localStorage.getItem('provider_name')){
            if(localStorage.getItem('accessToken_epic')){
                $rootScope.epic_auth_login();
            }
            else{
                $rootScope.cerner_auth_login();
            }
        }else{
            console.log('there is not any action');
        }
    }

    $scope.download = function(){
        alert("Download from email or scan paper document.");
    }

    $scope.update_function = function(){
        var e_state = document.getElementById("selected_state");
        var selected_statename = e_state.options[e_state.selectedIndex].text;
        
        var e_provider = document.getElementById("selected_provider");
        var selected_provider = e_provider.options[e_provider.selectedIndex].text;
        
        if(selected_statename == "Virginia"){
            switch(selected_provider){
                case "Health Diagnostic Laboratory Inc.":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Health Diagnostic Laboratory Inc.');
                    $rootScope.epic_auth_login();
                    break;
                case "LabCorp":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','LabCorp');
                    $rootScope.epic_auth_login();
                    break;
                case "Quest Diagnostics":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Quest Diagnostics');
                    $rootScope.cerner_auth_login();
                    break;
                case "UnitedHealth BiolQ":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','UnitedHealth BiolQ');
                    $rootScope.cerner_auth_login();
                    break;
                default:
                    alert("please select provider's name");
                    break;
            }
        }else{

        }
    }

})

//Immunization Registry controller
.controller('source_immunization_registryCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $rootScope.hide();
    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $scope.connected_provider_name = '';
        $scope.connected_hospital_name = '';

        if(localStorage.getItem('accessToken_epic')){
            $scope.connected_provider_name = localStorage.getItem('provider_name');
        }else{
            $scope.connected_provider_name = '';
        }
    });

    $scope.selected_provider_name = function(){
        if(localStorage.getItem('provider_name')){
            if(localStorage.getItem('accessToken_epic')){
                $rootScope.epic_auth_login();
            }
            else{
                $rootScope.cerner_auth_login();
            }
        }else{
            console.log('there is not any action');
        }
    }

    $scope.download = function(){
        alert("Download from email or scan paper document.");
    }

    $scope.update_function = function(){
        var e_state = document.getElementById("selected_state");
        var selected_statename = e_state.options[e_state.selectedIndex].text;

        var e_provider = document.getElementById("selected_provider");
        var selected_provider = e_provider.options[e_provider.selectedIndex].text;
        
        if(selected_statename == "Virginia"){
            switch(selected_provider){
                case "Inova Alexandria Hospital":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Inova Alexandria Hospital');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Hospital Fairfax County System":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fairfax Hospital Fairfax County System');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Hospital Fairfax County System Georgetown Medical School":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fairfax Hospital Fairfax County System Georgetown Medical School');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Hospital Fairfax County System George Washington University Medical School":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fairfax Hospital Fairfax County System George Washington University Medical School');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fairfax Childrens Hospital":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name', 'Inova Fairfax Childrens Hospital');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Fair Oaks Hospital Fairfax":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Fair Oaks Hospital Fairfax');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Loudoun Hospital Leesburg":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Loudoun Hospital Leesburg');
                    $rootScope.epic_auth_login();
                    break;
                case "Inova Mount Vernon Hospital Alexandria":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Inova Mount Vernon Hospital Alexandria');
                    $rootScope.epic_auth_login();
                    break;
                case "Cape Fear Valley-Bladen County Hospital":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Cape Fear Valley-Bladen County Hospital');
                    $rootScope.cerner_auth_login();
                    break;
                case "Cape Fear Valley Hoke Hospital Raeford":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Cape Fear Valley Hoke Hospital Raeford');
                    $rootScope.cerner_auth_login();
                    break;
                case "Cape Fear Valley Medical Center Fayetteville":
                    localStorage.removeItem('provider_name');
                    localStorage.setItem('provider_name','Cape Fear Valley Medical Center Fayetteville');
                    $rootScope.cerner_auth_login();
                    break;
                default:
                    alert("please select provider's name");
                    break;
            }
        }else{

        }
    }
})


// Share Health Records list item click functions
.controller('share_hospital_clinicCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    
})

.controller('share_providersCtrl', function($scope, $ionicScrollDelegate, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory){
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $rootScope.hide();
    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $rootScope.hide();
    });
  
    $scope.download = function(){
        alert("Download from email or scan paper document.");
    }

    $scope.send_function = function(){
        $state.go("popup_screen_share");
    }
})



.controller('registerCtrl', function ($scope, $ionicModal, $rootScope, $state, homeFactory, ionicMaterialInk, $timeout) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var locale = '';
        $scope.gender = "1";
        $scope.emailValidation = true;
        $scope.passwordValidation = true;
        $scope.firstNameValidation = true;
        $scope.zipCodeValidation = true;
        $scope.dobValidation = true;
        $scope.myModel = {
            phonenumber: ' '
        }
        var todayDate = new Date();

        var n = todayDate.getTime() / 1000.0;
        n = n - (31556926 * 20);
        $scope.dob = new Date(n * 1000);

        var dd = todayDate.getDate();
        var mm = todayDate.getMonth() + 1; //January is 0!
        var yyyy = todayDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        $scope.maxDate = yyyy + '-' + mm + '-' + dd;
        $scope.promoValidation = true;

        if (localStorage.getItem('preferLanguage'))
            $rootScope.language = localStorage.getItem('preferLanguage');
        else
            $rootScope.language = 'english';
        if (localStorage.getItem('userFontSize') == 'smaller') {
            $scope.fontSize = 'smaller';
            $scope.smallFont = true;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = false;
        } else if (localStorage.getItem('userFontSize') == 'large') {
            $scope.fontSize = 'large';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = true;
            $scope.largerFont = false;
        } else if (localStorage.getItem('userFontSize') == 'larger') {
            $scope.fontSize = 'larger';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = true;
        } else {
            $scope.fontSize = 'normal';
            $scope.smallFont = false;
            $scope.normalFont = true;
            $scope.largeFont = false;
            $scope.largerFont = false;
        }

    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $rootScope.hide();
    });

    $scope.changeLanguage = function (lang) {
        if (lang == 'english') {
            $rootScope.label = appConstant.english.label;
            $rootScope.message = appConstant.english.message;
            $rootScope.speciality = appConstant.english.speciality;
            $rootScope.months = appConstant.english.months;
            $rootScope.exercise = appConstant.english.exercise;
            $rootScope.alcoholQuestions = appConstant.english.alcoholQuestions;
            $rootScope.faqData = faqConstant.english;
            localStorage.setItem('preferLanguage', 'english');
        } else {
            $rootScope.label = appConstant.spanish.label;
            $rootScope.message = appConstant.spanish.message;
            $rootScope.speciality = appConstant.spanish.speciality;
            $rootScope.months = appConstant.spanish.months;
            $rootScope.exercise = appConstant.spanish.exercise;
            $rootScope.alcoholQuestions = appConstant.spanish.alcoholQuestions;
            $rootScope.faqData = faqConstant.spanish;
            localStorage.setItem('preferLanguage', 'spanish');
        }

    };

    $rootScope.openLinkWellness = function (mhi) {
        var link = '';
        link = url + mhi;
        link = 'https://docs.google.com/viewer?url=' + encodeURIComponent(link);
        window.open(link, '_blank', 'location=no');
    };

    if (localStorage.getItem('preferLanguage'))
        $scope.language = localStorage.getItem('preferLanguage');
    else
        $scope.language = 'english';

    $scope.fontSize = 'normal';
    $scope.addCSS = function (font) {
        if (font == "smaller") {
            $rootScope.layout = 'styleNew';
            $rootScope.mediaLayout = 'mediaQuery';
            $scope.smallFont = true;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = false;
        } else if (font == "large") {
            $rootScope.layout = 'styleLarge';
            $rootScope.mediaLayout = 'mediaLarge';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = true;
            $scope.largerFont = false;
        } else
        if (font == "larger") {
            $rootScope.layout = 'styleLarger';
            $rootScope.mediaLayout = 'mediaLarger';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = true;
        } else {
            $rootScope.layout = 'style';
            $rootScope.mediaLayout = 'mediaQuery';
            $scope.smallFont = false;
            $scope.normalFont = true;
            $scope.largeFont = false;
            $scope.largerFont = false;
        }

        $scope.fontSize = font;

        localStorage.setItem('userFontSize', font);
        $scope.closeFontModal();
    }

    $ionicModal.fromTemplateUrl('langModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.langModal = modal;
    });
    $scope.openLangModal = function (lang) {
        $scope.langModal.show();
    };
    $scope.closeLangModal = function (lang) {
        $rootScope.changeLanguage(lang);
        $scope.langModal.hide();
    };
    $ionicModal.fromTemplateUrl('fontModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.fontModal = modal;
    });
    $scope.openFontModal = function () {
        $scope.fontModal.show();
    };
    $scope.closeFontModal = function () {
        $scope.fontModal.hide();
    };

    $scope.checkPasswordLength = function (password) {
        if (password.length < 6) {
            $scope.passwordValidation = false;
            $scope.validPassword = true;
        } else {
            $scope.passwordValidation = true;
            $scope.validPassword = false;
        }
    };

    $scope.resetValidation = function () {
        $scope.emailverifyvar = false;
        $scope.emailValidation = true;
    }

    $scope.register = function () {
        if (localStorage.getItem('preferLanguage') == 'english') {
            locale = 'en';
        } else {
            locale = 'es';
        }
        $rootScope.show();
        var UserData = {
            email: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            dob: Date.parse($scope.dob),
            gender: $scope.gender,
            address: {
                zipCode: $scope.zipcode
            },
            cell: $scope.myModel.phonenumber,
            promoCode: $scope.promo,
            consents: [{
                code: "PP",
                value: $scope.privacy
							}, {
                code: "HA",
                value: $scope.hippa
							}, {
                code: "EM",
                value: $scope.notification
						}]
        };

        $scope.emailverifyvar = false;
        $scope.emailValidation = false;
        var link = 'checkEmail?emailId=' + $scope.email;
        homeFactory
            .apiCall(link, 'GET', $scope.email)
            .then(
                function (result) {
                    $scope.response = result.data;
                    if ($scope.response.data == false) {
                        $scope.emailverifyvar = true;

                        $rootScope.hide();

                        navigator.notification.alert(
                            $rootScope.message.common.emailExistError, // message
                            $rootScope.none, // callback
                            $rootScope.label.common.invalid, // title
                            $rootScope.label.common.done // buttonName
                        );

                    } else {
                        $scope.emailverifyvar = false;

                        $scope.promoverifyvar = true;
                        $scope.promoValidation = false;
                        if ($scope.promo) {
                            var link = 'checkPromoCode/' + $scope.promo + '/0';
                            homeFactory
                                .apiCall(link, 'GET', $scope.promo)
                                .then(
                                    function (result) {
                                        $scope.response = result.data;
                                        if ($scope.response.data == true) {
                                            $scope.promoverifyvar = true;
                                            var link = 'register?locale=' + locale;
                                            homeFactory.apiCall(link, 'POST', UserData).then(
                                                function (response) {
                                                    $rootScope.hide();
                                                    if (response.status == 200) {
                                                        if (response.data.success == true) {
                                                            navigator.notification.confirm(
                                                                $rootScope.message.register.registerSuccess, //message
                                                                $scope.goToLogin, //callback
                                                                $rootScope.label.common.success, //title 
                                                                [$rootScope.label.common.done] //buttonName
                                                            );
                                                        } else {
                                                            navigator.notification.alert(
                                                                $rootScope.message.common.miscError, // message
                                                                $rootScope.none, // callback
                                                                $rootScope.label.common.invalid, // title
                                                                $rootScope.label.common.done // buttonName
                                                            );
                                                        }
                                                    } else {
                                                        navigator.notification.alert(
                                                            $rootScope.message.common.miscError, // message
                                                            $rootScope.none, // callback
                                                            $rootScope.label.common.invalid, // title
                                                            $rootScope.label.common.done // buttonName
                                                        );
                                                    }

                                                });
                                        } else {
                                            $scope.promoverifyvar = false;
                                            $rootScope.hide();

                                            navigator.notification.alert(
                                                $rootScope.message.common.promocodeError, // message
                                                $rootScope.none, // callback
                                                $rootScope.label.common.invalid, // title
                                                $rootScope.label.common.done // buttonName
                                            );
                                        }

                                    });
                        } else {

                            var link = 'register?locale=' + locale;
                            homeFactory.apiCall(link, 'POST', UserData).then(
                                function (response) {
                                    $rootScope.hide();
                                    if (response.status == 200) {
                                        if (response.data.success == true) {
                                            navigator.notification.confirm(
                                                $rootScope.message.register.registerSuccess, //message
                                                $scope.goToLogin, //callback
                                                $rootScope.label.common.success, //title 
                                                [$rootScope.label.common.done] //buttonName
                                            );
                                            $scope.email = '';
                                            $scope.password = '';
                                            $scope.firstName = '';
                                            $scope.lastName = '';
                                            $scope.zipcode = '';
                                            $scope.myModel.phonenumber = '';
                                            $scope.promo = '';
                                            $scope.privacy = false;
                                            $scope.hippa = false;
                                            $scope.notification = false;

                                        } else {
                                            navigator.notification.alert(
                                                $rootScope.message.common.miscError, // message
                                                $rootScope.none, // callback
                                                $rootScope.label.common.invalid, // title
                                                $rootScope.label.common.done // buttonName
                                            );
                                        }
                                    } else {
                                        navigator.notification.alert(
                                            $rootScope.message.common.miscError, // message
                                            $rootScope.none, // callback
                                            $rootScope.label.common.invalid, // title
                                            $rootScope.label.common.done // buttonName
                                        );
                                    }

                                });
                        }
                    }
                });
    }

    $scope.goToLogin = function (buttonIndex) {
        if (buttonIndex == 1) {
            $state.go('login');
        }
    }

})

.controller('loginCtrl', function ($scope, $http, $rootScope, $state, $ionicLoading, $timeout, $interval, $ionicHistory, $ionicPlatform, $ionicViewService, homeFactory) {

    $ionicPlatform.registerBackButtonAction(function (event) {
        if ($state.current.name == "login") {
            navigator.app.exitApp();
        } else {
            $ionicHistory.goBack()
            navigator.app.backHistory();
        }
    }, 100);

    var loginTime;
    
    $rootScope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });

    };
    
    $rootScope.none = function () {};

    $rootScope.goToSignup = function () {
        $rootScope.show();
        $timeout(function () {
            $state.go('register');
        }, 2000);
    };

    $rootScope.goToForgotPassword = function () {
        $rootScope.show();
        $timeout(function () {
            $state.go('forgotPassword');
        }, 2000);
    };

    $rootScope.hide = function () {
        $ionicLoading.hide();
    };
    $rootScope.loginSuccess = function () {
        $rootScope.hide();
        $rootScope.showFooter = true;
        $state.go('menu.homepage');
    }

    $scope.login = function (values) {
        $rootScope.hide();
        $rootScope.showFooter = true;
        if (values) {
            $rootScope.show();
            homeFactory
                .apiCall('authenticate', 'POST', values)
                .then(
                    function (response) {
                        $rootScope.hide();
                        if (response.status == 200) {
                            $rootScope.hide();
                            if (response.data.success == false) {
                                $scope.validateCredentials = true;
                                $scope.alertMessage = response.data.message;
                                navigator.notification.alert(
                                    $rootScope.message.common.loginCredentialError, // message
                                    $rootScope.none, // callback
                                    $rootScope.label.common.invalid, // title
                                    $rootScope.label.common.done // buttonName
                                );
                                return false;
                            } else {
                                if (response.data.data.roleName == 'patient') {
                                    localStorage.setItem('userLoginData', JSON.stringify(values));
                                    localStorage.setItem('emailId', values.emailID);
                                    $scope.details = response.data;
                                    localStorage.setItem('userId', $scope.details.data.userId);

                                    var year = new Date(parseInt($scope.details.data.dob)).getFullYear();

                                    var d = new Date();
                                    var n = d.getFullYear();
                                    $rootScope.userAge = n - year;
                                    if ($scope.details.data.gender == 1)
                                        $rootScope.userGender = 'Male';
                                    else
                                        $rootScope.userGender = 'Female';

                                    $rootScope.userExamPhysicianName = $scope.details.data.physicianName;
                                    $rootScope.userZipcode = $scope.details.data.zipCode;
                                    $rootScope.promotionalMessage = $scope.details.data.promotionalText;

                                    var userExamDate = new Date(parseInt($scope.details.data.wellnessExamDate));
                                    var date = userExamDate.getDate();
                                    var month = userExamDate.getMonth() + 1;
                                    var year = userExamDate.getFullYear();

                                    $rootScope.examTakenDate = date + '/' + month + '/' + year;

                                    if ($scope.details.data.employee == false) {
                                        $rootScope.employee = false;
                                        $rootScope.patient = true;
                                        $rootScope.examNotTaken = false;
                                        $rootScope.examTaken = false;
                                        $rootScope.examCompleted = false;
                                    } else {
                                        $rootScope.employee = true;
                                        $rootScope.patient = false;

                                        if ($scope.details.data.wellnessExamStatus == 2) {
                                            $rootScope.examCompleted = true;
                                            $rootScope.examNotTaken = false;
                                            $rootScope.examTaken = false;
                                        } else if ($scope.details.data.wellnessExamStatus == 1) {
                                            $rootScope.examNotTaken = false;
                                            $rootScope.examTaken = true;
                                            $rootScope.examCompleted = false;
                                        } else {
                                            $rootScope.examNotTaken = true;
                                            $rootScope.examTaken = false;
                                            $rootScope.examCompleted = false;
                                        }
                                    }

                                    $rootScope.showFooter = true;
                                    loginTime = response.data.data.lastLoginDateTime;
                                    first = 0;
                                    localStorage.setItem('dashboardData', '');
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
                                        //$window.location.reload(true);
                                    if (response.data.data.lastLoginDateTime == null) {
                                        navigator.notification.confirm(
                                            $rootScope.label.login.welcomeMessage, // message
                                            $scope.welcome, // callback to invoke with index of button pressed
                                            $rootScope.label.login.welcomeTitle, // title
                                            [$rootScope.label.common.yesText, $rootScope.label.common.cancelText] // buttonLabels
                                        );
                                    } else {
                                        // alert("after login");
                                        $state.go('menu.homepage');
                                        // $scope.getMHIData();
                                    }

                                } else {
                                    navigator.notification.alert(
                                        $rootScope.message.common.authorisationError, // message
                                        $rootScope.none, // callback
                                        $rootScope.label.common.invalid, // title
                                        $rootScope.label.common.done // buttonName
                                    );
                                }
                            }

                        }

                    });
        } else {
            navigator.notification.alert(
                $rootScope.message.common.loginCredentialError, // message
                $rootScope.none, // callback
                $rootScope.label.common.invalid, // title
                $rootScope.label.common.done // buttonName
            );
        }

    };

    $scope.getMHIData = function () {
        $rootScope.show();

        var id = localStorage.getItem('userId');
        var link = 'getMHIStatus/' + id;
        homeFactory
            .apiCall(link, 'GET', id)
            .then(
                function (response) {
                    $rootScope.hide();
                    $scope.result = response.data;
                    localStorage.setItem('dashboardData', JSON.stringify(response.data));
                    if (loginTime != null) {
                        $state.go('menu.homepage');
                    }

                });
    }

    $rootScope.welcome = function (buttonIndex) {
        if (buttonIndex == 1) {
            $scope.getMHIData();
            $ionicViewService.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('menu.bmiEdit');
        } else {
            first = 0;
            $state.go('menu.homepage');
        }
    }
})

.controller('forgotPasswordCtrl', function ($scope, $state, $rootScope, $ionicHistory, homeFactory, $timeout) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var locale = '';
        $rootScope.hide();
        $scope.resetEmailValidation = true;

    });
    $scope.resetPassword = function (value) {
        if (localStorage.getItem('preferLanguage') == 'english') {
            locale = 'en';
        } else {
            locale = 'es';
        }

        $scope.emailverifyvar = false;
        $scope.resetEmailValidation = false;
        if (value) {
            $rootScope.show();
            var email = value;
            var link = 'checkEmail?emailId=' + email;
            homeFactory
                .apiCall(link, 'GET', email)
                .then(
                    function (result) {

                        $scope.response = result.data;
                        if ($scope.response.data == false) {
                            $scope.resetEmailValidation = true;
                            $scope.emailverifyvar = true;
                            var email = value;
                            var link = 'forgotPassword?emailId=' + email + '&locale=' + locale;
                            homeFactory
                                .apiCall(link, 'GET', email)
                                .then(
                                    function (response) {
                                        $rootScope.hide();
                                        $scope.result = response.data;
                                        console.log(response);
                                        if ($scope.result.data == true) {
                                            navigator.notification.confirm(
                                                $rootScope.message.forgotPassword.resetPasswordMessage, // message
                                                $scope.resetSuccess, // callback
                                                $rootScope.label.common.success, // title
                                                [$rootScope.label.common.done] // buttonName
                                            );
                                        } else {
                                            navigator.notification.alert(
                                                $rootScope.message.common.emailNotExistError, // message
                                                $rootScope.none, // callback
                                                $rootScope.label.common.invalid, // title
                                                $rootScope.label.common.done // buttonName
                                            );
                                        }
                                    });
                        } else {
                            $scope.emailverifyvar = false;



                            $rootScope.hide();
                            navigator.notification.alert(
                                $rootScope.message.common.emailNotExistError, // message
                                $rootScope.none, // callback
                                $rootScope.label.common.invalid, // title
                                $rootScope.label.common.done // buttonName
                            );
                        }
                    });
        }
    }

    $scope.resetSuccess = function (index) {
        $state.go('login');
    }
})

.controller('dashboardCtrl', function ($scope, $rootScope, $timeout, $state, $ionicPlatform, ionicMaterialInk, $ionicHistory, $ionicModal, $ionicLoading, homeFactory, $ionicPopup) {

    $ionicModal.fromTemplateUrl('langModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.langModal = modal;
    });
    $rootScope.openLangModal = function () {
        if (localStorage.getItem('preferLanguage')) {
            $scope.language = localStorage.getItem('preferLanguage');

        } else {
            $scope.language = 'english';

        }
        $scope.langModal.show();
    };


    $rootScope.closeLanguageModal = function (lang) {
        $scope.langModal.hide();
    }
    $rootScope.closeLangModal = function (lang) {

        $rootScope.changeLanguage(lang);
        if (localStorage.getItem('preferLanguage') == 'english') {
            $rootScope.lastHealthCheckup = appConstant.english.label.common.lastHealthCheckupText;
        } else {
            $rootScope.lastHealthCheckup = appConstant.spanish.label.common.lastHealthCheckupText;
        }
        $scope.langModal.hide();

    };
    var index;
    var greenMHI = 0;
    var redMHI = 0;
    var yellowMHI = 0;
    var naMHI = 0;
    var notApplicable = 0;
    var totalMHI = 0;
    var greenMHIStatus = [];
    var yellowMHIStatus = [];
    var redMHIStatus = [];
    var naMHIStatus = [];
    var notApplicableMHIStatus = [];

    $rootScope.indicatorCalculation = function (data) {
        $scope.nutritionHealthy = false;
        $scope.nutritionRisk = false;
        $scope.nutritionNA = true;
        $scope.exerciseHealthy = false;
        $scope.exerciseRisk = false;
        $scope.exerciseNA = true;
        $scope.cardioHealthy = false;
        $scope.cardioRisk = false;
        $scope.cardioHighRisk = false;
        $scope.cardioNA = true;
        $scope.sleepHealthy = false;
        $scope.sleepRisk = false;
        $scope.sleepHighRisk = false;
        $scope.sleepNA = true;
        $scope.waistHealthy = false;
        $scope.waistHighRisk = false;
        $scope.waistNA = true;
        $scope.diabetesHealthy = false;
        $scope.diabetesRisk = false;
        $scope.diabetesHighRisk = false;
        $scope.diabetesNA = true;
        $scope.smokingHealthy = false;
        $scope.smokingHighRisk = false;
        $scope.smokingNA = true;
        $scope.hypertensionHealthy = false;
        $scope.hypertensionRisk = false;
        $scope.hypertensionHighRisk = false;
        $scope.hypertensionNA = true;
        $scope.depressionHealthy = false;
        $scope.depressionRisk = false;
        $scope.depressionHighRisk = false;
        $scope.depressionNA = true;
        $scope.bmiHealthy = false;
        $scope.bmiRisk = false;
        $scope.bmiHighRisk = false;
        $scope.bmiNA = true;
        $scope.alcoholHealthy = false;
        $scope.alcoholRisk = false;
        $scope.alcoholHighRisk = false;
        $scope.alcoholNA = true;
        greenMHI = 0;
        redMHI = 0;
        yellowMHI = 0;
        notApplicable = 0;
        naMHI = 16;
        totalMHI = 0;
        greenMHIStatus = [];
        yellowMHIStatus = [];
        redMHIStatus = [];
        naMHIStatus = [];
        naMHIStatus = [$rootScope.label.alcoholView.title, $rootScope.label.bmiView.title, $rootScope.label.exerciseView.title, $rootScope.label.depressionView.title, $rootScope.label.waistView.title, $rootScope.label.dietView.title, $rootScope.label.smokingView.title, $rootScope.label.sleepView.title, $rootScope.label.hyperTensionView.title, $rootScope.label.dibetesView.title, $rootScope.label.cardiovascularView.title, $rootScope.label.cancerView.prostateCancer, $rootScope.label.cancerView.colonCancer, $rootScope.label.cancerView.breastCancer, $rootScope.label.cancerView.cervicalCancer, $rootScope.label.cancerView.lungCancer];
        notApplicableMHIStatus = [];
        $scope.result = data;
        for (var i = 0; i < $scope.result.data.length; i++) {
            switch ($scope.result.data[i].indicatorCode) {
                case 'Alcohol':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.alcoholHealthy = true;
                            $scope.alcoholRisk = false;
                            $scope.alcoholHighRisk = false;
                            $scope.alcoholNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.alcoholView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.alcoholView.title);
                            break;
                        case 'YELLOW':
                            $scope.alcoholHealthy = false;
                            $scope.alcoholRisk = true;
                            $scope.alcoholHighRisk = false;
                            $scope.alcoholNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.alcoholView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.alcoholView.title);
                            break;
                        case 'RED':
                            $scope.alcoholHealthy = false;
                            $scope.alcoholRisk = false;
                            $scope.alcoholHighRisk = true;
                            $scope.alcoholNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.alcoholView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.alcoholView.title);
                            break;
                        default:
                            $scope.alcoholHealthy = false;
                            $scope.alcoholRisk = false;
                            $scope.alcoholHighRisk = false;
                            $scope.alcoholNA = true;


                    }
                    break;
                case 'BMI':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.bmiHealthy = true;
                            $scope.bmiRisk = false;
                            $scope.bmiHighRisk = false;
                            $scope.bmiNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.bmiView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.bmiView.title);
                            break;
                        case 'YELLOW':
                            $scope.bmiHealthy = false;
                            $scope.bmiRisk = true;
                            $scope.bmiHighRisk = false;
                            $scope.bmiNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.bmiView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.bmiView.title);
                            break;
                        case 'RED':
                            $scope.bmiHealthy = false;
                            $scope.bmiRisk = false;
                            $scope.bmiHighRisk = true;
                            $scope.bmiNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.bmiView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.bmiView.title);
                            break;
                        default:
                            $scope.bmiHealthy = false;
                            $scope.bmiRisk = false;
                            $scope.bmiHighRisk = false;
                            $scope.bmiNA = true;

                    }
                    break;
                case 'Depression':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.depressionHealthy = true;
                            $scope.depressionRisk = false;
                            $scope.depressionHighRisk = false;
                            $scope.depressionNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.depressionView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.depressionView.title);
                            break;
                        case 'YELLOW':
                            $scope.depressionHealthy = false;
                            $scope.depressionRisk = true;
                            $scope.depressionHighRisk = false;
                            $scope.depressionNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.depressionView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.depressionView.title);
                            break;
                        case 'RED':
                            $scope.depressionHealthy = false;
                            $scope.depressionRisk = false;
                            $scope.depressionHighRisk = true;
                            $scope.depressionNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.depressionView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.depressionView.title);
                            break;
                        default:
                            $scope.depressionHealthy = false;
                            $scope.depressionRisk = false;
                            $scope.depressionHighRisk = false;
                            $scope.depressionNA = true;



                    }
                    break;
                case 'Hypertension':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.hypertensionHealthy = true;
                            $scope.hypertensionRisk = false;
                            $scope.hypertensionHighRisk = false;
                            $scope.hypertensionNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.hyperTensionView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.hyperTensionView.title);
                            break;
                        case 'YELLOW':
                            $scope.hypertensionHealthy = false;
                            $scope.hypertensionRisk = true;
                            $scope.hypertensionHighRisk = false;
                            $scope.hypertensionNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.hyperTensionView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.hyperTensionView.title);
                            break;
                        case 'RED':
                            $scope.hypertensionHealthy = false;
                            $scope.hypertensionRisk = false;
                            $scope.hypertensionHighRisk = true;
                            $scope.hypertensionNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.hyperTensionView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.hyperTensionView.title);
                            break;
                        default:
                            $scope.hypertensionHealthy = false;
                            $scope.hypertensionRisk = false;
                            $scope.hypertensionHighRisk = false;
                            $scope.hypertensionNA = true;


                    }
                    break;
                case 'Last Health Checkup':
                    $rootScope.healthCheckupData = $scope.result.data[i];
                    break;
                case 'Smoking':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.smokingHealthy = true;
                            $scope.smokingHighRisk = false;
                            $scope.smokingNA = false;
                            $rootScope.lungCheck = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.smokingView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.smokingView.title);
                            break;
                        case 'RED':
                            $scope.smokingHealthy = false;
                            $scope.smokingHighRisk = true;
                            $scope.smokingNA = false;
                            $rootScope.lungCheck = true;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.smokingView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.smokingView.title);
                            break;
                        default:
                            $scope.smokingHealthy = false;
                            $scope.smokingHighRisk = false;
                            $scope.smokingNA = true;
                            $rootScope.lungCheck = false;


                    }
                    break;
                case 'Diabetes':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.diabetesHealthy = true;
                            $scope.diabetesRisk = false;
                            $scope.diabetesHighRisk = false;
                            $scope.diabetesNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.dibetesView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.dibetesView.title);
                            break;
                        case 'YELLOW':
                            $scope.diabetesHealthy = false;
                            $scope.diabetesRisk = true;
                            $scope.diabetesHighRisk = false;
                            $scope.diabetesNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.dibetesView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.dibetesView.title);
                            break;
                        case 'RED':
                            $scope.diabetesHealthy = false;
                            $scope.diabetesRisk = false;
                            $scope.diabetesHighRisk = true;
                            $scope.diabetesNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.dibetesView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.dibetesView.title);
                            break;
                        default:
                            $scope.diabetesHealthy = false;
                            $scope.diabetesRisk = false;
                            $scope.diabetesHighRisk = false;
                            $scope.diabetesNA = true;

                    }
                    break;
                case 'Waist Circumference':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.waistHealthy = true;
                            $scope.waistHighRisk = false;
                            $scope.waistNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.waistView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.waistView.title);
                            break;
                        case 'RED':
                            $scope.waistHealthy = false;
                            $scope.waistHighRisk = true;
                            $scope.waistNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.waistView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.waistView.title);
                            break;
                        default:
                            $scope.waistHealthy = false;
                            $scope.waistHighRisk = false;
                            $scope.waistNA = true;


                    }
                    break;
                case 'Sleep':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.sleepHealthy = true;
                            $scope.sleepRisk = false;
                            $scope.sleepHighRisk = false;
                            $scope.sleepNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.sleepView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.sleepView.title);
                            break;
                        case 'YELLOW':
                            $scope.sleepHealthy = false;
                            $scope.sleepRisk = true;
                            $scope.sleepHighRisk = false;
                            $scope.sleepNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.sleepView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.sleepView.title);
                            break;
                        case 'RED':
                            $scope.sleepHealthy = false;
                            $scope.sleepRisk = false;
                            $scope.sleepHighRisk = true;
                            $scope.sleepNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.sleepView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.sleepView.title);
                            break;
                        default:
                            $scope.sleepHealthy = false;
                            $scope.sleepRisk = false;
                            $scope.sleepHighRisk = false;
                            $scope.sleepNA = true;


                    }
                    break;
                case 'Cardio':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.cardioHealthy = true;
                            $scope.cardioRisk = false;
                            $scope.cardioHighRisk = false;
                            $scope.cardioNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.cardiovascularView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.cardiovascularView.title);
                            break;
                        case 'YELLOW':
                            $scope.cardioHealthy = false;
                            $scope.cardioRisk = true;
                            $scope.cardioHighRisk = false;
                            $scope.cardioNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.cardiovascularView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.cardiovascularView.title);
                            break;
                        case 'RED':
                            $scope.cardioHealthy = false;
                            $scope.cardioRisk = false;
                            $scope.cardioHighRisk = true;
                            $scope.cardioNA = false;
                            redMHI++;
                            naMHI--;
                            redMHIStatus.push($rootScope.label.cardiovascularView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.cardiovascularView.title);
                            break;
                        default:
                            $scope.cardioHealthy = false;
                            $scope.cardioRisk = false;
                            $scope.cardioHighRisk = false;
                            $scope.cardioNA = true;


                    }
                    break;
                case 'Exercise':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.exerciseHealthy = true;
                            $scope.exerciseRisk = false;
                            $scope.exerciseNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.exerciseView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.exerciseView.title);
                            break;
                        case 'YELLOW':
                            $scope.exerciseHealthy = false;
                            $scope.exerciseRisk = true;
                            $scope.exerciseNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.exerciseView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.exerciseView.title);
                            break;
                        default:
                            $scope.exerciseHealthy = false;
                            $scope.exerciseRisk = false;
                            $scope.exerciseNA = true;


                    }
                    break;
                case 'Nutrition':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            $scope.nutritionHealthy = true;
                            $scope.nutritionRisk = false;
                            $scope.nutritionNA = false;
                            greenMHI++;
                            naMHI--;
                            greenMHIStatus.push($rootScope.label.dietView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.dietView.title);
                            break;
                        case 'YELLOW':
                            $scope.nutritionHealthy = false;
                            $scope.nutritionRisk = true;
                            $scope.nutritionNA = false;
                            yellowMHI++;
                            naMHI--;
                            yellowMHIStatus.push($rootScope.label.dietView.title);
                            $scope.removeIndicatorFromNA($rootScope.label.dietView.title);
                            break;
                        default:
                            $scope.nutritionHealthy = false;
                            $scope.nutritionRisk = false;
                            $scope.nutritionNA = true;


                    }
                    break;
                case 'Prostate Cancer':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            naMHI--;
                            greenMHI++;
                            greenMHIStatus.push($rootScope.label.cancerView.prostateCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.prostateCancer);
                            break;
                        case 'YELLOW':
                            naMHI--;
                            yellowMHI++;
                            yellowMHIStatus.push($rootScope.label.cancerView.prostateCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.prostateCancer);
                            break;
                        default:


                    }
                    break;
                case 'Lung Cancer':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            naMHI--;
                            greenMHI++;
                            greenMHIStatus.push($rootScope.label.cancerView.lungCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.lungCancer);
                            break;
                        case 'YELLOW':
                            naMHI--;
                            yellowMHI++;
                            yellowMHIStatus.push($rootScope.label.cancerView.lungCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.lungCancer);
                            break;
                        default:

                    }
                    break;
                case 'Colon Cancer':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            naMHI--;
                            greenMHI++;
                            greenMHIStatus.push($rootScope.label.cancerView.colonCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.colonCancer);
                            break;
                        case 'YELLOW':
                            naMHI--;
                            yellowMHI++;
                            yellowMHIStatus.push($rootScope.label.cancerView.colonCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.colonCancer);
                            break;
                        default:


                    }
                    break;
                case 'Breast Cancer':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            naMHI--;
                            greenMHI++;
                            greenMHIStatus.push($rootScope.label.cancerView.breastCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.breastCancer);
                            break;
                        case 'YELLOW':
                            naMHI--;
                            yellowMHI++;
                            yellowMHIStatus.push($rootScope.label.cancerView.breastCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.breastCancer);
                            break;
                        default:



                    }
                    break;
                case 'Cervical Cancer':
                    switch ($scope.result.data[i].status) {
                        case 'GREEN':
                            naMHI--;
                            greenMHI++;
                            greenMHIStatus.push($rootScope.label.cancerView.cervicalCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.cervicalCancer);
                            break;
                        case 'YELLOW':
                            naMHI--;
                            yellowMHI++;
                            yellowMHIStatus.push($rootScope.label.cancerView.cervicalCancer);
                            $scope.removeIndicatorFromNA($rootScope.label.cancerView.cervicalCancer);
                            break;
                        default:
                    }
                    break;
                default:
            }
        }
        $scope.getExamData();
        if ($rootScope.userAge < 49) {
            notApplicable++;
            notApplicableMHIStatus.push($rootScope.label.cancerView.colonCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.colonCancer);
        }
        if ($rootScope.userAge > 76) {
            notApplicable++;
            notApplicableMHIStatus.push($rootScope.label.cancerView.colonCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.colonCancer);
        }
        if ($rootScope.userAge > 54 && $rootScope.userAge < 81 && $rootScope.lungCheck == true) {

            notApplicable = notApplicable;
        } else {

            notApplicable++;
            notApplicableMHIStatus.push($rootScope.label.cancerView.lungCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.lungCancer);
        }
        if ($rootScope.userGender == 'Female' && $rootScope.userAge > 20) {
            notApplicable++;
            notApplicableMHIStatus.push($rootScope.label.cancerView.prostateCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.prostateCancer);
            if ($rootScope.userAge < 44) {
                notApplicable++;
                notApplicableMHIStatus.push($rootScope.label.cancerView.breastCancer);
                $scope.removeIndicatorFromNA($rootScope.label.cancerView.breastCancer);
            }
            if ($rootScope.userAge > 66) {
                notApplicable++;
                notApplicableMHIStatus.push($rootScope.label.cancerView.cervicalCancer);
                $scope.removeIndicatorFromNA($rootScope.label.cancerView.cervicalCancer);
            }

        } else if ($rootScope.userGender == 'Male' && $rootScope.userAge > 39) {
            notApplicable = notApplicable + 2;
            notApplicableMHIStatus.push($rootScope.label.cancerView.breastCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.breastCancer);
            notApplicableMHIStatus.push($rootScope.label.cancerView.cervicalCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.cervicalCancer);
            if ($rootScope.userAge > 66) {
                notApplicable++;
                notApplicableMHIStatus.push($rootScope.label.cancerView.prostateCancer);
                $scope.removeIndicatorFromNA($rootScope.label.cancerView.prostateCancer);
            }

        } else {
            notApplicable = notApplicable + 3;
            notApplicableMHIStatus.push($rootScope.label.cancerView.breastCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.breastCancer);
            notApplicableMHIStatus.push($rootScope.label.cancerView.cervicalCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.cervicalCancer);
            notApplicableMHIStatus.push($rootScope.label.cancerView.prostateCancer);
            $scope.removeIndicatorFromNA($rootScope.label.cancerView.prostateCancer);

        }


        naMHI = naMHI - notApplicable;
        totalMHI = greenMHI + redMHI + yellowMHI + naMHI;
        $scope.greenCount = greenMHI;
        $scope.yellowCount = yellowMHI;
        $scope.redCount = redMHI;
        $scope.naCount = naMHI;

        if (totalMHI == 0) {
            document.getElementById("naBar").style.width = "100%";
        } else {
            var greenWidth = (greenMHI / totalMHI) * 100;
            var yellowWidth = (yellowMHI / totalMHI) * 100;
            var redWidth = (redMHI / totalMHI) * 100;
            var naWidth = (naMHI / totalMHI) * 100;
            document.getElementById("naBar").style.width = naWidth + '%';
            document.getElementById("redBar").style.width = redWidth + '%';
            document.getElementById("yellowBar").style.width = yellowWidth + '%';
            document.getElementById("greenBar").style.width = greenWidth + '%';
        }
    }

    $scope.removeIndicatorFromNA = function (indicator) {
        index = naMHIStatus.indexOf(indicator);
        if (index > -1) {
            naMHIStatus.splice(index, 1);
        }
    }

    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.isActive = false;


        if (first == 0) {
            $rootScope.getMHIData();
        } else {
            $rootScope.show();
            $rootScope.indicatorCalculation(JSON.parse(localStorage.getItem('dashboardData')));
        }

        if (localStorage.getItem('preferLanguage'))
            $scope.language = localStorage.getItem('preferLanguage');
        else
            $scope.language = 'english';

        ionicMaterialInk.displayEffect();
    });

    $scope.showInfo = function (type) {
        if (type == 'bmi') {
            $scope.info = $rootScope.label.bmiView.info;
            $scope.title = $rootScope.label.dashboard.bmiTitleText;
        } else if (type == 'depression') {
            if ($scope.depressionHealthy == true) {
                $scope.info = $rootScope.label.depressionView.info;
            } else if ($scope.depressionRisk == true) {
                $scope.info = $rootScope.label.depressionView.infoYellow;
            } else if ($scope.depressionHighRisk == true) {
                $scope.info = $rootScope.label.depressionView.infoRed;
            } else if ($scope.depressionNA == true) {
                $scope.info = $rootScope.label.depressionView.info;
            }
            $scope.title = $rootScope.label.dashboard.depressionTitleText;
        } else if (type == 'dibetes') {
            if ($scope.diabetesHealthy == true) {
                $scope.info = $rootScope.label.dibetesView.info;
            } else if ($scope.diabetesRisk == true) {
                $scope.info = $rootScope.label.dibetesView.infoYellow;
            } else if ($scope.diabetesHighRisk == true) {
                $scope.info = $rootScope.label.dibetesView.infoRed;
            } else if ($scope.diabetesNA == true) {
                $scope.info = $rootScope.label.dibetesView.info;
            }
            $scope.title = $rootScope.label.dashboard.dibetesTitleText;
        } else if (type == 'waist') {
            if ($scope.waistHealthy == true) {
                $scope.info = $rootScope.label.waistView.info;
            } else if ($scope.waistHighRisk == true) {
                $scope.info = $rootScope.label.waistView.infoRed;
            } else if ($scope.waistNA == true) {
                $scope.info = $rootScope.label.waistView.info;
            }
            $scope.title = $rootScope.label.dashboard.waistTitleText;
        } else if (type == 'exercise') {
            if ($scope.exerciseHealthy == true) {
                $scope.info = $rootScope.label.exerciseView.info;
            } else if ($scope.exerciseRisk == true) {
                $scope.info = $rootScope.label.exerciseView.infoYellow;
            } else if ($scope.exerciseNA == true) {
                $scope.info = $rootScope.label.exerciseView.info;
            }
            $scope.title = $rootScope.label.dashboard.exerciseTitleText;
        } else if (type == 'sleep') {
            if ($scope.sleepHealthy == true) {
                $scope.info = $rootScope.label.sleepView.info;
            } else if ($scope.sleepRisk == true) {
                $scope.info = $rootScope.label.sleepView.infoYellow;
            } else if ($scope.sleepHighRisk == true) {
                $scope.info = $rootScope.label.sleepView.infoRed;
            } else if ($scope.sleepNA == true) {
                $scope.info = $rootScope.label.sleepView.info;
            }
            $scope.title = $rootScope.label.dashboard.sleepTitleText;
        } else if (type == 'cardiovascular') {
            if ($scope.cardioHealthy == true) {
                $scope.info = $rootScope.label.cardiovascularView.info;
            } else if ($scope.cardioRisk == true) {
                $scope.info = $rootScope.label.cardiovascularView.infoYellow;
            } else if ($scope.cardioHighRisk == true) {
                $scope.info = $rootScope.label.cardiovascularView.infoRed;
            } else if ($scope.cardioNA == true) {
                $scope.info = $rootScope.label.cardiovascularView.info;
            }
            $scope.title = $rootScope.label.dashboard.cardioTitleText;
        } else if (type == 'smoking') {
            $scope.info = $rootScope.label.smokingView.info;
            $scope.title = $rootScope.label.dashboard.smokingTitleText;
        } else if (type == 'alcohol') {
            if ($scope.alcoholHealthy == true) {
                $scope.info = $rootScope.label.alcoholView.info;
            } else if ($scope.alcoholRisk == true) {
                $scope.info = $rootScope.label.alcoholView.infoYellow;
            } else if ($scope.alcoholHighRisk == true) {
                $scope.info = $rootScope.label.alcoholView.infoRed;
            } else if ($scope.alcoholNA == true) {
                $scope.info = $rootScope.label.alcoholView.info;
            }
            $scope.title = $rootScope.label.dashboard.alcoholTitleText;
        } else if (type == 'diet') {
            if ($scope.nutritionHealthy == true) {
                $scope.info = $rootScope.label.dietView.info;
            } else if ($scope.nutritionRisk == true) {
                $scope.info = $rootScope.label.dietView.infoYellow;
            } else if ($scope.nutritionNA == true) {
                $scope.info = $rootScope.label.dietView.info;
            }
            $scope.title = $rootScope.label.dashboard.dietTitleText;
        } else if (type == 'hyperTension') {
            if ($scope.hypertensionHealthy == true) {
                $scope.info = $rootScope.label.hyperTensionView.info;
            } else if ($scope.hypertensionRisk == true) {
                $scope.info = $rootScope.label.hyperTensionView.infoYellow;
            } else if ($scope.hypertensionHighRisk == true) {
                $scope.info = $rootScope.label.hyperTensionView.infoRed;
            } else if ($scope.hypertensionNA == true) {
                $scope.info = $rootScope.label.hyperTensionView.info;
            }
            $scope.title = $rootScope.label.dashboard.hypertensionTitleText;
        }
        navigator.notification.alert(
            $scope.info, // message
            $scope.none, // callback
            $scope.title, // title
            $rootScope.label.common.okText // buttonName
        );
    };

    $rootScope.logout = function (buttonIndex) {
        if (buttonIndex == 1) {
            localStorage.setItem('userId', '');
            localStorage.setItem('dashboardData', '');
            first = 0;
            localStorage.setItem('userLoginData', '');
            $rootScope.checkUpDoneIndicator = false;
            $rootScope.checkUpNotDoneIndicator = false;
            $rootScope.checkUpDueIndicator = false;
            $rootScope.examNotTaken = false;
            $rootScope.examTaken = false;
            $rootScope.examCompleted = false;
            $rootScope.employee = false;
            $rootScope.patient == false;
            $rootScope.showFooter = true;
            $rootScope.lungCheck = false;
            localStorage.setItem('userFontSize', '');
            cordova.plugins.backgroundMode.disable();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go('login');
        }

    }
    $rootScope.logoutConfirm = function () {
        navigator.notification.confirm(
            $rootScope.message.common.logoutText, // message
            $rootScope.logout, // callback to invoke with index of button pressed
            $rootScope.label.sideMenu.logoutText, // title
            [$rootScope.label.common.yesText, $rootScope.label.common.cancelText] // buttonLabels
        );
    }

    $rootScope.changeLanguage = function (lang) {
        if (lang == 'english') {
            $rootScope.label = appConstant.english.label;
            $rootScope.message = appConstant.english.message;
            $rootScope.speciality = appConstant.english.speciality;
            $rootScope.months = appConstant.english.months;
            $rootScope.exercise = appConstant.english.exercise;
            $rootScope.alcoholQuestions = appConstant.english.alcoholQuestions;
            $rootScope.faqData = faqConstant.english;
            localStorage.setItem('preferLanguage', 'english');
        } else {
            $rootScope.label = appConstant.spanish.label;
            $rootScope.message = appConstant.spanish.message;
            $rootScope.speciality = appConstant.spanish.speciality;
            $rootScope.months = appConstant.spanish.months;
            $rootScope.exercise = appConstant.spanish.exercise;
            $rootScope.alcoholQuestions = appConstant.spanish.alcoholQuestions;
            $rootScope.faqData = faqConstant.spanish;
            localStorage.setItem('preferLanguage', 'spanish');
        }
        if ($state.current.name == "menu.dashboard") {
            $rootScope.indicatorCalculation(JSON.parse(localStorage.getItem('dashboardData')));
        }


    };

    $rootScope.none = function () {};

    $rootScope.MHInavigate = function (index) {
        if (index == 1) {
            $timeout(function () {
                $ionicHistory.goBack();
            }, 100);
        }
    };

    $rootScope.hideFooter = function () {
        $rootScope.showFooter = false;
    };

    $rootScope.openLink = function (link) {
        window.open(link, '_blank', 'location=no');
    };

    $rootScope.openLinkProstate = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.cancer.org/cancer/prostatecancer/moreinformation/prostatecancerearlydetection/index';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.cdc.gov/spanish/cancer/prostate/basic_info/screening.htm';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkLung = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.uspreventiveservicestaskforce.org/Page/Document/UpdateSummaryFinal/lung-cancer-screening?ds=1&s=lung%20cancer';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.cdc.gov/spanish/cancer/lung/basic_info/screening.htm';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkColon = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.uspreventiveservicestaskforce.org/Page/Document/UpdateSummaryFinal/colorectal-cancer-screening2';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.cdc.gov/spanish/cancer/colorectal/basic_info/screening/index.htm';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkCervical = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.uspreventiveservicestaskforce.org/Page/Document/UpdateSummaryFinal/cervical-cancer-screening?ds=1&s=cervical%20cancer';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.cdc.gov/spanish/cancer/cervical/basic_info/screening.htm';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkBreast = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.breastcancer.org/research-news/acs-guidelines-recommend-mammograms-at-45';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.breastcancer.org/es';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkWaistAndBMI = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkExercise = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'https://www.cdc.gov/physicalactivity/basics/adults/index.htm';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'https://www.cdc.gov/physicalactivity/basics/adults/index.htm';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkDiet = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://familydoctor.org/familydoctor/en/prevention-wellness/food-nutrition.html';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://es.familydoctor.org/familydoctor/es/prevention-wellness/food-nutrition.html';
            window.open(link, '_blank', 'location=no');
        }
    };


    $rootScope.openLinkSmoking = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.lung.org/stop-smoking/i-want-to-quit/';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.lung.org/espanol/';
            window.open(link, '_blank', 'location=no');
        }
    };



    $rootScope.openLinkAlcohol = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.rethinkingdrinking.niaaa.nih.gov/';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.rethinkingdrinking.niaaa.nih.gov/';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkSleep = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            sleepLink = 'https://www.thoracic.org/patients/patient-resources/resources/obstructive-sleep-apnea-in-adults.pdf';
            link = 'https://docs.google.com/viewer?url=' + encodeURIComponent(sleepLink);
            window.open(link, '_blank', 'location=no');
        } else {
            sleepLink = 'https://www.thoracic.org/patients/patient-resources/resources/obstructive-sleep-apnea-in-adults.pdf';
            link = 'https://docs.google.com/viewer?url=' + encodeURIComponent(sleepLink);
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkHypertension = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.cdc.gov/bloodpressure/materials_for_patients.htm';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.cdc.gov/bloodpressure/materials_for_patients.htm';
            window.open(link, '_blank', 'location=no');
        }
    };


    $rootScope.openLinkDepression = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.nimh.nih.gov/health/publications/depression-what-you-need-to-know-12-2015/index.shtml';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.nimh.nih.gov/health/publications/depression-what-you-need-to-know-12-2015/index.shtml';
            window.open(link, '_blank', 'location=no');
        }
    };


    $rootScope.openLinkDiabetes = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'https://www.cdc.gov/diabetes/ndep/index.html';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'https://www.cdc.gov/diabetes/ndep/index.html';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.openLinkCardio = function () {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = 'http://www.cdc.gov/heartdisease/prevention.htm';
            window.open(link, '_blank', 'location=no');
        } else {
            link = 'http://www.cdc.gov/heartdisease/prevention.htm';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.goTOPhysician = function () {
        $rootScope.hide();
        $state.go('menu.findAPhysician');
    }

    $rootScope.findAPhysician = function () {
        $rootScope.show();
        $timeout(function () {
            $rootScope.goTOPhysician;
        }, 2000);
    };

    $rootScope.openLinkMHI = function (mhi) {
        var link = '';
        if (localStorage.getItem('preferLanguage') == 'english') {
            link = url + mhi + '_en.html';
            window.open(link, '_blank', 'location=no');
        } else {
            link = url + mhi + '_es.html';
            window.open(link, '_blank', 'location=no');
        }
    };

    $rootScope.getMHIData = function () {
        $rootScope.show();
        var id = localStorage.getItem('userId');
        var link = 'getMHIStatus/' + id + '?' + Math.random();
        homeFactory
            .apiCall(link, 'GET', id)
            .then(
                function (response) {
                    localStorage.setItem('dashboardData', JSON.stringify(response.data));

                    $rootScope.indicatorCalculation(JSON.parse(localStorage.getItem('dashboardData')));
                    if (first == 0) {
                        // navigator.splashscreen.hide();
                        first = 1;
                    }
                    if ($state.current.name == "menu.bmiEdit") {

                        navigator.notification.confirm(
                            $rootScope.label.bmiEditView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.lastHealthCheckup") {
                        navigator.notification.confirm(
                            $rootScope.label.lastHealthCHeckupView.healthCheckupUpdated, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                    [$rootScope.label.common.okText] // buttonName
                        );
                    } else if ($state.current.name == "menu.sleepEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.sleepEditView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.exerciseEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.exerciseView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.depressionEdit") {
                        $timeout(navigator.notification.confirm(
                            $rootScope.label.depressionView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        ), 2000);
                    } else if ($state.current.name == "menu.dietEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.dietEditView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.hyperTensionEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.hyperTensionEditView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.waistEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.waistEditView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.diabetesEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.diabetesEditView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.cardiovascularEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.cardiovascularView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.alcoholEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.alcoholView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.smokingEdit") {
                        navigator.notification.confirm(
                            $rootScope.label.smokingEditView.successMessage, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.breast") {
                        navigator.notification.confirm(
                            $rootScope.label.cancerView.success, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.cervical") {
                        navigator.notification.confirm(
                            $rootScope.label.cancerView.success, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.lung") {
                        $timeout(navigator.notification.confirm(
                            $rootScope.label.cancerView.success, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        ), 2000);
                    } else if ($state.current.name == "menu.prostate") {
                        navigator.notification.confirm(
                            $rootScope.label.cancerView.success, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    } else if ($state.current.name == "menu.colon") {
                        navigator.notification.confirm(
                            $rootScope.label.cancerView.success, // message
                            $rootScope.MHInavigate, // callback
                            $rootScope.label.common.success, // title
                [$rootScope.label.common.done] // buttonName
                        );
                    }

                });
    }



    $scope.showStatusInfo = function (status) {
        if (status == "Healthy") {
            $scope.mhiStatusTitle = $rootScope.label.common.healthyMHIAlert;
            $scope.mhiStatusTitle.fontcolor("green");
            $scope.css = 'my-custom-popup-green';
            $scope.statusMHI = "";
            for (var i = 0; i < greenMHIStatus.length; i++) {
                $scope.statusMHI = $scope.statusMHI + (i + 1) + ". " + greenMHIStatus[i] + '<br>';
            }
        } else if (status == "Risk") {
            $scope.mhiStatusTitle = $rootScope.label.common.riskMHIAlert;
            $scope.mhiStatusTitle.fontcolor("yellow");
            $scope.css = 'my-custom-popup-yellow';
            $scope.statusMHI = "";
            for (var i = 0; i < yellowMHIStatus.length; i++) {
                $scope.statusMHI = $scope.statusMHI + (i + 1) + ". " + yellowMHIStatus[i] + '<br>';
            }
        } else
        if (status == "High Risk") {
            $scope.mhiStatusTitle = $rootScope.label.common.highRiskMHIAlert;
            $scope.mhiStatusTitle.fontcolor("red");
            $scope.css = 'my-custom-popup-red';
            $scope.statusMHI = "";
            for (var i = 0; i < redMHIStatus.length; i++) {
                $scope.statusMHI = $scope.statusMHI + (i + 1) + ". " + redMHIStatus[i] + '<br>';
            }
        } else if (status == "na") {
            $scope.mhiStatusTitle = $rootScope.label.common.naMHIAlert;
            $scope.mhiStatusTitle.fontcolor("silver");
            $scope.css = 'my-custom-popup-silver';
            $scope.statusMHI = "";
            for (var i = 0; i < naMHIStatus.length; i++) {
                $scope.statusMHI = $scope.statusMHI + (i + 1) + ". " + naMHIStatus[i] + "<br>";
            }
        }

        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: $scope.mhiStatusTitle,
                cssClass: $scope.css,
                template: $scope.statusMHI,
                buttons: [
                    {
                        text: $rootScope.label.common.cancelText,
                        type: 'button-positive'
                    }]
            });

            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });

        };

        $scope.showAlert();

    }

    $scope.getExamData = function () {
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




    $ionicPlatform.registerBackButtonAction(function (event) {
        if ($state.current.name == "menu.dashboard") {
            navigator.app.exitApp();
        } else {
            $ionicHistory.goBack()
                //navigator.app.backHistory();
        }
    }, 100);
})


.controller('profileCtrl', function ($scope, $ionicModal, $rootScope, $ionicHistory, $state, $ionicPlatform, $timeout, homeFactory) {
    $ionicPlatform.registerBackButtonAction(function (event) {
        //if specified state matches else go back
        if ($ionicHistory.currentStateName() === 'menu.profile') {
            navigator.app.exitApp();
        } else {
            $ionicHistory.goBack();
        }
    }, 100);

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $scope.details = '';
        $scope.updateProfileData = {};
        if (localStorage.getItem('preferLanguage'))
            $scope.language = localStorage.getItem('preferLanguage');
        else
            $scope.language = 'english';

        if (localStorage.getItem('userFontSize') == 'smaller') {
            $scope.fontSize = 'smaller';
            $scope.smallFont = true;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = false;
        } else if (localStorage.getItem('userFontSize') == 'large') {
            $scope.fontSize = 'large';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = true;
            $scope.largerFont = false;
        } else if (localStorage.getItem('userFontSize') == 'larger') {
            $scope.fontSize = 'larger';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = true;
        } else {
            $scope.fontSize = 'normal';
            $scope.smallFont = false;
            $scope.normalFont = true;
            $scope.largeFont = false;
            $scope.largerFont = false;
        }

        $scope.promoValidation = true;
        $scope.promoverifyvar = true;

        $scope.noLoadMore = false;
        $rootScope.show();
        $scope.primaryPharmacy = {
            name: $rootScope.label.profile.preferedPharmacyText
        };
        $scope.backupPharmacy = {
            name: $rootScope.label.profile.backupPharmacyText
        };
        $scope.mailOrderPharmacy = {
            name: $rootScope.label.profile.mailOrderPharmacyText
        };
        $scope.primaryInsurance = {
            id: 'Search a Primary Insurance Provider'
        }

        $scope.secondaryInsurance = {
            id: 'Search a Secondary Insurance Provider'
        }
        $scope.myModel = {
            phonenumber: ' '
        }

        //var userId = localStorage.userId;
        var link = 'userProfile/' + localStorage.getItem('userId');
        homeFactory.apiCall(link, 'GET').then(function (response) {

            $scope.details = response.data;
            var dateob = new Date($scope.details.data.dob);
            $scope.fName = $scope.details.data.firstName;
            $scope.lName = $scope.details.data.lastName;
            $scope.dob = dateob;
            $scope.gender = $scope.details.data.gender;
            $scope.mobile = $scope.details.data.cell;
            $scope.myModel.phonenumber = $scope.mobile;
            $scope.myPrompt = $scope.mobile;
            $scope.zipCode = parseInt($scope.details.data.address.zipCode);
            $rootScope.userZipcode = $scope.zipCode;

            $scope.address = $scope.details.data.address.addressLine1;
            $scope.city = $scope.details.data.address.city;
            $scope.promo = $scope.details.data.promoCode;
            $scope.primaryPhysician = $scope.details.data.hasPrimaryPhysician;

            for (var i = 0; i < $scope.details.data.consents.length; i++) {
                switch ($scope.details.data.consents[i].code) {
                    case 'PC':
                        $scope.physicianConsent = $scope.details.data.consents[i].value;
                        break;
                    default:
                        $scope.physicianConsent = false;
                }
            }

            $scope.Insurance = $scope.details.data.hasInsurance;
            $scope.primaryPhysicianName = $scope.details.data.primaryPhysician;
            $scope.nextOfKin = $scope.details.data.nextOfKin;

            if ($scope.details.data.pharmacy.length > 0) {
                $scope.primaryPharmacy = $scope.details.data.pharmacy[0];
                if ($scope.details.data.pharmacy.length > 1) {
                    $scope.backupPharmacy = $scope.details.data.pharmacy[1];
                    if ($scope.details.data.pharmacy.length > 2) {
                        $scope.mailOrderPharmacy = $scope.details.data.pharmacy[2];
                    }
                }
            } else {
                $scope.primaryPharmacy = {
                    name: $rootScope.label.profile.preferedPharmacyText
                };
                $scope.backupPharmacy = {
                    name: $rootScope.label.profile.backupPharmacyText
                };
                $scope.mailOrderPharmacy = {
                    name: $rootScope.label.profile.mailOrderPharmacyText
                };
            }

            if ($scope.details.data.insurance.length > 0) {
                $scope.primaryInsurance = $scope.itemArray[parseInt($scope.details.data.insurance[0].providedId)];
                if ($scope.details.data.insurance.length > 1) {
                    $scope.secondaryInsurance = $scope.itemSecondArray[parseInt($scope.details.data.insurance[1].providedId)];
                }
            } else {
                $scope.primaryInsurance = {
                    id: 'Search a Primary Insurance Provider'
                }

                $scope.secondaryInsurance = {
                    id: 'Search a Secondary Insurance Provider'
                }
            }
            $scope.getPharmacy();
            $rootScope.hide();
        });
    });


    $scope.getPharmacy = function () {
        var pharmacyLink = 'geoCode/' + $scope.zipCode;
        homeFactory.apiCall(pharmacyLink, 'GET', $scope.zipCode).then(
            function (response) {
                if (response.status == 200) {
                    $rootScope.currentLat = response.data.data.lat;
                    $rootScope.currentLng = response.data.data.lng;
                    $rootScope.pharmacyData = {
                        "lat": $rootScope.currentLat,
                        "lng": $rootScope.currentLng,
                        "type": "pharmacy",
                        "radius": "16093.4",
                        "keyword": "",
                        "pageToken": ""
                    };
                    $scope.getPharmacyList($rootScope.pharmacyData);
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

    $scope.getPharmacyList = function (value) {
        homeFactory.apiCall('searchGooglePlaces', 'POST', value).then(
            function (response) {
                if (response.status == 200) {

                    if (response.data.data.results.length > 0) {
                        $rootScope.pharmacyList = response;
                        $rootScope.pharmacyData = {
                            "lat": $rootScope.currentLat,
                            "lng": $rootScope.currentLng,
                            "type": "pharmacy",
                            "radius": "10",
                            "keyword": "",
                            "pageToken": response.data.data.nextPageToken
                        };
                    } else {
                        $rootScope.pharmacyList = null;
                        $scope.noLoadMore = true;
                        var myEl = angular.element(document.querySelector('#pharmacyList'));
                        myEl.empty();
                        myEl.append('<div class="box-body" id="streaming_data" style="height: 100%; position: relative;"><div class="text-center" style="margin-top: 70%;line-height: 30px;font-size: 25px;color: #072a29!important;">No Results available for given criteria.</div><div class="text-muted text-center" style="font-size:20px;"></div></div>');
                    }


                } else {}
            });
    }


    $scope.loadMore = function () {
        if (!$scope.noLoadMore) {
            $rootScope.show();
            homeFactory.apiCall('searchGooglePlaces', 'POST', $rootScope.pharmacyData).then(
                function (response) {
                    if (response.status == 200) {
                        if (response.data.data.results.length > 0) {
                            $timeout(function () {
                                $rootScope.hide();
                                $rootScope.pharmacyList.data.data.results = $rootScope.pharmacyList.data.data.results.concat(response.data.data.results);

                                if (response.data.data.nextPageToken == null) {


                                    $scope.noLoadMore = true;
                                }
                                $scope.$broadcast('scroll.infiniteScrollComplete');

                            }, 500);

                            $rootScope.pharmacyData = {
                                "lat": $rootScope.currentLat,
                                "lng": $rootScope.currentLng,
                                "type": "pharmacy",
                                "radius": "10",
                                "keyword": "",
                                "pageToken": response.data.data.nextPageToken
                            };

                        } else {
                            $rootScope.hide();

                            $scope.noLoadMore = true;
                            var myEl = angular.element(document.querySelector('#pharmacyList'));
                            myEl.empty();
                            myEl.append('<div class="box-body" id="streaming_data" style="height: 100%; position: relative;"><div class="text-center" style="margin-top: 70%;line-height: 30px;font-size: 25px;color: #072a29!important;">No Results available for given criteria.</div><div class="text-muted text-center" style="font-size:20px;"></div></div>');
                        }

                    } else {
                        $rootScope.hide();

                    }
                });
        }
    }



    $scope.updateProfile = function () {
        $rootScope.show();
        if (!$scope.primaryInsurance) {
            $scope.primaryInsurance = {
                id: ' '
            }
        }
        if (!$scope.secondaryInsurance) {

            $scope.secondaryInsurance = {
                id: ' '
            }
        }
        if ($scope.promo != null && $scope.promo != "") {

            $scope.promoverifyvar = false;
            $scope.promoValidation = true;

            var link = 'checkPromoCode/' + $scope.promo + '/' + localStorage.getItem('userId');
            homeFactory
                .apiCall(link, 'GET', $scope.promo)
                .then(
                    function (result) {
                        $rootScope.hide();
                        $scope.response = result.data;
                        if ($scope.response.data == true || $scope.response.data == "true") {
                            $scope.promoverifyvar = true;

                            $scope.updateProfileData = {
                                email: localStorage.getItem('emailId'),
                                firstName: $scope.fName,
                                lastName: $scope.lName,
                                dob: Date.parse($scope.dob),
                                gender: $scope.gender,
                                cell: $scope.myModel.phonenumber,
                                consents: [
                                    {
                                        code: "PP",
                                        value: true
                                    },
                                    {
                                        code: "HA",
                                        value: true
                                    },
                                    {
                                        code: "EM",
                                        value: false
                                    },
                                    {
                                        code: "PC",
                                        value: $scope.physicianConsent
                                    }

                                ],
                                primaryPhysician: $scope.primaryPhysicianName,
                                promoCode: $scope.promo,
                                pharmacy: [
                                    {
                                        code: "pp",
                                        name: $scope.primaryPharmacy.name,
                                        type: "primary"
                                    },
                                    {
                                        code: "ba",
                                        name: $scope.backupPharmacy.name,
                                        type: "secondary"
                                    },
                                    {
                                        code: "mo",
                                        name: $scope.mailOrderPharmacy.name,
                                        type: "mail"
                                    }
                                ],
                                insurance: [
                                    {
                                        code: "pi",
                                        providedId: parseInt($scope.primaryInsurance.id),
                                        type: "primary"
                                    },
                                    {
                                        code: "si",
                                        providedId: parseInt($scope.secondaryInsurance.id),
                                        type: "secondary"
                                    }
                                ],
                                nextOfKin: $scope.nextOfKin,
                                address: {
                                    addressLine1: $scope.address,
                                    addressLineline2: "",
                                    city: $scope.city,
                                    state: "NY",
                                    zipCode: $scope.zipCode,
                                    country: "US"
                                },
                                authToken: ""
                            };
                            $rootScope.show();
                            homeFactory.apiCall('updateProfile', 'PUT', $scope.updateProfileData).then(function (response) {
                                $rootScope.hide();
                                $rootScope.userZipcode = $scope.zipCode;
                                $rootScope.employee = true;

                                if ($rootScope.patient == true) {
                                    $rootScope.patient = false;
                                    $rootScope.examNotTaken = true;
                                    $rootScope.examTaken = false;
                                    $rootScope.examCompleted = false;
                                    $rootScope.promotionalMessage = response.data.data.promoText;
                                }
                                navigator.notification.alert(
                                    $rootScope.message.profile.profileUpdate, // message
                                    $state.go('menu.homepage'), // callback
                                    $rootScope.label.common.success, // title
                                    $rootScope.label.common.done // buttonName
                                );
                            });

                        } else {
                            $rootScope.hide();
                            $scope.promoverifyvar = false;
                            $scope.promoValidation = false;
                            navigator.notification.alert(
                                $rootScope.message.common.promocodeError, // message
                                $rootScope.none, // callback
                                $rootScope.label.common.invalid, // title
                                $rootScope.label.common.done // buttonName
                            );
                        }

                    });

        } else {

            $scope.updateProfileData = {
                email: localStorage.getItem('emailId'),
                firstName: $scope.fName,
                lastName: $scope.lName,
                dob: Date.parse($scope.dob),
                gender: $scope.gender,
                cell: $scope.myModel.phonenumber,
                consents: [
                    {
                        code: "PP",
                        value: true
                    },
                    {
                        code: "HA",
                        value: true
                    },
                    {
                        code: "EM",
                        value: false
                    },
                    {
                        code: "PC",
                        value: $scope.physicianConsent
                    }

                ],
                primaryPhysician: $scope.primaryPhysicianName,
                promoCode: $scope.promo,
                pharmacy: [
                    {
                        code: "pp",
                        name: $scope.primaryPharmacy.name,
                        type: "primary"
                    },
                    {
                        code: "ba",
                        name: $scope.backupPharmacy.name,
                        type: "secondary"
                    },
                    {
                        code: "mo",
                        name: $scope.mailOrderPharmacy.name,
                        type: "mail"
                    }
                ],
                insurance: [
                    {
                        code: "pi",
                        providedId: parseInt($scope.primaryInsurance.id),
                        type: "primary"
                    },
                    {
                        code: "si",
                        providedId: parseInt($scope.secondaryInsurance.id),
                        type: "secondary"
                    }
                ],
                nextOfKin: $scope.nextOfKin,
                address: {
                    addressLine1: $scope.address,
                    addressLineline2: "",
                    city: $scope.city,
                    state: "NY",
                    zipCode: $scope.zipCode,
                    country: "US"
                },
                authToken: ""
            };

            homeFactory.apiCall('updateProfile', 'PUT', $scope.updateProfileData).then(function (response) {
                $rootScope.hide();
                $rootScope.userZipcode = $scope.zipCode;
                $rootScope.employee = false;
                $rootScope.patient = true;
                $rootScope.examNotTaken = false;
                $rootScope.examTaken = false;
                $rootScope.examCompleted = false;
                navigator.notification.alert(
                    $rootScope.message.profile.profileUpdate, // message
                    $state.go('menu.homepage'), // callback
                    $rootScope.label.common.success, // title
                    $rootScope.label.common.done // buttonName
                );
            });

        }

    };

    $scope.itemArray = [
        {
            id: 1,
            name: 'Cigna'
            },
        {
            id: 2,
            name: 'GHI'
            },
        {
            id: 3,
            name: 'United Healthcare'
            },
        {
            id: 4,
            name: 'United Healthcare Oxford'
            },
        {
            id: 5,
            name: '1199SEIU'
            },
        {
            id: 6,
            name: '20/20 Eyecare Plan'
            },
        {
            id: 7,
            name: 'AARP'
            },
        {
            id: 8,
            name: 'Absolute Total Care'
            },
        {
            id: 9,
            name: 'Access Medicare'
            },
        {
            id: 10,
            name: 'Accountable Health Plan Of Ohio'
            },
        {
            id: 11,
            name: 'Ace'
            },
        {
            id: 12,
            name: 'Advantage Health'
            },
        {
            id: 13,
            name: 'Advantica'
            },
        {
            id: 14,
            name: 'Adventist Health'
            },
        {
            id: 15,
            name: 'Advocate Health Care'
            },
        {
            id: 16,
            name: 'Aetna'
            },
        {
            id: 17,
            name: 'Aetna Better Health'
            },
        {
            id: 18,
            name: 'Affinity Health Plan'
            },
        {
            id: 19,
            name: 'AgeWell New York'
            },
        {
            id: 20,
            name: 'AIG'
            }
    ];

    $scope.itemSecondArray = [
        {
            id: 1,
            name: 'Cigna'
            },
        {
            id: 2,
            name: 'GHI'
            },
        {
            id: 3,
            name: 'United Healthcare'
            },
        {
            id: 4,
            name: 'United Healthcare Oxford'
            },
        {
            id: 5,
            name: '1199SEIU'
            },
        {
            id: 6,
            name: '20/20 Eyecare Plan'
            },
        {
            id: 7,
            name: 'AARP'
            },
        {
            id: 8,
            name: 'Absolute Total Care'
            },
        {
            id: 9,
            name: 'Access Medicare'
            },
        {
            id: 10,
            name: 'Accountable Health Plan Of Ohio'
            },
        {
            id: 11,
            name: 'Ace'
            },
        {
            id: 12,
            name: 'Advantage Health'
            },
        {
            id: 13,
            name: 'Advantica'
            },
        {
            id: 14,
            name: 'Adventist Health'
            },
        {
            id: 15,
            name: 'Advocate Health Care'
            },
        {
            id: 16,
            name: 'Aetna'
            },
        {
            id: 17,
            name: 'Aetna Better Health'
            },
        {
            id: 18,
            name: 'Affinity Health Plan'
            },
        {
            id: 19,
            name: 'AgeWell New York'
            },
        {
            id: 20,
            name: 'AIG'
            }
    ];
    $scope.selected = {
        value: $scope.itemArray[0]
    };

    $scope.addCSS = function (font) {

        if (font == "smaller") {
            $rootScope.layout = 'styleNew';
            $rootScope.mediaLayout = 'mediaQuery';
            $scope.smallFont = true;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = false;
        } else if (font == "large") {
            $rootScope.layout = 'styleLarge';
            $rootScope.mediaLayout = 'mediaLarge';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = true;
            $scope.largerFont = false;

        } else if (font == "larger") {
            $rootScope.layout = 'styleLarger';
            $rootScope.mediaLayout = 'mediaLarger';
            $scope.smallFont = false;
            $scope.normalFont = false;
            $scope.largeFont = false;
            $scope.largerFont = true;
        } else {
            $rootScope.layout = 'style';
            $rootScope.mediaLayout = 'mediaQuery';
            $scope.smallFont = false;
            $scope.normalFont = true;
            $scope.largeFont = false;
            $scope.largerFont = false;
        }

        $scope.fontSize = font;
        localStorage.setItem('userFontSize', font);

        $rootScope.hide();
        $scope.closeModal();
    }


    $scope.fontSize = 'normal';
    $ionicModal.fromTemplateUrl('fontModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

})

.controller('deviceDashboardCtrl', function ($scope, $rootScope, ionicMaterialInk, $ionicHistory, $state, $ionicPlatform, homeFactory) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        data.enableBack = false;
        // Set Ink
        ionicMaterialInk.displayEffect();
        $rootScope.dashboard = false;
        $scope.fitbitMode = {
            checked: false
        };
        $scope.withingMode = {
            checked: false
        };
        $scope.getConncetedDevice();

    });

    $scope.$on("$ionicView.afterLeave", function (event, data) {
        $scope.fitbitMode = {
            checked: false
        };
        $scope.withingMode = {
            checked: false
        };
    });

    $scope.goToFitBit = function () {
        $state.go('menu.fitbit');
    }

    $scope.goToBMI = function () {
        $state.go('menu.bmi');
    }


    $scope.goToHyperTension = function () {
        $state.go('menu.hyperTension');
    }

    $scope.getConncetedDevice = function () {
        $rootScope.show();
        var link = 'getConnectedDevices/' + localStorage.getItem('userId');
        homeFactory.apiCall(link, 'GET', localStorage.getItem('userId')).then(function (response) {
            $scope.details = response.data;
            //$rootScope.hide();
            $rootScope.getMHIData();
            if ($scope.details.success == true) {
                for (var i = 0; i < $scope.details.data.length; i++) {
                    switch ($scope.details.data[i].name) {
                        case 'fitbit':
                            $scope.fitbitMode.checked = true;
                            break;
                        case 'withings':
                            $scope.withingMode.checked = true;
                            break;
                        default:
                    }
                }
            } else {
                navigator.notification.alert(
                    $rootScope.message.common.miscError, // message
                    $rootScope.none, // callback
                    'Error', // title
                    $rootScope.label.common.okText // buttonName
                );
            }


        });
    }


    $scope.$on("$ionicView.beforeLeave", function (event, data) {
        $rootScope.dashboard = true;
    });

    $scope.deviceConnect = function (type, command) {
        $rootScope.show();
        if (command == true) {
            com = 'CONNECT';
            var link = 'getKiotUrl/' + localStorage.getItem('userId') + '/' + type + '/' + com;
            homeFactory.apiCall(link, 'GET').then(function (response) {
                if (response.data.success == true) {
                    $rootScope.hide();
                    var win = window.open(response.data.data, "_blank", "EnableViewPortScale=yes", 'location=no');
                    win.addEventListener("loadstop", function (event) {
                        var res = event.url.match(/callback.html/g);
                        if (res != null || res.length > 0) {
                            win.close();
                            if (type == fitbit) {
                                $scope.fitbitMode.checked = true;
                            } else {
                                $scope.withingMode.checked = true;
                            }
                            navigator.notification.alert(
                                'Success', // message
                                $rootScope.none, // callback
                                'Success', // title
                                $rootScope.label.common.okText // buttonName
                            );
                        } else {
                            if (type == fitbit) {
                                $scope.fitbitMode.checked = false;
                            } else {
                                $scope.withingMode.checked = false;
                            }
                        }
                    });

                } else {
                    $rootScope.hide();
                    if (type == fitbit) {
                        $scope.fitbitMode.checked = false;
                    } else {
                        $scope.withingMode.checked = false;
                    }
                    navigator.notification.alert(
                        $rootScope.message.common.miscError, // message
                        $rootScope.none, // callback
                        'Error', // title
                        $rootScope.label.common.okText // buttonName
                    );

                }
            });
        } else {
            com = 'DISCONNECT';
            var link = 'getKiotUrl/' + localStorage.getItem('userId') + '/' + type + '/' + com;
            homeFactory.apiCall(link, 'GET').then(function (response) {
                if (response.data.success == true) {
                    homeFactory.disconnectCall(response.data.data, 'DELETE').then(function (response) {
                        if (response.data.RESULT == 'SUCCESS') {
                            $rootScope.hide();
                            if (type == fitbit) {
                                $scope.fitbitMode.checked = false;
                            } else {
                                $scope.withingMode.checked = false;
                            }
                            navigator.notification.alert(
                                'Success', // message
                                $rootScope.none, // callback
                                'Success', // title
                                $rootScope.label.common.okText // buttonName
                            );
                        } else {
                            $rootScope.hide();
                            if (type == fitbit) {
                                $scope.fitbitMode.checked = true;
                            } else {
                                $scope.withingMode.checked = true;
                            }
                            navigator.notification.alert(
                                $rootScope.message.common.serverError, // message
                                $rootScope.none, // callback
                                'Error', // title
                                $rootScope.label.common.okText // buttonName
                            );
                        }
                    });

                } else {
                    $rootScope.hide();
                    if (type == fitbit) {
                        $scope.fitbitMode.checked = true;
                    } else {
                        $scope.withingMode.checked = true;
                    }
                    navigator.notification.alert(
                        $rootScope.message.common.serverError, // message
                        $rootScope.none, // callback
                        'Error', // title
                        $rootScope.label.common.okText // buttonName
                    );

                }
            });
        }
    }

    $ionicPlatform.registerBackButtonAction(function (event) {
        if ($state.current.name == "menu.deviceDashboard") {
            navigator.app.exitApp();
        } else {
            $ionicHistory.goBack()
                //navigator.app.backHistory();
        }
    }, 100);

})


.controller('fitbitCtrl', function ($scope, $rootScope, ionicMaterialInk, $ionicHistory, $state) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();
        var MHIData = JSON.parse(localStorage.getItem('dashboardData'));
        $scope.fitbitData = '';
        for (var i = 0; i < MHIData.data.length; i++) {
            if (MHIData.data[i].indicatorCode == 'Fitbit') {
                $scope.fitbitData = MHIData.data[i];
            }
        }
        if ($scope.fitbitData != '') {
            for (var i = 0; i < $scope.fitbitData.questions.length; i++) {
                switch ($scope.fitbitData.questions[i].code) {
                    case 'DISTANCE_ACTUAL':
                        $scope.actualDistance = $scope.fitbitData.questions[i].value;
                        break;
                    case 'CALORIES_ACTUAL':
                        $scope.actualCalories = $scope.fitbitData.questions[i].value;
                        break;
                    case 'STEPS_ACTUAL':
                        $scope.actualSteps = $scope.fitbitData.questions[i].value;
                        break;
                    case 'DISTANCE_GOAL':
                        $scope.goalDistance = $scope.fitbitData.questions[i].value;
                        break;
                    case 'CALORIES_GOAL':
                        $scope.goalCalories = $scope.fitbitData.questions[i].value;
                        break;
                    case 'STEPS_GOAL':
                        $scope.goalSteps = $scope.fitbitData.questions[i].value;
                        break;
                    default:
                }
            }

            $scope.actualDistanceValue = parseInt((parseFloat($scope.actualDistance) / parseFloat($scope.goalDistance)) * 100);
            $scope.actualCaloriesValue = parseInt((parseFloat($scope.actualCalories) / parseFloat($scope.goalCalories)) * 100);
            $scope.actualStepsValue = parseInt((parseFloat($scope.actualSteps) / parseFloat($scope.goalSteps)) * 100);

            var fitbitDateString = new Date(parseInt($scope.fitbitData.lastUpdatedDate));
            fitbitDateString = fitbitDateString.toLocaleString();
            var lastIndex = fitbitDateString.lastIndexOf(":");
            var partOne = fitbitDateString.slice(0, lastIndex).trim();
            var partTwo = fitbitDateString.slice(lastIndex + 1, fitbitDateString.length).trim();
            var res = partTwo.split(" ");
            partOne = partOne + ' ' + res[1];
            $scope.updateDate = 'as of ' + partOne;

        } else {
            $scope.actualDistance = 'NA';
            $scope.actualCalories = 'NA';
            $scope.actualSteps = 'NA';
            $scope.goalSteps = 'NA';
            $scope.goalCalories = 'NA';
            $scope.goalDistance = 'NA';
            $scope.updateDate = 'NA';
            $scope.actualDistanceValue = 0;
            $scope.actualCaloriesValue = 0;
            $scope.actualStepsValue = 0;
        }


    });
})


.controller('wellnessExamCtrl', function ($scope, $rootScope, $ionicHistory, $state, $timeout, homeFactory, ionicMaterialInk) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {

        data.enableBack = true;
        // Set Ink
        ionicMaterialInk.displayEffect();

        $scope.emailValidation = true;
        $scope.consentValidation = true;
        $scope.dateValidation = true;
        $scope.nameValidation = true;
        $scope.wellness = {};

    });

    $scope.submitExamDetails = function (value) {
        $rootScope.show();
        var examSubmitData = {
            "id": localStorage.getItem('userId'),
            "examDate": Date.parse(value.examDate),
            "physicianName": value.physicianName,
            "physicianEmail": value.physicianEmail,
            "consents": [{
                "code": "WC",
                "value": value.physicianConsent
    }]
        }
        var link = 'employee/wellnessexam?locale=en';
        homeFactory.apiCall(link, 'POST', examSubmitData).then(function (response) {
            $rootScope.hide();
            if (response.data.data == 1) {
                var date = $scope.wellness.examDate.getDate();
                var month = $scope.wellness.examDate.getMonth() + 1;
                var year = $scope.wellness.examDate.getFullYear();
                $rootScope.examTakenDate = date + '/' + month + '/' + year;
                $rootScope.userExamPhysicianName = value.physicianName;
                $rootScope.examNotTaken = false;
                $rootScope.examTaken = true;
                $rootScope.examCompleted = false;
                navigator.notification.alert(
                    'Success.', // message
                    $rootScope.none, // callback
                    'Success', // title
                    $rootScope.label.common.done // buttonName
                );
            } else {
                $rootScope.hide();
                navigator.notification.alert(
                    $rootScope.message.common.miscError, // message
                    $rootScope.none, // callback
                    $rootScope.label.common.invalid, // title
                    $rootScope.label.common.done // buttonName
                );

            }

        });
    }
})


.controller('footerCtrl', function ($scope, $rootScope, $state, $ionicHistory, $ionicModal) {


});
