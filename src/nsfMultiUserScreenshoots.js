import { DSFTesting } from '@gov-cy/govcy-frontend-tester'
import { question } from 'readline-sync'


(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors',], slowMo: 0, };
    DSFTest.DSFCheckLevel = 0;
    DSFTest.performLighthouse = false;
    DSFTest.performHeadSection = false;
    DSFTest.performDSFChecks = false;
    DSFTest.performPa11yChecks = false;
    DSFTest.showOnlyErrors = true;
    DSFTest.screenshotWidths = [360];
    //overwrite pa11yHideElements to ignore know issues of the design systems 
    DSFTest.pa11yHideElements = "html > body > div:nth-child(2) > div > div > header > form, #culture-picker";
    let URLs = [];

    //get where to save the report
    var defaultReportPath = "reports/NSF/";
    var reportPath = question('Where to save the report.Default value "reports/NSF/":');
    if(reportPath=="") {reportPath=defaultReportPath};
    await DSFTest.ConsoleEcho(reportPath); 

    //start test
    await DSFTest.startTest('National solidarity fund',reportPath);
    let pageName = '';
   
    URLs = [
    //     "index","index-who", "index-need","index-start","index-help",
    //     "pin-not-found","age-eligibility-failure","personal-not-verified","personal-aka/true","personal-representative","personal-representative-person"
    // ,"personal-representative-company","personal-evidence", "personal-review","personal-no-authentication","personal-not-entered","contact-address"
    // ,"contact-email","contact-mobile","contact-review","compensations-exist","compensations-add","compensations-delete","compensations-review"
    // ,"consent","consent-no","deposits-boc-exist","deposits-boc","deposits-cpb-exist","deposits-cpb","deposits-review"
    // ,"deposits-review",
    // "securities-exist",
    // "securities-add",
    // "security-delete",
    // "securities-review",
    // "review-page",
    // "application-response",
    // "identifications-exist",
    // "identifications-add",
    // "identifications-review",
    // "identifications-delete",
    "legal-not-verified",
    "legal-verified",
    "legal-no-authentication",
    "legal-representative",
    "legal-administrator",
    "legal-admin-company",
    "legal-admin-person",
    "legal-evidence",
    "legal-review",
    "members-exist",
    "members-add",
    "members-delete",
    "members-review",
    "legal-activity",
    "legal-activity-review",
    "legal-financial",
    "legal-financial-year",
    "de-minimis-exist",
    "de-minimis-add",
    "de-minimis-delete",
    "de-minimis-review",
    // "accessibility-statement",
    // "cookie-policy",
    // "no-page-found",
    // "privacy-statement",
    // "server-error",
    // "user-satisfaction",
    // "user-satisfaction-response"

    ]
    var tusers = [
"citizen28", "citizen5", "citizen27", 
    ];
    
    for (var user of tusers) {
         //-------------------- secure urls -------------------------
        await DSFTest.ConsoleEcho("Login");
        //get credentials from command line 
        var sUser = user;
        var sPassword = "testing1!";
        //go to start page and click start to login
        await DSFTest.page.goto('https://national-solidarity-fund.staging.service.gov.cy/?culture=el-GR', { waitUntil: 'networkidle0', });
        await DSFTesting.timeout(5000);
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
        //-------------------- application-page after login -------------------------
        pageName=user + ' - ' + 'application-page';
        await DSFTest.ConsoleEcho(pageName); 
        //run the batch of tests and reports fo this page 
        await DSFTest.DSFStandardPageTest(pageName,'el');
        //--------------------  login in urs -------------------------
        //---------------- For all urls ------------------------------
        for (var url of URLs) {
            pageName=user + ' - ' +url;
            await DSFTest.ConsoleEcho(pageName); 
            //go to page
            await DSFTest.page.goto('https://national-solidarity-fund.staging.service.gov.cy/'+url, { waitUntil: 'networkidle0', });
            //only do the ones allowed by the scenario
            if (!DSFTest.page.url().includes("no-page-found") ){
                //set the viewport     
                await DSFTest.page.setViewport({ width: 1920, height: 969 });
                //run the batch of tests and reports fo this page 
                await DSFTest.DSFStandardPageTest(pageName,'el');
            }
        }
        await DSFTest.page.goto('https://national-solidarity-fund.staging.service.gov.cy/Account/LogOut', { waitUntil: 'networkidle0', });
    }

    await DSFTest.page.close()
    //-------------------- END TESTS -------------------------
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html');
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();