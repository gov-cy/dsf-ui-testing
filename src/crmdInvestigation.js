import { DSFTesting } from '@gov-cy/govcy-frontend-tester'
import { question } from 'readline-sync'


(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors',], slowMo: 0, };
    DSFTest.DSFCheckLevel = 0;
    DSFTest.performLighthouse = true;
    DSFTest.showOnlyErrors = true;
    DSFTest.serviceDesignSystemVersion = `3.0.0`;
    //overwrite pa11yHideElements to ignore know issues of the design systems 
    // DSFTest.pa11yHideElements = "html > body > div:nth-child(2) > div > div > header > form, #culture-picker";
    
    let pageName = '';
    //ad hoc options
    var defaultReportPath = "reports/crmdInvestigation/";
    var doLogin = true;
    var defaultStartURL = "https://civil-registry-search.staging.service.gov.cy/?culture=el-GR"
    //ask where to save the report
    var reportPath = question(`Where to save the report.Default value "${defaultReportPath}":`);
    if(reportPath=="") {reportPath=defaultReportPath};
    //ask for start url
    var startURLAnswer = question(`What is your start url? Default value is "${defaultStartURL}":`);
    if(startURLAnswer=="") {startURLAnswer=defaultStartURL};
    
    await DSFTest.startTest('Investigation',reportPath);
    if(doLogin) {
        //get credentials from command line 
        var sUser = question('Username:');
        var sPassword = question('Password:');
        //start test
        await DSFTest.page.goto(startURLAnswer, { waitUntil: 'networkidle0', });
        pageName = 'Start';
        await DSFTest.ConsoleEcho(pageName);
        await DSFTest.DSFStandardPageTest(pageName, 'el'); 
        // await DSFTest.ConsoleEcho("Login");
        //set the viewport     
        await DSFTest.page.setViewport({ width: 1920, height: 969 });
        await DSFTest.page.click('#btnApplicationStart')
        //await before run
        await DSFTesting.timeout(5000);
        await DSFTest.page.click('#username')
        await DSFTest.page.type('#username', sUser, { delay: 100 })
        await DSFTest.page.focus('#password');
        await DSFTest.page.type('#password', sPassword, { delay: 100 });
        pageName = 'CY-Login';
        await DSFTest.ConsoleEcho(pageName);
        DSFTest.performDSFChecks = false;
        await DSFTest.DSFStandardPageTest(pageName, 'el'); 
        await DSFTest.page.click('button.btn-primary');
        await DSFTesting.timeout(8000);
    }
    
    DSFTest.performDSFChecks = true;
    
    pageName = 'registration'; //https://civil-registry-search.staging.service.gov.cy/not-verified-profile/registration
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.page.click('#View_UnverifiedUser_FirstName')
    await DSFTest.page.type('#View_UnverifiedUser_FirstName', 'Costis', { delay: 100 })
    await DSFTest.page.click('#View_UnverifiedUser_LastName')
    await DSFTest.page.type('#View_UnverifiedUser_LastName', 'Giannis', { delay: 100 })
    await DSFTest.page.click('#View_UnverifiedUser_IdTypeSelection_choise1')
    await DSFTest.page.click('#View_UnverifiedUser_Id')
    await DSFTest.page.type('#View_UnverifiedUser_Id', '1234567', { delay: 100 })
    await DSFTest.page.click('#View_UnverifiedUser_IssuedCountryForId')
    await DSFTest.page.select('#View_UnverifiedUser_IssuedCountryForId', '465')
    await DSFTest.page.click('#View_UnverifiedUser_Dob_Day')
    await DSFTest.page.type('#View_UnverifiedUser_Dob_Day', '1', { delay: 100 })
    await DSFTest.page.click('#View_UnverifiedUser_Dob_Month')
    await DSFTest.page.select('#View_UnverifiedUser_Dob_Month', '1')
    await DSFTest.page.click('#View_UnverifiedUser_Dob_Day')
    await DSFTest.page.type('#View_UnverifiedUser_Dob_Year', '1970', { delay: 100 })
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'set-relation'; //https://civil-registry-search.staging.service.gov.cy/investication/set-relation
    await DSFTest.ConsoleEcho(pageName);
    await DSFTesting.timeout(3000);
    await DSFTest.page.click('#View_SearchDetails_SearchRelation_choise4')
    await DSFTest.page.click('#View_SearchDetails_OtherRelationDescription')
    await DSFTest.page.type('#View_SearchDetails_OtherRelationDescription', 'Relation', { delay: 100 })
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'required-set-data'; //https://civil-registry-search.staging.service.gov.cy/investication/required-set-data
    await DSFTest.ConsoleEcho(pageName);
    await DSFTesting.timeout(3000);
    await DSFTest.page.click('#View_SearchDetails_SearchFirstName')
    await DSFTest.page.type('#View_SearchDetails_SearchFirstName', 'Matikkou', { delay: 100 })
    await DSFTest.page.click('#View_SearchDetails_SearchFirstName')
    await DSFTest.page.type('#View_SearchDetails_SearchLastName', 'Lefkara', { delay: 100 })
    await DSFTest.page.click('#View_SearchDetails_SearchBirthDate')
    await DSFTest.page.type('#View_SearchDetails_SearchBirthDate', 'Δεκέμβριος 2007', { delay: 100 })
    await DSFTest.page.click('#View_SearchDetails_SearchBirthPlace')
    await DSFTest.page.type('#View_SearchDetails_SearchBirthPlace', 'Παφος', { delay: 100 })
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'person-id-pass-optional'; //https://civil-registry-search.staging.service.gov.cy/investication/person-id-pass-optional
    await DSFTest.ConsoleEcho(pageName);
    await DSFTesting.timeout(3000);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'person-search-optional'; //https://civil-registry-search.staging.service.gov.cy/investication/person-search-optional
    await DSFTest.ConsoleEcho(pageName);
    await DSFTesting.timeout(3000);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'person-search-other-info-optional'; //https://civil-registry-search.staging.service.gov.cy/investication/person-search-other-info-optional
    await DSFTest.ConsoleEcho(pageName);
    await DSFTesting.timeout(3000);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'review'; //https://civil-registry-search.staging.service.gov.cy/investication/review
    await DSFTest.ConsoleEcho(pageName);
    await DSFTesting.timeout(3000);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    
    
    

    await DSFTest.page.close()
    //-------------------- END TESTS -------------------------
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html');
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();