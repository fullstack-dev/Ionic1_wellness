var url = 'http://ngwellness.cloudapp.net/hw-ui-web/';
//var url = 'http://192.168.35.71:8088/hw-ui-web/';
var appConstant = {
    english: {
        label: {
            common: {
                username: 'User Name',
                email: 'Email',
                password: 'Password',
                fontSizeText: 'Font Size',
                optionsFontText: 'A',
                firstNameText: 'First Name',
                lastNameText: 'Last Name',
                zipcodeText: 'Zip Code',
                sexText: 'Sex',
                dateOfBirthText: 'Date Of Birth:',
                mobileNumberText: 'Cell Number',
                consultAphysicianText: 'Consult A Physician',
                cancelText: 'Cancel',
                yesText: 'Yes',
                okText: 'OK',
                backText: 'Back',
                success: 'Success',
                done: 'Done',
                registerText: 'Sign Up Now!!!',
                languageSelectionTitle: 'Select Language',
                english: 'English',
                spanish: 'Español',
                consultPhysicianButtonText: 'Consult A Physician',
                healthyText: 'Healthy',
                riskText: 'Risk',
                highRiskText: 'High Risk',
                lastUpdatedText: 'Last updated: ',
                saveText: 'Save',
                modifyText: 'Modify',
                lastHealthCheckupText: 'Your last Wellness Exam was on',
                checkupDueText: 'Your Last Wellness Exam is due since ',
                lastCheckupText: 'Last Wellness Exam',
                employerWellnessExamText: 'Employer Wellness Program',
                wellnessDataNotAvailable: 'Data Not Available',
                enterWellnessExamDetailText: 'Enter detail if you had already taken',
                findAPhysicianForExam: 'Find a Physician for wellness exam'
            },
            login: {
                title: 'Login',
                buttonText: 'Log In',
                forgotPasswordText: 'Forgot Password'
            },
            register: {
                title: 'Register',
                passwordText: 'Password',
                showPasswordText: 'Show Password',
                promoCodeText: 'I have a Employer Referral Code',
                promoCodeInputText: 'Employer Referral Code',
                appPrivacyText: 'I have read and accept ',
                appPrivacyLinkText: 'Healthwizz\'s Privacy Policy ',
                privacyTitle: 'Privacy',
                hipaaAuthorisationText: 'I have read and accept ',
                hipaaAuthorisationLinkText: 'Hipaa Authorisation',
                hipaaAuthorisationTitle: 'Hipaa Authorisation',
                notificationText: 'I want to receive email/notification from Healthwizz\'s',
                registerButtonText: 'Register'
            },
            forgotPassword: {
                title: 'Forgot Password',
                label: 'Enter the email associated with your account.',
                resetPasswordButtonText: 'Reset'

            },
            dashboard: {
                title: 'Dashboard',
                bmiText: 'BMI',
                bmiInfo: 'The body mass index (BMI) or Quetelet index is a value derived from the mass (weight) and height of an individual. The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m2, resulting from mass in kilograms and height in metres.',
                bmiTitleText: 'BMI Information',
                depressionText: 'Depression',
                depressionInfo: 'Depression is a state of low mood and aversion to activity that can affect a persons thoughts, behavior, feelings and sense of well-being.People with a depressed mood can feel sad, anxious, empty, hopeless, helpless, worthless, guilty, irritable, angry, ashamed or restless. They may lose interest in activities that were once pleasurable, experience loss of appetite or overeating, have problems concentrating, remembering details or making decisions, experience relationship difficulties and may contemplate, attempt or commit suicide. Insomnia, excessive sleeping, fatigue, aches, pains, digestive problems or reduced energy may also be present.Depressed mood is a feature of some psychiatric syndromes such as major depressive disorder,but it may also be a normal reaction, as long as it does not persist long term, to life events such as bereavement, a symptom of some bodily ailments or a side effect of some drugs and medical treatments.',
                depressionTitleText: 'Depression Information',
                waistText: 'Waist',
                waistInfo: 'The waist is the part of the abdomen between the rib cage and hips. On people with slim bodies, the waist is the narrowest part of the torso.The waistline refers to the horizontal line where the waist is narrowest, or to the general appearance of the waist.',
                waistTitleText: 'Waist Information',
                dibetesText: 'Diabetes',
                dibetesInfo: 'Diabetes mellitus (DM), commonly referred to as diabetes, is a group of metabolic diseases in which there are high blood sugar levels over a prolonged period. Symptoms of high blood sugar include frequent urination, increased thirst, and increased hunger. If left untreated, diabetes can cause many complications.[3] Acute complications include diabetic ketoacidosis and nonketotic hyperosmolar coma. Serious long-term complications include cardiovascular disease, stroke, chronic kidney failure, foot ulcers, and damage to the eyes.',
                dibetesTitleText: 'Diabetes Information',
                sleepText: 'Sleep Apnea',
                sleepInfo: 'Sleep is a naturally recurring state of mind characterized by altered consciousness, relatively inhibited sensory activity, inhibition of nearly all voluntary muscles, and reduced interactions with surroundings. It is distinguished from wakefulness by a decreased ability to react to stimuli, but is more easily reversed than the state of hibernation or of being comatose. Mammalian sleep occurs in repeating periods, in which the body alternates between two highly distinct modes known as non-REM and REM sleep. REM stands for "rapid eye movement" but involves many other aspects including virtual paralysis of the body.During sleep, most systems in an animal are in an anabolic state, building up the immune, nervous, skeletal, and muscular systems. Sleep in non-human animals is observed in mammals, birds, reptiles, amphibians, and fish, and, in some form, in insects and even in simpler animals such as nematodes. The internal circadian clock promotes sleep daily at night in diurnal species (such as humans) and in the day in nocturnal organisms (such as rodents). However, sleep patterns vary widely among animals and among different individual humans. Industrialization and artificial light have substantially altered human sleep habits in the last 100 years.',
                sleepTitleText: 'Sleep Information',
                cardioText: 'Cardiovascular',
                cardioInfo: 'Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels. Cardiovascular disease includes coronary artery diseases (CAD) such as angina and myocardial infarction (commonly known as a heart attack). Other CVDs are stroke, hypertensive heart disease, rheumatic heart disease, cardiomyopathy, heart arrhythmia, congenital heart disease, valvular heart disease, carditis, aortic aneurysms, peripheral artery disease, and venous thrombosis.The underlying mechanisms vary depending on the disease in question. Coronary artery disease, stroke, and peripheral artery disease involve atherosclerosis. This may be caused by high blood pressure, smoking, diabetes, lack of exercise, obesity, high blood cholesterol, poor diet, and excessive alcohol consumption, among others. High blood pressure results in 13% of CVD deaths, while tobacco results in 9%, diabetes 6%, lack of exercise 6% and obesity 5%. Rheumatic heart disease may follow untreated strep throat.',
                cardioTitleText: 'Cardiovascular Information',
                exerciseText: 'Exercise',
                exerciseInfo: 'Physical exercise is any bodily activity that enhances or maintains physical fitness and overall health and wellness. It is performed for various reasons, including increasing growth and development, preventing aging, strengthening muscles and the cardiovascular system, honing athletic skills, weight loss or maintenance, and merely enjoyment. Frequent and regular physical exercise boosts the immune system and helps prevent "diseases of affluence" such as cardiovascular disease, type 2 diabetes, and obesity. It may also help prevent stress and depression, increase quality of sleep and act as a non-pharmaceutical sleep aid to treat diseases such as insomnia, help promote or maintain positive self-esteem, improve mental health, maintain steady digestion and treat constipation and gas, regulate fertility health, and augment an individuals sex appeal or body image, which has been found to be linked with higher levels of self-esteem. Childhood obesity is a growing global concern, and physical exercise may help decrease some of the effects of childhood and adult obesity. Some care providers call exercise the "miracle" or "wonder" drug—alluding to the wide variety of benefits that it can provide for many individuals.',
                exerciseTitleText: 'Exercise Information',
                smokingText: 'Smoking',
                smokingInfo: 'Smoking is a practice in which a substance is burned and the resulting smoke breathed in to be tasted and absorbed into the bloodstream. Most commonly the substance is the dried leaves of the tobacco plant which have been rolled into a small square of rice paper to create a small, round cylinder called a "cigarette".',
                smokingTitleText: 'Smoking Information',
                alcoholText: 'Alcohol',
                alcoholInfo: 'An alcoholic beverage, or alcoholic drink, is a drink that contains a substantial amount of the psychoactive drug ethanol (informally called alcohol), a depressant which in low doses causes euphoria, reduced anxiety, and sociability and in higher doses causes intoxication (drunkenness), stupor and unconsciousness. Long-term use can lead to alcohol abuse, physical dependence, and alcoholism.',
                alcoholTitleText: 'Alcohol Information',
                hypertensionText: 'Hypertension',
                hypertensionInfo: 'Hypertension (HTN or HT), also known as high blood pressure (HBP), is a long term medical condition in which the blood pressure in the arteries is persistently elevated. High blood pressure usually does not cause symptoms. Long term high blood pressure, however, is a major risk factor for coronary artery disease, stroke, heart failure, peripheral vascular disease, vision loss, and chronic kidney disease.',
                hypertensionTitleText: 'Hypertension Information',
                dietText: 'Nutrition/Diet',
                dietInfo: 'In nutrition, diet is the sum of food consumed by a person or other organism. The word diet often implies the use of specific intake of nutrition for health or weight-management reasons (with the two often being related). Although humans are omnivores, each culture and each person holds some food preferences or some food taboos. This may be due to personal tastes or ethical reasons. Individual dietary choices may be more or less healthy.',
                dietTitleText: 'Nutrition/Diet Information',
                cancerText: 'Cancer Screening',
                cancerInfo: 'Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. Not all tumors are cancerous; benign tumors do not spread to other parts of the body. Possible signs and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss and a change in bowel movements. While these symptoms may indicate cancer, they may have other causes. Over 100 cancers affect humans.',
                cancerlTitleText: 'Cancer Information',
                wellnesExamNominatedText: 'Your Employer has nominated you for a Health wellness exam.',
                examTakenButtonText: 'I have already taken',
                lastWellnessExamText: 'Last wellness exam:',
                thanksText: 'Thanks for taking wellness exam on',
                sentNotifyText1: 'We have sent a notification to your physician Dr.',
                sentNotifyText2: 'to acknowledge the same',
                offerBannerText: 'Get 10% discount on taking wellness exam before July,2016',
                wellnessExamModalTitel: 'Wellnes Exam Details',
                examModalDate: 'Wellness Exam Date:',
                examModalCheckText: 'Please confirm that your physician has agreed to receive an email on your behalf from HealthWizz to acknowledge the same.'
            },
            sideMenu: {
                homeText: 'Home',
                findAphysicianText: 'Find A Physician',
                profileText: 'Profile',
                logoutText: 'Log Out'
            },
            findAphysician: {
                title: 'Find A Physician',
                insuranceOptionText: 'Insurance',
                specialityOptionText: 'Speciality',
                distanceText: 'Within',
                distanceUnit: 'Miles',
                submitButtonText: 'Submit'
            },
            physicanList: {
                title: 'Find A Physician',
                viewProfileText: 'view profile'
            },
            profile: {
                title: 'Profile',
                addressText: 'Address',
                cityOptionText: 'City',
                primaryPhysicianCHeckText: 'I have a primary physician',
                enterPrimaryPhysicianText: 'Enter Primary Physician',
                consentCheckText: 'Consent to share data with Primary Physician',
                preferedPharmacyText: 'Prefered Pharmacy',
                backupPharmacyText: 'Backup Pharmacy',
                mailOrderPharmacyText: 'Mail Order Pharmacy',
                nextOfKinText: 'Name of next of kin or power of attorney',
                insuracnceCheckText: 'I have a Insurance',
                enterPrimaryInsurance: 'Enter Primary Insurance',
                enterSecondaryInsurance: 'Enter Secondary Insurance',
                addMoreButtonText: 'ADD MORE',
                profileUpdateButtonText: 'Update'

            },
            bmiView: {
                title: 'BMI',
                info: 'Your BMI is less than expected. Click here to see list of doctor\'s in your location who can help you to decide your diet / routine to manage BMI.',
                explainHeading: 'Explaining your BMI status.',
                factorsInvoleHeading: 'Factors involved in calculating BMI',
                notDoneText: 'Not Done'


            },
            bmiEditView: {
                title: 'BMI',
                enterWeightText: 'Enter your Weight',
                enterHeightText: 'Enter your Height',
                weightText: 'Weight',
                heightText: 'Height',
                successMessage: 'Your BMI is updated successfully.'

            },
            lastHealthCHeckupView: {
                title: 'Wellness Exam',
                enterHealthCheckupDate: 'Your last Wellness Exam date:',
                notKnowHealthCheckupDate: 'Your Wellness Exam is due.',
                dontRemeberText: 'I dont\'t remember'

            },
            exerciseView: {
                title: 'Exercise',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Exercise status.',
                factorsInvoleHeading: 'Factors involved in Exercise Status',
                exerciseTypeLabel: 'Exercise type',
                successMessage: 'Your exercise status is modified successfully.'

            },
            dietView: {
                title: 'Nutrition/Diet',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Nutrition/Diet status.',
                factorsInvoleHeading: 'Factors involved in Nutrition/Diet',
                fattyFishLabel: 'Consuming a Fatty Fish meal aleast once a week',
                redMeatLabel: 'Your meat intake lean and trimmed Poultry variety vs Red meat',
                beansLabel: 'Consuming Legumes/beans several times a week',
                fruitsLabel: 'Consuming 2-3 whole fruits once a day',
                vegetableLabel: 'Consuming Vegetables as half of a day\'s dietary intake',
                restrictingLabel: 'Restricting your dietary salt intake and no added salt in prepared food'

            },
            dietEditView: {
                title: 'Nutrition/Diet',
                fattyFishMealCheckText: 'Do you consume a Fatty Fish meal aleast once a week ?',
                redMeatCheckText: 'Is your meat intake lean and and trimmed Poultry variety vs Red meat?',
                beansCheckText: 'Are you consuming Legumes/beans several times a week ?',
                fruitsCheckText: 'Are you consuming 2-3 whole fruits once a day ?',
                vegetableCheckText: 'Are you consuming Vegetables as half of a day\'s dietary intake?',
                restrictingChectText: 'Are you restricting your dietary salt intake and no added salt in prepared food?',
                successMessage: 'Your Nutrition/Diet status is modified successfully.'

            },
            waistView: {
                title: 'Waist',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Waist status.'

            },
            waistEditView: {
                waistCircumference: 'Waist Circumference',
                successMessage: 'Your Waist size is modified successfully.'
            },
            dibetesView: {
                title: 'Diabetes Risk',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Diabetes Risk status.',
                factorsInvoleHeading: 'Factors involved in calculating Diabetes Risk',
                ethinicBackgroundText: 'Ethinic Background: ',
                dibetesFactorText: 'Diabetes Inheritance: ',
                waistFactor: 'Waist Circumfance: ',
                bpFactorText: 'High Blood Pressure: ',
                alcoholFactorText: 'Alcohol intake: ',
                smokingFactorText: 'Smoking: '

            },
            diabetesEditView: {
                title: 'Diabetes Risk',
                relativeDiabetesInfoText: 'Do you have a brother or sister or a parent with Type two Diabetes?',
                ethinicCheckText: 'Are you from an Ethnic background such as an Asian, Hispanic or African American?',
                HbAText: 'Recent HbA 1 c level',
                glucoseLevelText: 'Fasting Glucose level',
                fastingGlucoseCheckText: 'Fasting Glucose level between 100-125 mg/dL on more than one ocassion?',
                successMessage: 'Your Diabetes status is modified successfully.'

            },
            cardiovascularView: {
                title: 'Cardiovascular',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Cardiovascular risk.',
                factorsInvoleHeading: 'Factors involved in calculating heart risk',
                relativeDiabetesInfoText: 'Relative with diabetes:',
                totalCholestrolText: 'Total cholesterol:',
                hdlCholestrolText: 'HDL cholesterol:',
                highBPText: 'High Blood Pressure:',
                alcoholText: 'Alcohol intake:',
                smokingText: 'Smoking:',
                successMessage: 'Your Cardiovascular status is modified successfully.'
            },
            alcoholView: {
                title: 'Alcohol',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Alcohol status.',
                factorsInvoleHeading: 'Factors involved in Alcohol status',
                oftenDringAlcoholLabel: 'How often you have a drink containing alcohol in the past year',
                drinksCountLabel: 'Drinks you have on a typical day when you were drinking in the past year',
                sixPlusDrinkLabel: 'How often you have 6 or more drinks on one occasion in the past year',
                successMessage: 'Your Alcohol status is modified successfully.'

            },
            cancerView: {
                title: 'Cancer Screening',
                breastCancer: 'Breast: Mammography',
                cervicalCancer: 'Cervical: Pap Exam',
                prostateCancer: 'Prostate Screen',
                colonCancer: 'Colonoscopy Screen',
                lungCancer: 'Lung : Low dose CT Chest',
                lastScreeningDate: 'Last Screening Date',
                nextScreeningDate: 'Next Screening Date'

            },
            hyperTensionView: {
                title: 'Hypertension',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Hypertension status.',
                factorsInvoleHeading: 'Factors involved in Hypertension status.'

            },
            hyperTensionEditView: {
                title: 'Hypertension ',
                systolicBPText: 'Systolic blood pressure (mmHg)',
                diastolicBPText: 'Diastolic blood pressure (mmHg)',
                treatedForHighBPCheck: 'Treated for high blood pressure',
                successMessage: 'Your Hypertension status is modified successfully.'

            },
            smokingView: {
                title: 'Smoking',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Smoking status.',
                factorsInvoleHeading: 'Factors involved in Smoking status'

            },
            smokingEditView: {
                title: 'Smoking',
                smokingCheckText: 'Are you smoking tobacco?',
                successMessage: 'Your Smoking status is modified successfully.'

            },
            sleepView: {
                title: 'Sleep Apnea',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Sleep status.',
                factorsInvoleHeading: 'Factors involved in Sleep status',
                snoreLabel: 'SNORE loudly ',
                tiredLabel: 'Often feel TIRED, fatigued, or sleepy during daytime',
                brethingLabel: 'Anyone OBSERVED you stop breathing during your sleep',
                shirtCollarMale: 'Shirt collar 17 inches or larger',
                shirtCollarFemale: 'Shirt collar 16 inches or larger'

            },
            sleepEditView: {
                title: 'Sleep Apnea',
                snoreCheckText: 'Do you SNORE loudly (louder than talking or loud enough to be heard through closed doors)?',
                tiredCheckText: 'Do you often feel TIRED, fatigued, or sleepy during daytime?',
                brethingCheckText: 'Has anyone OBSERVED you stop breathing during your sleep?',
                highBPCheckText: 'Do you have or are you being treated for high blood pressure?',
                shirtCollarMale: 'Is your shirt collar 17 inches or larger?',
                shirtCollarFemale: 'Is your shirt collar 16 inches or larger?',
                successMessage: 'Your sleep status is modified successfully.'

            },
            depressionView: {
                title: 'Depression',
                noDepressionText: 'No Depression',
                moderateDepression: 'Moderate Depression',
                severeDepression: 'Severe Depression',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Explaining your Depression status.',
                factorsInvoleHeading: 'Factors involved in Depression status',
                interestLabel: 'Little interest or pleasure in doing things',
                feelingDownLabel: 'Feeling down, depressed, or hopeless',
                sleepLabel: 'Trouble falling or staying asleep, or sleeping too much',
                tiredLabel: 'Feeling tired or having little energy',
                appetiteLabel: 'Poor appetite or overeating',
                failureLabel: 'Feeling bad about yourself, or that you are a failure, or have let yourself or your family down',
                concentratingLabel: 'Trouble concentrating on things, such as reading the newspaper or watching television',
                movingLabel: 'Moving or speaking so slowly that other people could have noticed? Or the opposite, being so fidgety or restless that you have been moving around a lot more than usual',
                thoughtsLabel: 'Thoughts that you would be better off dead or of hurting yourself in some way',
                successMessage: 'Your depression status is modified successfully.',
                depressionEditQuestionHeadingText: 'Over the last two weeks, how often have you been bothered by any of the following problems?',
                notAtAllText: 'Not at all',
                severalDaysText: 'Several days',
                moreThanHalfText: 'More than half the days',
                nearlyDayText: 'Nearly day'

            }

        },
        message: {
            common: {
                required: 'Required!',
                invalidEmail: 'Please enter a valid email!',
                invalidPassword: 'Password should be atleast 6 characters long!',
                logoutText: 'Are you sure to log out from app.'

            },
            login: {},
            register: {
                registerSuccess: 'An activation link has been sent to your email. Please check your email!'
            },
            forgotPassword: {
                resetPasswordMessage: 'A Reset password link mailed to given Email!'
            },
            profile: {
                profileUpdate: 'Profile has been updated!'
            }
        },
        months: [{
            name: 'January,'
    }, {
            name: 'February,'
    }, {
            name: 'March, '
    }, {
            name: 'April,'
    }, {
            name: 'May,'
    }, {
            name: 'June,'
    }, {
            name: 'July,'
    }, {
            name: 'August,'
    }, {
            name: 'September,'
    }, {
            name: 'October,'
    }, {
            name: 'November,'
    }, {
            name: 'December,'
    }],
        exercise: [{
            name: 'No Exercise',
            checked: false,
            more: ''
    }, {
            name: 'Moderate Intensity Aerobic exercise',
            description: 'Moderate Intensity Aerobic exercise like Treadmill, Cycling, running for 150 minutes every week AND Muscle strengthening exercises involving all major muscle groups like weight lifting or weight training atleast two days a week?',
            checked: false,
            more: 'more'
    }, {
            name: 'Vigorous intensity aerobic exercise',
            description: 'Vigorous intensity aerobic exercise for 75 minutes every week AND Muscle strengthening exercises involving all major muscle groups like weight lifting or weight training atleast two days a week?',
            checked: false,
            more: 'more'
    }, {
            name: 'An equal mix of moderate and vigorous aerobic exercise',
            description: 'An equal mix of moderate and vigorous aerobic exercise AND muscle strengthening exercises involving all major muscle groups like weight lifting or weight training atleast two days a week?',
            checked: false,
            more: 'more'
    }],
        alcoholQuestions: [{
            question: 'How often did you have a drink containing alcohol in the past year?',
            options: [
                {
                    name: 'Never',
                    checked: false,
                    id: 1
    }, {
                    name: 'Monthly or less',
                    checked: false,
                    id: 1
    }, {
                    name: '2 to 4 times a month',
                    checked: false,
                    id: 1
    }, {
                    name: '2 to 3 times a week',
                    checked: false,
                    id: 1
    }, {
                    name: '4 or more times a week',
                    checked: false,
                    id: 1
    }
  ]
    }, {
            question: 'How many drinks did you have on on a typical day when you were drinking in the past year?',
            options: [
                {
                    name: '1 or 2',
                    checked: false,
                    id: 2
    }, {
                    name: '3 or 4',
                    checked: false,
                    id: 2
    }, {
                    name: '5 or 6',
                    checked: false,
                    id: 2
    }, {
                    name: '7 or 9',
                    checked: false,
                    id: 2
    }, {
                    name: '10 or more',
                    checked: false,
                    id: 2
    }
  ]
}, {
            question: 'How often did you have 6 or more drinks on one occasion in the past year? ',
            options: [
                {
                    name: 'Never',
                    checked: false,
                    id: 3
    }, {
                    name: 'Less than monthly',
                    checked: false,
                    id: 3
    }, {
                    name: 'Monthly',
                    checked: false,
                    id: 3
    }, {
                    name: 'Weekly',
                    checked: false,
                    id: 3
    }, {
                    name: 'Daily or almost daily',
                    checked: false,
                    id: 3
    }
  ]
}],
        speciality: [
            {
                name: 'Accupuncturist',
                code: '1'
        },
            {
                name: 'Allergist',
                code: '2'
        },
            {
                name: 'Audiologist',
                code: '3'
        },
            {
                name: 'Cardiologist',
                code: '4'
        },
            {
                name: 'Cardiothoracic Surgeon',
                code: '5'
        },
            {
                name: 'Chiropractor',
                code: '6'
        },
            {
                name: 'Colorectal Surgeon',
                code: '7'
        },
            {
                name: 'Dentist',
                code: '8'
        },
            {
                name: 'Dititian/Nutritionist',
                code: '9'
        },
            {
                name: 'Eye Doctor',
                code: '10'
        },
            {
                name: 'Gastroenterologist',
                code: '11'
        },
            {
                name: 'Geriatrician',
                code: '12'
        },
            {
                name: 'Hearing Specialist',
                code: '13'
        },
            {
                name: 'Hematologist',
                code: '14'
        },
            {
                name: 'Infectious Disease Specialist',
                code: '15'
        },
            {
                name: 'Midwife',
                code: '16'
        },
            {
                name: 'Naturopathic Doctor',
                code: '17'
        },
            {
                name: 'Nephrologist',
                code: '18'
        },
            {
                name: 'Neurologist',
                code: '19'
        },
            {
                name: 'Neurosurgeon',
                code: '20'
        },
            {
                name: 'OB-GYN(Obstetrician-Gynecologist)',
                code: '21'
        },
            {
                name: 'Oncologist',
                code: '22'
        },
            {
                name: 'Opthalmologist',
                code: '23'
        },
            {
                name: 'Optometrist',
                code: '24'
        },
            {
                name: 'Oral Surgeon',
                code: '25'
        },
            {
                name: 'Orthopedic Surgeon(Orthopedist)',
                code: '26'
        },
            {
                name: 'Pain Management Specialist',
                code: '27'
        },
            {
                name: 'Pediatric Dentist',
                code: '28'
        },
            {
                name: 'Pediatrician',
                code: '29'
        },
            {
                name: 'Physiatrist(Physical Medicine)',
                code: '30'
        },
            {
                name: 'Physical Therapist',
                code: '31'
        },
            {
                name: 'Plastic Surgeon',
                code: '32'
        },
            {
                name: 'Podiatrist',
                code: '33'
        },
            {
                name: 'Primary Care Doctor',
                code: '34'
        },
            {
                name: 'Psychiatrist',
                code: '35'
        },
            {
                name: 'Psychologist',
                code: '36'
        },
            {
                name: 'Pulmonologist',
                code: '37'
        },
            {
                name: 'Radiologist',
                code: '38'
        },
            {
                name: 'Rheumatologist',
                code: '39'
        },
            {
                name: 'Sleep Medicine Specialist',
                code: '40'
        },
            {
                name: 'Sports Medicine Specialist',
                code: '41'
        },
            {
                name: 'Surgeon',
                code: '42'
        },
            {
                name: 'Therapist/Counselor',
                code: '43'
        },
            {
                name: 'Urgent Care Doctor',
                code: '44'
        },
            {
                name: 'Urological Doctor',
                code: '45'
        },
            {
                name: 'Urologist',
                code: '46'
        },
            {
                name: 'Vascular Surgeon',
                code: '47'
        },
            {
                name: 'Family Medicine',
                code: '48'
        },
            {
                name: 'Internal Medicine',
                code: '49'
        }
    ]
    },
    spanish: {
        label: {
            common: {
                username: 'User Name',
                email: 'Email',
                password: 'Contraseña',
                fontSizeText: 'Tamaño de fuente',
                optionsFontText: 'A',
                firstNameText: 'Nombre de pila',
                lastNameText: 'Apellido',
                zipcodeText: 'Código postal',
                sexText: 'Género',
                dateOfBirthText: 'Fecha de nacimiento:',
                mobileNumberText: 'Numero de celular',
                consultAphysicianText: 'Consulte a un médico',
                cancelText: 'Cancelar',
                yesText: 'Sí',
                okText: 'DE ACUERDO',
                backText: 'Espalda',
                success: 'Éxito',
                done: 'Hecho',
                registerText: 'Registrese Hoy!!!',
                languageSelectionTitle: 'Seleccione el idioma',
                english: 'English',
                spanish: 'Español',
                consultPhysicianButtonText: 'Consulte a un médico',
                healthyText: 'Saludable',
                riskText: 'Riesgo',
                highRiskText: 'Alto riesgo',
                lastUpdatedText: 'Última actualización: ',
                saveText: 'Salvar',
                modifyText: 'Modificar',
                lastHealthCheckupText: 'Su último examen de salud estaba en',
                checkupDueText: 'Su último examen de bienestar es debida desde ',
                lastCheckupText: 'La última prueba de bienestar',
                employerWellnessExamText: 'Programa de Bienestar empleador',
                wellnessDataNotAvailable: 'Informacion no disponible',
                enterWellnessExamDetailText: 'Introduzca los detalles si ya había tomado',
                findAPhysicianForExam: 'Buscar un médico para examen de salud'

            },
            login: {
                title: 'Iniciar sesión',
                buttonText: 'Log In',
                forgotPasswordText: 'Se te olvidó tu contraseña'
            },
            register: {
                title: 'Registro',
                showPasswordText: 'Mostrar contraseña',
                promoCodeText: 'Tengo un código de referencia del empleador',
                promoCodeInputText: 'Empleador Código de Referencia',
                appPrivacyText: 'he leido y acepto ',
                appPrivacyLinkText: 'Política de privacidad de Healthwizz',
                privacyTitle: 'Intimidad',
                hipaaAuthorisationText: 'he leido y acepto ',
                hipaaAuthorisationLinkText: 'Autorización de HIPAA',
                hipaaAuthorisationTitle: 'Autorización de HIPAA',
                notificationText: 'Quiero recibir correo electrónico / notificación del Healthwizz de',
                registerButtonText: 'Registro'
            },
            forgotPassword: {
                title: 'Se te olvidó tu contraseña',
                label: 'Introduzca el correo electrónico asociada con su cuenta .',
                resetPasswordButtonText: 'Reiniciar'

            },
            dashboard: {
                title: 'Tablero',
                bmiText: 'IMC',
                bmiInfo: 'El índice de masa corporal ( IMC ) o índice de Quetelet es un valor derivado de la masa ( peso) y la altura de un individuo . El IMC se define como la masa corporal dividido por el cuadrado de la altura del cuerpo , y se expresa universalmente en unidades de kg / m2, que resulta de masa en kilogramos y la altura en metros.',
                bmiTitleText: 'Información IMC',
                depressionText: 'Depresión',
                depressionInfo: 'La depresión es un estado de ánimo bajo y la aversión a la actividad que puede afectar a personas , pensamientos , sentimientos y comportamientos sensación de being.People con un estado de ánimo deprimido puede sentir tristeza, ansiedad , vacío, desesperado, impotente , inútil , culpable , irritable , enojado , avergonzado o inquieto . Pueden perder interés en actividades que antes eran placenteras , experimenta pérdida de apetito o comer en exceso , tienen problemas para concentrarse, recordar detalles o la toma de decisiones , tienen dificultades de relación y pueden contemplar, o intentar suicidarse. Insomnio, exceso de sueño , fatiga, dolores, dolores , problemas digestivos o reducida de energía también puede ser present.Depressed estado de ánimo es una característica de algunos síndromes psiquiátricos como el trastorno depresivo mayor , pero también puede ser una reacción normal , siempre y cuando lo hace no persistir a largo plazo, para eventos de la vida como el duelo , un síntoma de algunas dolencias corporales o un efecto secundario de algunos medicamentos y tratamientos médicos .',
                depressionTitleText: 'Información de la depresión',
                waistText: 'Cintura',
                waistInfo: 'La cintura es la parte del abdomen, entre la caja torácica y las caderas. En las personas con cuerpos delgados , la cintura es la parte más estrecha de la cintura torso.The refiere a la línea horizontal en la que la cintura es más estrecha , o la apariencia general de la cintura.',
                waistTitleText: 'Información de la cintura',
                dibetesText: 'Diabetes',
                dibetesInfo: 'La diabetes mellitus ( DM ) , comúnmente conocida como la diabetes , es un grupo de enfermedades metabólicas en las que hay niveles altos de azúcar en la sangre durante un periodo prolongado . Los síntomas de niveles altos de azúcar en la sangre incluyen micción frecuente , aumento de la sed , y el aumento del hambre . Si no se trata , la diabetes puede causar muchas complicaciones . [ 3 ] Las complicaciones agudas incluyen cetoacidosis diabética y el coma hiperosmolar no cetónico . Las complicaciones graves a largo plazo incluyen la enfermedad cardiovascular , accidente cerebrovascular, insuficiencia renal crónica , úlceras en los pies , y el daño a los ojos .',
                dibetesTitleText: 'Información Diabetes',
                sleepText: 'Apnea del sueño',
                sleepInfo: 'El sueño es un estado de ánimo naturalmente periódica se caracteriza por alteración de la conciencia, la actividad sensorial relativamente inhibido, la inhibición de casi todos los músculos voluntarios, y las interacciones con el entorno reducido. Se distingue de la vigilia por una disminución de la capacidad de reaccionar a los estímulos, pero es más fácilmente revertida que el estado de hibernación o de estar en estado de coma. sueño de mamífero se produce en la repetición de los periodos, en los que los suplentes cuerpo entre dos modos muy distintos conocidos como no-REM y sueño REM. REM significa "movimiento rápido del ojo", pero implica muchos otros aspectos incluidos virtual parálisis del sueño body.During, la mayoría de los sistemas en un animal están en un estado anabólico, la construcción de los sistemas inmunológico, nervioso, esqueléticos y musculares. El sueño en animales no humanos se observa en los mamíferos, aves, reptiles, anfibios y peces, y, de alguna forma, en los insectos e incluso en los animales más simples, tales como nematodos. El reloj circadiano interno favorece el sueño diariamente por la noche en especies diurnas (por ejemplo, seres humanos) y en los días en los organismos nocturnos (tales como roedores). Sin embargo, los patrones de sueño varían ampliamente entre los animales y entre diferentes individuos humanos. La industrialización y la luz artificial han alterado sustancialmente los hábitos de sueño humanos en los últimos 100 años.',
                sleepTitleText: 'Información del sueño',
                cardioText: 'Cardiovascular',
                cardioInfo: 'Las enfermedades cardiovasculares ( ECV) son una clase de enfermedades que implican el corazón o los vasos sanguíneos. La enfermedad cardiovascular incluye enfermedades de las arterias coronarias (CAD) , tales como angina de pecho e infarto de miocardio (comúnmente conocido como un ataque al corazón ) . Otras enfermedades cardiovasculares son accidente cerebrovascular, cardiopatía hipertensiva , cardiopatía reumática , cardiomiopatía , arritmia cardíaca, enfermedad cardíaca congénita , enfermedad cardíaca valvular , la carditis , aneurismas de la aorta , enfermedad arterial periférica , y los mecanismos subyacentes thrombosis.The venosos variar dependiendo de la enfermedad de que se trate . enfermedad de la arteria coronaria , accidente cerebrovascular y enfermedad arterial periférica implican la aterosclerosis . Esto puede ser causado por la hipertensión arterial, el tabaquismo , la diabetes , la falta de ejercicio , la obesidad , el colesterol alto , la mala alimentación y el consumo excesivo de alcohol , entre otros . Resultados de la hipertensión arterial en el 13% de las muertes por ECV , mientras que los resultados de tabaco en un 9% , 6% para la diabetes , la falta de ejercicio y la obesidad 6 % 5 % . La cardiopatía reumática puede seguir a la faringitis estreptocócica no tratada .',
                cardioTitleText: 'Información cardiovascular',
                exerciseText: 'Ejercicio',
                exerciseInfo: 'El ejercicio físico es cualquier actividad corporal que mejora o mantiene la aptitud física y la salud general y el bienestar. Se realiza por diversas razones, entre ellas el aumento del crecimiento y el desarrollo, la prevención del envejecimiento, fortalecimiento de los músculos y el sistema cardiovascular, perfeccionar las habilidades atléticas, pérdida de peso o mantenimiento, y se limita el disfrute. ejercicio físico frecuente y regular estimula el sistema inmunológico y ayuda a prevenir "enfermedades de los ricos", tales como las enfermedades cardiovasculares, la diabetes tipo 2 y la obesidad. También puede ayudar a prevenir el estrés y la depresión, aumentar la calidad del sueño y actuar como una ayuda no farmacéutico del sueño para el tratamiento de enfermedades como el insomnio, ayudar a promover o mantener una autoestima positiva, mejorar la salud mental, mantener una digestión estable y tratar el estreñimiento y el gas , regular la fertilidad de la salud, y aumentar una imagen de apelación individuos del sexo o el cuerpo, que se ha encontrado para ser relacionado con mayores niveles de autoestima. La obesidad infantil es un problema mundial cada vez mayor, y el ejercicio físico puede ayudar a disminuir algunos de los efectos de la obesidad infantil y adulta. Algunos proveedores de cuidados de salud llame ejercer el "milagro" o a la amplia variedad de beneficios que puede proporcionar para muchas personas "maravilla", en alusión drogas.',
                exerciseTitleText: 'Información de ejercicio',
                smokingText: 'De fumar',
                smokingInfo: 'El tabaquismo es una práctica en la que se quema una sustancia y el humo resultante aspiró a ser probado y se absorbe en el torrente sanguíneo . Lo más común es la sustancia de las hojas secas de la planta de tabaco que se han rodado en un pequeño cuadrado de papel de arroz para crear un cilindro pequeño , redondo llamado un " cigarrillo " .',
                smokingTitleText: 'Información de fumar',
                alcoholText: 'Alcohol',
                alcoholInfo: 'Una bebida alcohólica , o una bebida alcohólica , es una bebida que contiene una cantidad sustancial del etanol de psicofármacos ( informalmente llamado alcohol ) , un depresivo que a dosis bajas provoca euforia, reducción de la ansiedad , y la sociabilidad y en dosis altas causa intoxicación ( embriaguez ) , estupor y pérdida del conocimiento . El uso a largo plazo puede conducir al abuso de alcohol , dependencia física , y el alcoholismo .',
                alcoholTitleText: 'Información de alcohol',
                hypertensionText: 'Hipertensión',
                hypertensionInfo: 'La hipertensión arterial ( HTA ​​o HT ) , también conocida como presión arterial (HTA ) , es una condición médica a largo plazo en el que la presión sanguínea en las arterias es elevada persistente . La hipertensión generalmente no causa síntomas . presión arterial alta a largo plazo, sin embargo , es un factor de riesgo importante para la enfermedad de la arteria coronaria , accidente cerebrovascular , insuficiencia cardíaca , enfermedad vascular periférica , pérdida de la visión , y la enfermedad renal crónica .',
                hypertensionTitleText: 'Información de la hipertensión',
                dietText: 'Nutrición / Dieta',
                dietInfo: 'En la nutrición , la dieta es la suma de los alimentos consumidos por una persona o de otro organismo. La dieta de la palabra a menudo implica el uso de la ingesta específica de la nutrición por razones de salud o de control de peso (con los dos a menudo están relacionados ) . Aunque los seres humanos son omnívoros , cada cultura y cada persona lleva a cabo algunas de las preferencias de alimentos o algunos tabúes alimentarios . Esto puede ser debido a los gustos personales o razones éticas. opciones dietéticas individuales pueden ser más o menos saludable .',
                dietTitleText: 'Nutrición / dieta información',
                cancerText: 'Detección del cáncer',
                cancerInfo: 'El cáncer es un grupo de enfermedades que implican el crecimiento celular anormal con el potencial para invadir o extenderse a otras partes del cuerpo. No todos los tumores son cancerosos ; Los tumores benignos no se diseminan a otras partes del cuerpo . Los posibles signos y síntomas incluyen un bulto , sangrado anormal , tos persistente , pérdida de peso inexplicable y un cambio en las deposiciones. Si bien estos síntomas pueden indicar cáncer, pueden tener otras causas . Más de 100 tipos de cáncer afectan a los seres humanos .',
                cancerlTitleText: 'Información sobre el Cáncer',
                wellnesExamNominatedText: 'Su empleador le ha nominado para un examen de salud de la Salud.',
                examTakenButtonText: 'Ya he tomado',
                lastWellnessExamText: 'Último examen de salud :',
                thanksText: 'Gracias por tomarse el examen de salud',
                sentNotifyText1: 'Hemos enviado una notificación a su médico Dr.',
                sentNotifyText2: 'reconocer la misma',
                offerBannerText: 'Obtener 10 % de descuento en la consideración de examen de salud antes de julio de 2016',
                wellnessExamModalTitel: 'Wellnes detalles del examen',
                examModalDate: 'Bienestar Fecha del examen :',
                examModalCheckText: 'Por favor, compruebe que su médico ha aceptado recibir un correo electrónico en su nombre de HealthWizz reconocer la misma .'
            },
            sideMenu: {
                homeText: 'Casa',
                findAphysicianText: 'Busque un médico',
                profileText: 'Perfil',
                logoutText: 'Cerrar sesión'
            },
            findAphysician: {
                title: 'Busque un médico',
                insuranceOptionText: 'Seguro',
                specialityOptionText: 'Especialidad',
                distanceText: 'Dentro',
                distanceUnit: 'Miles',
                submitButtonText: 'Enviar'
            },
            physicanList: {
                title: 'Busque un médico',
                viewProfileText: 'ver perfil'
            },
            profile: {
                title: 'Perfil',
                addressText: 'Dirección',
                cityOptionText: 'Ciudad',
                primaryPhysicianCHeckText: 'Tengo un médico de atención primaria',
                enterPrimaryPhysicianText: 'Introduzca médico de atención primaria',
                consentCheckText: 'Consentimiento para compartir datos con médico de atención primaria',
                preferedPharmacyText: 'Farmacia preferida',
                backupPharmacyText: 'Farmacia de copia de seguridad',
                mailOrderPharmacyText: 'Farmacia de pedidos por correo',
                nextOfKinText: 'Nombre del pariente más próximo o poder notarial',
                insuracnceCheckText: 'Tengo un Seguro',
                enterPrimaryInsurance: 'Introduzca seguro primario',
                enterSecondaryInsurance: 'Introduzca Seguro Secundario',
                addMoreButtonText: 'AÑADIR MÁS',
                profileUpdateButtonText: 'Actualizar'

            },
            bmiView: {
                title: 'Información IMC',
                info: 'Su IMC es menor de lo esperado . <a> Haga clic aquí para ver la lista </a> del médico de su ubicación en la que pueda ayudar a decidir su dieta / rutina para gestionar el IMC.',
                explainHeading: 'Al explicar el estado de su índice de masa corporal .',
                factorsInvoleHeading: 'Factores que intervienen en el cálculo de índice de masa corporal',
                notDoneText: 'no realizado'

            },
            bmiEditView: {
                title: 'IMC',
                enterWeightText: 'Ingrese su peso',
                enterHeightText: 'Introduzca su altura',
                weightText: 'Peso',
                heightText: 'Altura',
                successMessage: 'Su índice de masa corporal se actualiza correctamente.'

            },
            lastHealthCHeckupView: {
                title: 'Examen de bienestar',
                enterHealthCheckupDate: 'Su última fecha de examen de salud:',
                notKnowHealthCheckupDate: 'Su examen de salud se debe.',
                dontRemeberText: 'No recuerdo'

            },
            exerciseView: {
                title: 'Ejercicio',
                activeText: 'Activo',
                inactiveText: 'Inactivo',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar su estado de Ejercicio .',
                factorsInvoleHeading: 'Factores que intervienen en el ejercicio de estado',
                exerciseTypeLabel: 'tipo de ejercicio',
                successMessage: 'El estado de su ejercicio se ha modificado correctamente .'

            },
            dietView: {
                title: 'Nutrición / Dieta',
                activeText: 'Activo',
                inactiveText: 'Inactivo',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar su situación / Dieta Nutrición .',
                factorsInvoleHeading: 'Los factores que intervienen en la nutrición / dieta',
                fattyFishLabel: 'El consumo de una comida de pescado graso aleast una vez por semana',
                redMeatLabel: 'magra su consumo de carne y aves de corral recortado variedad vs La carne roja',
                beansLabel: 'El consumo de legumbres / frijoles varias veces a la semana',
                fruitsLabel: 'El consumo de 2-3 frutas enteras una vez al día',
                vegetableLabel: 'El consumo de verduras como la mitad de la ingesta dietética de un día',
                restrictingLabel: 'La restricción de la ingesta de sal en la dieta y sin sal en los alimentos preparados'

            },
            dietEditView: {
                title: 'Nutrición / Dieta',
                fattyFishMealCheckText: '¿Es usted consume una comida pescado graso aleast una vez por semana ?',
                redMeatCheckText: 'Es el producto de la carne magra y aves de corral y se recorta variedad vs La carne roja ?',
                beansCheckText: '¿Está consumiendo Legumbres / frijoles varias veces a la semana?',
                fruitsCheckText: '¿Está consumiendo 2-3 frutas enteras una vez al día ?',
                vegetableCheckText: '¿Está consumiendo verduras como la mitad de la ingesta dietética de un día ?',
                restrictingChectText: '¿Está restricción de la ingesta dietética de sal y sin sal en la comida preparada ?',
                successMessage: 'Su estado de nutrición / dieta se modificó con éxito.'

            },
            waistView: {
                title: 'Cintura',
                activeText: 'Activo',
                inactiveText: 'Inactivo',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar el estado de su cintura .'

            },
            waistEditView: {
                waistCircumference: 'Circunferencia de la cintura',
                successMessage: 'El tamaño de su cintura se modificó con éxito.'
            },
            dibetesView: {
                title: 'Diabetes',
                activeText: 'Activo',
                inactiveText: 'Inactivo',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar el estado de su diabetes.',
                factorsInvoleHeading: 'Los factores que intervienen en el cálculo de Diabetes',
                ethinicBackgroundText: 'Antecedentes ethinic: ',
                dibetesFactorText: 'la diabetes de herencia: ',
                waistFactor: 'cintura Circumfance: ',
                bpFactorText: 'Alta presion sanguinea: ',
                alcoholFactorText: 'Consumo de alcohol: ',
                smokingFactorText: 'De fumar: '

            },
            diabetesEditView: {
                title: 'Diabetes',
                relativeDiabetesInfoText: '¿Tiene un hermano o hermana o un padre con diabetes tipo dos ?',
                ethinicCheckText: 'Es usted de origen étnico como un americano asiático , hispano o africano?',
                HbAText: 'HbA 1c nivel reciente',
                glucoseLevelText: 'nivel de glucosa en ayunas',
                fastingGlucoseCheckText: 'nivel de glucosa en ayunas entre 100-125 mg / dl en más de una ocasión ?',
                successMessage: 'El estado de su diabetes se modificó con éxito.'

            },
            cardiovascularView: {
                title: 'Cardiovascular',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar su riesgo cardiovascular .',
                factorsInvoleHeading: 'Los factores que intervienen en el cálculo del riesgo cardíaco',
                relativeDiabetesInfoText: 'Relativa con diabetes:',
                totalCholestrolText: 'Colesterol total:',
                hdlCholestrolText: 'Colesterol HDL:',
                highBPText: 'Alta presion sanguinea:',
                alcoholText: 'Consumo de alcohol:',
                smokingText: 'De fumar:',
                successMessage: 'Su estado cardiovascular se modifica con éxito.'
            },

            alcoholView: {
                title: 'Alcohol',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar su estado de alcohol .',
                factorsInvoleHeading: 'Al explicar su estado de Alcohol.',
                oftenDringAlcoholLabel: '¿Con qué frecuencia usted tiene una bebida que contiene alcohol en el último año',
                drinksCountLabel: 'Las bebidas que tiene en un día típico cuando estaba bebiendo en el último año',
                sixPlusDrinkLabel: '¿Con qué frecuencia tiene 6 o más bebidas en una ocasión en el último año',
                successMessage: 'Su estado de alcohol se modificó con éxito.'

            },
            cancerView: {
                title: 'Detección del cáncer',
                breastCancer: 'Detección del cáncer de mama',
                cervicalCancer: 'Detección del cáncer de cuello de útero',
                prostateCancer: 'Detección del cáncer de próstata',
                colonCancer: 'Detección del cáncer de colon',
                lungCancer: 'Detección del cáncer de pulmón',
                lastScreeningDate: 'Último pase Fecha',
                nextScreeningDate: 'Presentación de la próxima fecha'

            },
            hyperTensionView: {
                title: 'Hipertensión',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar su estado de hipertensión .',
                factorsInvoleHeading: 'Los factores que intervienen en el estado de hipertensión.'

            },
            hyperTensionEditView: {
                title: 'Hipertensión ',
                systolicBPText: 'La presión arterial sistólica ( mmHg )',
                diastolicBPText: 'La presión arterial diastólica ( mmHg )',
                treatedForHighBPCheck: 'Tratamiento para la presión arterial alta',
                successMessage: 'Su estado de hipertensión se modificó con éxito.'

            },
            smokingView: {
                title: 'De fumar',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar su estado de fumar .',
                factorsInvoleHeading: 'Los factores que intervienen en el estado de fumar'

            },
            smokingEditView: {
                title: 'De fumar',
                smokingCheckText: 'Estás fumando tabaco?',
                successMessage: 'Su nivel de tabaquismo se modifica con éxito.'

            },
            sleepView: {
                title: 'Apnea del sueño',
                activeText: 'Active',
                inactiveText: 'Inactive',
                info: 'Está demostrado médicamente que las personas que no hacen ejercicio regural tienen un mayor riesgo de infarto de corazón , diabetes , cáncer , etc.',
                explainHeading: 'Al explicar su estado de sueño .',
                factorsInvoleHeading: 'Los factores que intervienen en el modo de reposo',
                snoreLabel: 'roncan fuerte',
                tiredLabel: 'A menudo se siente cansado , fatigado , o con sueño durante el día',
                brethingLabel: 'Cualquier persona OBSERVADO usted deja de respirar durante el sueño',
                shirtCollarMale: 'Camisa de cuello de 17 pulgadas o más grandes',
                shirtCollarFemale: 'Camisa de cuello de 16 pulgadas o más grandes'

            },
            sleepEditView: {
                title: 'Apnea del sueño',
                snoreCheckText: '¿Usted ronca voz alta ( más que hablar o lo suficientemente fuerte para ser escuchado a través de puertas cerradas ) ?',
                tiredCheckText: '¿A menudo se siente cansado , fatigado , o con sueño durante el día ?',
                brethingCheckText: 'cualquiera que haya observado usted deja de respirar durante el sueño ?',
                highBPCheckText: '¿Tiene o está recibiendo tratamiento para la presión arterial alta ?',
                shirtCollarMale: 'Es su camisa de cuello de 17 pulgadas o más grande?',
                shirtCollarFemale: 'Es su camisa de cuello de 16 pulgadas o más grande?',
                successMessage: 'Su estado de sueño se modifica con éxito.'

            },
            depressionView: {
                title: 'Depresión',
                noDepressionText: 'No Depression',
                moderateDepression: 'La depresión moderada',
                severeDepression: 'Depresión severa',
                inactiveText: 'Inactive',
                info: 'It is medically proven that people who do not do regural exercise have a higher risk of Heart desease, Diabetes, cancer etc.',
                explainHeading: 'Al explicar su estado de depresión .',
                factorsInvoleHeading: 'Los factores que intervienen en el estado de depresión',
                interestLabel: 'Poco interés o placer en hacer las cosas',
                feelingDownLabel: 'Se siente triste , deprimido o sin esperanza',
                sleepLabel: 'Problemas para conciliar o mantener el sueño , o dormir demasiado',
                tiredLabel: 'Sensación de cansancio o tener poca energía',
                appetiteLabel: 'Falta de apetito o comer en exceso',
                failureLabel: 'Siente mal consigo mismo , o que son un fracaso, o tienen dejarse oa su familia',
                concentratingLabel: 'Dificultad para concentrarse en las cosas , como leer el periódico o ver la televisión',
                movingLabel: 'Se mueve o habla tan lentamente que otras personas pueden darse cuenta ? O lo contrario , al estar tan inquieto o intranquilo que se le ha mueve mucho más de lo habitual',
                thoughtsLabel: 'Pensamientos que sería mejor estar muerto o de daño de alguna manera',
                successMessage: 'Su estado de depresión se modifica con éxito.',
                depressionEditQuestionHeadingText: 'Durante las últimas dos semanas , ¿con qué frecuencia le han molestado por cualquiera de los siguientes problemas ?',
                notAtAllText: 'De ningún modo',
                severalDaysText: 'Varios dias',
                moreThanHalfText: 'Más de la mitad de los días',
                nearlyDayText: 'casi el día'


            }

        },
        message: {
            common: {
                required: 'Necesario!',
                invalidEmail: 'Por favor introduzca una dirección de correo electrónico válida!',
                invalidPassword: 'La contraseña debe tener al menos 6 caracteres!',
                logoutText: '¿Está seguro de cerrar la sesión de aplicación?'

            },
            login: {},
            register: {
                registerSuccess: 'Un link de activación ha sido enviada a su email. Por favor, consultar su correo electrónico!'

            },
            forgotPassword: {
                resetPasswordMessage: 'Un enlace Restablecer contraseña enviada por correo a dado por correo electrónico!'
            },
            profile: {
                profileUpdate: 'El perfil ha sido actualizado!'
            }
        },
        months: [{
            name: 'enero,'
    }, {
            name: 'febrero,'
    }, {
            name: 'marzo,'
    }, {
            name: 'abril,'
    }, {
            name: 'Mayo,'
    }, {
            name: 'junio,'
    }, {
            name: 'julio,'
    }, {
            name: 'agosto,'
    }, {
            name: 'septiembre,'
    }, {
            name: 'Octubre,'
    }, {
            name: 'noviembre,'
    }, {
            name: 'diciembre,'
    }],
        exercise: [{
            name: 'sin Ejercicio',
            checked: false,
            more: ''
    }, {
            name: 'El ejercicio aeróbico intensidad moderada',
            description: 'Moderada intensidad del ejercicio aeróbico como cinta de correr , ciclismo, correr durante 150 minutos cada semana y ejercicios de fortalecimiento muscular que participen todos los grupos musculares más importantes , como el levantamiento de pesas o entrenamiento con pesas Atleast dos días a la semana?',
            checked: false,
            more: 'Más'
    }, {
            name: 'el ejercicio aeróbico de intensidad vigorosa',
            description: 'el ejercicio aeróbico de intensidad vigorosa durante 75 minutos cada semana y ejercicios de fortalecimiento muscular que participen todos los grupos musculares más importantes , como el levantamiento de pesas o entrenamiento con pesas Atleast dos días a la semana?',
            checked: false,
            more: 'Más'
    }, {
            name: 'Una mezcla igual de ejercicio aeróbico moderado y vigoroso',
            description: 'Una mezcla igual de ejercicio aeróbico y ejercicios musculares moderadas y vigorosas fortalecimiento de la participación de todos los grupos musculares más importantes , como el levantamiento de pesas o entrenamiento con pesas Atleast dos días a la semana?',
            checked: false,
            more: 'Más'
    }],
        alcoholQuestions: [{
            question: '¿Con qué frecuencia tiene una bebida que contiene alcohol en el último año?',
            options: [
                {
                    name: 'Nunca',
                    checked: false,
                    id: 1
    }, {
                    name: ' Mensual o menos',
                    checked: false,
                    id: 1
    }, {
                    name: '2 a 4 veces al mes',
                    checked: false,
                    id: 1
    }, {
                    name: '2 a 3 veces a la semana',
                    checked: false,
                    id: 1
    }, {
                    name: '	4 o más veces a la semana',
                    checked: false,
                    id: 1
    }
  ]
    }, {
            question: '¿Cuántas copas se servía, en un día típico cuando estaba bebiendo en el último año ?',
            options: [
                {
                    name: '1 o 2',
                    checked: false,
                    id: 2
    }, {
                    name: '3 o 4',
                    checked: false,
                    id: 2
    }, {
                    name: '5 o 6 ',
                    checked: false,
                    id: 2
    }, {
                    name: '7 o 9 ',
                    checked: false,
                    id: 2
    }, {
                    name: '10 o más ',
                    checked: false,
                    id: 2
    }
  ]
}, {
            question: '¿Con qué frecuencia tiene 6 o más bebidas en una ocasión en el último año ? ',
            options: [
                {
                    name: 'Nunca',
                    checked: false,
                    id: 3
    }, {
                    name: 'Menos una vez al mes',
                    checked: false,
                    id: 3
    }, {
                    name: 'Mensual',
                    checked: false,
                    id: 3
    }, {
                    name: 'Semanal ',
                    checked: false,
                    id: 3
    }, {
                    name: 'A diario o casi a diario',
                    checked: false,
                    id: 3
    }
  ]
}],
        speciality: [
            {
                name: 'Accupuncturist',
                code: '1'
        },
            {
                name: 'alergólogo',
                code: '2'
        },
            {
                name: 'audiólogo',
                code: '3'
        },
            {
                name: 'Cardiólogo',
                code: '4'
        },
            {
                name: 'Cirujano cardiotoracico',
                code: '5'
        },
            {
                name: 'Quiropráctico',
                code: '6'
        },
            {
                name: 'Cirujano colorrectal',
                code: '7'
        },
            {
                name: 'Dentista',
                code: '8'
        },
            {
                name: 'Dititian / Nutricionista',
                code: '9'
        },
            {
                name: 'Oculista',
                code: '10'
        },
            {
                name: 'gastroenterólogo',
                code: '11'
        },
            {
                name: 'Geriatra',
                code: '12'
        },
            {
                name: 'especialista en audición',
                code: '13'
        },
            {
                name: 'Hematólogo',
                code: '14'
        },
            {
                name: 'Especialista en enfermedades infecciosas',
                code: '15'
        },
            {
                name: 'Partera',
                code: '16'
        },
            {
                name: 'El doctor naturópata',
                code: '17'
        },
            {
                name: 'nefrólogo',
                code: '18'
        },
            {
                name: 'Neurólogo',
                code: '19'
        },
            {
                name: 'Neurocirujano',
                code: '20'
        },
            {
                name: 'OB- GYN ( obstetra - ginecólogo )',
                code: '21'
        },
            {
                name: 'Oncólogo',
                code: '22'
        },
            {
                name: 'Oftalmología',
                code: '23'
        },
            {
                name: 'Optometrista',
                code: '24'
        },
            {
                name: 'Cirujano Oral',
                code: '25'
        },
            {
                name: 'El cirujano ortopédico ( ortopedista )',
                code: '26'
        },
            {
                name: 'Especialista en Manejo del Dolor',
                code: '27'
        },
            {
                name: 'dentista pediátrico',
                code: '28'
        },
            {
                name: 'Pediatra',
                code: '29'
        },
            {
                name: 'Fisiatra ( Medicina Física )',
                code: '30'
        },
            {
                name: 'Fisioterapeuta',
                code: '31'
        },
            {
                name: 'Cirujano plástico',
                code: '32'
        },
            {
                name: 'podólogo',
                code: '33'
        },
            {
                name: 'Médico de atención primaria',
                code: '34'
        },
            {
                name: 'Psiquiatra',
                code: '35'
        },
            {
                name: 'Psicólogo',
                code: '36'
        },
            {
                name: 'neumólogo',
                code: '37'
        },
            {
                name: 'Radiólogo',
                code: '38'
        },
            {
                name: 'reumatólogo',
                code: '39'
        },
            {
                name: 'Especialista en Medicina del Sueño',
                code: '40'
        },
            {
                name: 'Especialista en Medicina del Deporte',
                code: '41'
        },
            {
                name: 'Cirujano',
                code: '42'
        },
            {
                name: 'Terapeuta / Consejero',
                code: '43'
        },
            {
                name: 'Médico de Atención Urgente',
                code: '44'
        },
            {
                name: 'El doctor urológica',
                code: '45'
        },
            {
                name: 'Urólogo',
                code: '46'
        },
            {
                name: 'Cirujano vascular',
                code: '47'
        },
            {
                name: 'Medicina Familiar',
                code: '48'
        },
            {
                name: 'Medicina Interna',
                code: '49'
        }
    ]
    }
};
