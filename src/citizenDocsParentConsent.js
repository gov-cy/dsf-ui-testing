import { DSFTesting } from '@gov-cy/govcy-frontend-tester'
import { question } from 'readline-sync'


(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors',], slowMo: 0, };
    DSFTest.DSFCheckLevel = 0;
    DSFTest.performLighthouse = true;
    DSFTest.showOnlyErrors = true;
    DSFTest.serviceDesignSystemVersion = `3.0.0`;
    //overwrite pa11yHideElements to ignore know issues of the design systems 
    DSFTest.pa11yHideElements = "html > body > div:nth-child(2) > div > div > header > form, #culture-picker";
    
    let pageName = '';
    //ad hoc options
    var defaultReportPath = "reports/citizendocsconsent/";
    var doLogin = true;
    var defaultStartURL = "https://citizen-documents.staging.service.gov.cy/parental-consent-info?culture=el-GR"
    //ask where to save the report
    var reportPath = question('Where to save the report.Default value "reports/citizendocsconsent/":');
    if(reportPath=="") {reportPath=defaultReportPath};
    //ask for start url
    var startURLAnswer = question('What is your start url? Default value is "https://citizen-documents.staging.service.gov.cy/parental-consent-info?culture=el-GR":');
    if(startURLAnswer=="") {startURLAnswer=defaultStartURL};
    
    await DSFTest.startTest('Citizen Docs Consent',reportPath);
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
    
    pageName = 'Update my details page';
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    //click on radio button
    await DSFTest.page.click('.list-inline-item a')
    pageName = 'consent-request'; //https://citizen-documents.staging.service.gov.cy/parental-consent/consent-request
    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName, 'el');
    //click on radio button
    await DSFTest.page.click('#ChildSection_UserApproval_choise1')
    await DSFTest.page.click('#btnVal')
    pageName = 'success'; 
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