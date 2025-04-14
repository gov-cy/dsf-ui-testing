import { DSFTesting } from '@gov-cy/govcy-frontend-tester'


(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors',], slowMo: 0, };
    DSFTest.DSFCheckLevel = 0;
    DSFTest.performDSFChecks = true;
    DSFTest.performLighthouse = false;
//     DSFTest.screenshotWidths = [];
    DSFTest.showOnlyErrors = false;
    DSFTest.performHeadSection = false;
    DSFTest.serviceDesignSystemVersion = `3.0.0`;
    //overwrite pa11yHideElements to ignore know issues of the design systems 
    DSFTest.pa11yHideElements = "html > body > div:nth-child(2) > div > div > header > form, #culture-picker";
    
    
    await DSFTest.startTest('e-kalathi','reports/kalathi/');
    await DSFTest.ConsoleEcho('https://kalathi-public.i-me.world/'); 
    //go to page
    await DSFTest.page.goto('https://kalathi-public.i-me.world/', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest("Home ",'el');
    //go to page
    await DSFTest.ConsoleEcho('https://kalathi-public.i-me.world/product-information/8'); 
    await DSFTest.page.goto('https://kalathi-public.i-me.world/product-information/8', { waitUntil: 'networkidle0', });
            //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest("Product 8",'el');
    //go to page
    await DSFTest.ConsoleEcho('https://kalathi-public.i-me.world/online-help'); 
    await DSFTest.page.goto('https://kalathi-public.i-me.world/online-help', { waitUntil: 'networkidle0', });
            //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest("help",'el');
   
    

    await DSFTest.page.close()
    //-------------------- END TESTS -------------------------
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html');
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();