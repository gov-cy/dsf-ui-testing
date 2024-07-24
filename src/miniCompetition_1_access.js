import { DSFTesting } from '@gov-cy/govcy-frontend-tester'

(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors',], slowMo: 0, };
    //Overwrite which checks to perform
    DSFTest.pa11ySettings = {standard: 'WCAG2A',ignoreUrl: true,wait: 10000};
    DSFTest.screenshotWidths = [1200];
    DSFTest.performHeadSection = false;
    DSFTest.performDSFChecks = false;
    DSFTest.performLighthouse = false;
    DSFTest.skipLog = true;
    DSFTest.showOnlyErrors = true;

    //get where to save the report
    var defaultReportPath = "reports/mini1/"; 
    //start test
    await DSFTest.startTest('Mini competition accessibility report',defaultReportPath);
    let pageName = '';
    
    //--------------------  login in urs -------------------------
    let URLs = [
        {"name":"EY - www.seasmiles.com","url":"https://www.seasmiles.com/el/membership"},
        {"name":"EY - diadikasies.gov.gr","url":"https://diadikasies.gov.gr/"},
        {"name":"EY - www.nbg.gr","url":"https://www.nbg.gr/"},
        {"name":"EY - switch.myavis.gr","url":"https://switch.myavis.gr/"},
        {"name":"NetU - pescps.dl.mlsi.gov.cy","url":"https://pescps.dl.mlsi.gov.cy/"},
        {"name":"NetU - wbas-3e-applicant.service.gov.cy","url":"https://wbas-3e-applicant.service.gov.cy/"},
        {"name":"DG Techlink - myloan.servbank.com","url":"https://myloan.servbank.com/"},
        {"name":"DG Techlink - servbank.com","url":"https://servbank.com/"},
        {"name":"DG Techlink - www.sabaton.net","url":"https://www.sabaton.net/"},
        {"name":"PWC - www.keelxanalytics.ai","url":"https://www.keelxanalytics.ai/"}
    ]
    for (var url of URLs) {
        pageName=url.name;
        await DSFTest.ConsoleEcho(pageName); 
        //go to page
        await DSFTest.page.goto(url.url, { waitUntil: 'networkidle0', });
        if (url.timeout) {
            await DSFTesting.timeout(url.timeout);
        }
        //only do the ones allowed by the scenario
        if (!DSFTest.page.url().includes("no-page-found") ){
            //set the viewport     
            await DSFTest.page.setViewport({ width: 1920, height: 969 });
            //run the batch of tests and reports fo this page 
            await DSFTest.DSFStandardPageTest(pageName,'el');
        }
    }
    
    await DSFTest.page.goto('https://paymentsreportingtool-staging.pwc.com.cy', { waitUntil: 'networkidle0', });
    //set the viewport     
    await DSFTest.page.setViewport({ width: 1920, height: 969 });
    await DSFTest.page.click('#initEmail')
    await DSFTest.page.type('#initEmail', "demou4all@gmail.com", { delay: 100 })
    await DSFTest.page.click('button.a-btn-primary');
    await DSFTesting.timeout(5000);
    await DSFTest.page.setViewport({ width: 1920, height: 969 });
    await DSFTest.page.click('input.a-text-input')
    await DSFTest.page.type('input.a-text-input', "PwC@2024", { delay: 100 })
    await DSFTest.page.click('button.a-btn-primary');
    await DSFTesting.timeout(5000);
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //await before run

    await DSFTest.page.close()
    //-------------------- END TESTS -------------------------
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html');
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();