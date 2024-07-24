import { DSFTesting } from '@gov-cy/govcy-frontend-tester'
import { question } from 'readline-sync'


(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors',], slowMo: 0, };
    DSFTest.DSFCheckLevel = 0;
    DSFTest.performLighthouse = false;
    DSFTest.showOnlyErrors = true;
    //overwrite pa11yHideElements to ignore know issues of the design systems 
    DSFTest.pa11yHideElements = "html > body > div:nth-child(2) > div > div > header > form, #culture-picker";
    
    let pageName = '';
    //ad hoc options
    var defaultReportPath = "reports/NSF/test/";
    var doLogin = false;
    //ask where to save the report
    var reportPath = question('Where to save the report.Default value "reports/NSF/test/":');
    if(reportPath=="") {reportPath=defaultReportPath};
    //ask if needs login
    var loginAnswer = question('Do you want to login (Answer "y" for yes. Default value is "No")?:');
    if(loginAnswer.toLowerCase() == "y" || loginAnswer.toLowerCase() == "yes" ) {doLogin=true};
    //ask the path to test
    var pathAnswer = question('What path do you want to test? We want only the path after the service domain (e.g. "index"):');
    await DSFTest.startTest('National solidarity fund',reportPath);
    if(doLogin) {
        //start test
        await DSFTest.page.goto('https://national-solidarity-fund.staging.service.gov.cy/?culture=el-GR', { waitUntil: 'networkidle0', });
        await DSFTest.ConsoleEcho("Login");
        //get credentials from command line 
        var sUser = question('Username:');
        var sPassword = question('Password:');
        //go to start page and click start to login
        await DSFTest.page.goto('https://national-solidarity-fund.staging.service.gov.cy/index-start?culture=el-GR', { waitUntil: 'networkidle0', });
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
    
    pageName=pathAnswer;
    await DSFTest.ConsoleEcho(pageName); 
    //go to page
    await DSFTest.page.goto('https://national-solidarity-fund.staging.service.gov.cy/'+pageName, { waitUntil: 'networkidle0', });
            //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
   
    

    await DSFTest.page.close()
    //-------------------- END TESTS -------------------------
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html');
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();