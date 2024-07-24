import { DSFTesting } from '@gov-cy/govcy-frontend-tester'


(async () => {
     let DSFTest = new DSFTesting();
     //DEBUG --- overwrite puppeteeer settings to headles browser false
     DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors',], slowMo: 0, };
     DSFTest.performDSFChecks = false;
     await DSFTest.startTest('Cloudflare','reports/cloudflare/');
     //-------------------- START TESTS -------------------------
     let pageName = 'root';
     //go to page
     await DSFTest.page.goto('https://citizen-documents.staging.service.gov.cy/certificate-verification', { waitUntil: 'networkidle0', });
     //set the viewport     
    //  await DSFTest.page.setViewport({ width: 1920, height: 969 });
    await DSFTest.page.setViewport({ width: 1920, height: 1969 });
    //type
    await DSFTest.page.focus('#ValEdit_Uid');
    await DSFTest.page.type('#ValEdit_Uid',"3280-5304-1268-2700", { delay: 100 });
    
    //type
    await DSFTest.page.focus('#ValEdit_DocId');
    await DSFTest.page.type('#ValEdit_DocId',"2457794", { delay: 100 });
    
    //run the batch of tests and reports fo this page
     await DSFTesting.timeout(5000);
     await DSFTest.DSFStandardPageTest(pageName,'el');

    //click
    await DSFTest.page.click('button.govcy-btn-primary');

     //-------Email selection ------------------------------
     pageName='after click';
    await DSFTest.ConsoleEcho(pageName); 
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