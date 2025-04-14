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
    DSFTest.pa11yHideElements = "html > body > div:nth-child(2) > div > div > header > form, #culture-picker";
    
    let pageName = '';
    //ad hoc options
    var defaultReportPath = "reports/citizendocsrefugeenew/";
    var doLogin = true;
    var defaultStartURL = "https://citizen-documents.staging.service.gov.cy/refugee-id-certificate?culture=el-GR"
    //ask where to save the report
    var reportPath = question(`Where to save the report.Default value "${defaultReportPath}":`);
    if(reportPath=="") {reportPath=defaultReportPath};
    //ask for start url
    var startURLAnswer = question(`What is your start url? Default value is "${defaultStartURL}":`);
    if(startURLAnswer=="") {startURLAnswer=defaultStartURL};
    
    await DSFTest.startTest('Refugee',reportPath);
    if(doLogin) {
        //start test
        await DSFTest.page.goto(startURLAnswer, { waitUntil: 'networkidle0', });
        pageName = 'Start';
        await DSFTest.ConsoleEcho(pageName);
        await DSFTest.DSFStandardPageTest(pageName, 'el'); 
        await DSFTest.ConsoleEcho("Login");
        //get credentials from command line 
        var sUser = question('Username:');
        var sPassword = question('Password:');
        //go to start page and click start to login
        await DSFTest.page.goto(startURLAnswer, { waitUntil: 'networkidle0', });
        //set the viewport     
        await DSFTest.page.setViewport({ width: 1920, height: 969 });
        await DSFTest.page.click('#btnApplicationStart')
        //await before run
        await DSFTesting.timeout(5000);
        await DSFTest.page.click('#username')
        await DSFTest.page.type('#username', sUser, { delay: 100 })
        await DSFTest.page.focus('#password');
        await DSFTest.page.type('#password', sPassword, { delay: 100 });
        await DSFTest.page.click('button.btn-primary');
        await DSFTesting.timeout(8000);
    }

    pageName = 'new-claim-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/new-claim-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.page.click('#View_ApplyForRefugee_choise1')
    await DSFTest.page.click('button')
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    pageName = 'occupied-territories-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/occupied-territories-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('#View_LiveInOccupiedTerritories_choise1')
    await DSFTesting.timeout(3000);
    await DSFTest.page.click('#View_OccupiedTerretoryDistrict')
    await DSFTest.page.select('#View_OccupiedTerretoryDistrict', '1')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_OccupiedTerretoryArea')
    await DSFTest.page.select('#View_OccupiedTerretoryArea', '1454')
    await DSFTesting.timeout(4000);
    pageName = 'occupied-territories-selection-selected'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/occupied-territories-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'occupied-territories-stay-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/occupied-territories-stay-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('#View_LiveInOccupiedTerritoriesWith_choise1')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_LiveinOccupiedTerritoriesWithDescription')
    await DSFTest.page.type('#View_LiveinOccupiedTerritoriesWithDescription', 'Lorem ipsum dolor sit amet', { delay: 100 })
    pageName = 'occupied-territories-stay-selection-selected'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/occupied-territories-stay-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_StudySelect_choise1')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_StudyDescription')
    await DSFTest.page.type('#View_StudyDescription', 'Lorem ipsum dolor sit amet', { delay: 100 })
    pageName = 'study-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/study-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_VoteInOccupiedTerritories_choise1')
    await DSFTesting.timeout(3000);
    await DSFTest.page.click('#View_VoteInOccupiedTerretoryDistrict')
    await DSFTest.page.select('#View_VoteInOccupiedTerretoryDistrict', '1')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_VoteInOccupiedTerretoryArea')
    await DSFTest.page.select('#View_VoteInOccupiedTerretoryArea', '1013')
    await DSFTesting.timeout(4000);
    pageName = 'occupied-territories-vote-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/occupied-territories-vote-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_WorkInOccupiedTerritories_choise1')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_WorkDescription')
    await DSFTest.page.type('#View_WorkDescription', 'Lorem ipsum dolor sit amet', { delay: 100 })
    pageName = 'work-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/work-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_ParentsVoteInOccupiedTerritories_choise1')
    await DSFTesting.timeout(3000);
    await DSFTest.page.click('#View_ParentsVoteInOccupiedTerretoryDistrict')
    await DSFTest.page.select('#View_ParentsVoteInOccupiedTerretoryDistrict', '1')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_ParentsVoteInOccupiedTerretoryArea')
    await DSFTest.page.select('#View_ParentsVoteInOccupiedTerretoryArea', '1443')
    await DSFTesting.timeout(4000);
    pageName = 'occupied-territories-parents-vote-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/occupied-territories-parents-vote-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_ParentsWorkInOccupiedTerritories_choise1')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_ParentWorkDescription')
    await DSFTest.page.type('#View_ParentWorkDescription', 'Lorem ipsum dolor sit amet', { delay: 100 })
    pageName = 'occupied-territories-parents-work-selection'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/occupied-territories-parents-work-selection
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    await DSFTesting.timeout(4000);
    await DSFTest.page.click('#View_OtherInfoDescription')
    await DSFTest.page.type('#View_OtherInfoDescription', 'Lorem ipsum dolor sit amet', { delay: 100 })
    pageName = 'other-info'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/other-info
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    await DSFTest.page.click('button')
    pageName = 'review'; //https://citizen-documents.staging.service.gov.cy/refugee-id-certificate/application/review
    await DSFTest.ConsoleEcho(pageName);
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