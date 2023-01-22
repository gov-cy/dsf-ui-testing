import {DSFTesting} from '../modules/dsf-testing.mjs';
/**
 * 
 * Sample script using Headless Recorder https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda
 * 
 */

(async () => {
   
    let DSFTest = new DSFTesting();
        
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: true };
    await DSFTest.startTest('Where to vote','reports/where-to-vote/');

    //-------------------- START TESTS -------------------------
    let pageName = 'root';
    //go to page
    await DSFTest.page.goto('http://wtv.host.com.cy/', { waitUntil: 'networkidle0', });
           
    await DSFTest.page.setViewport({ width: 1920, height: 969 })

    /* --------------------------------------------------------------------------- */
    pageName = 'root';
    await DSFTest.ConsoleEcho(pageName);       
    await DSFTest.DSFStandardPageTest(pageName,'el');
    /* --------------------------------------------------------------------------- */

    
    
    await DSFTest.page.close()
   
    //-------------------- END TESTS -------------------------
//process.exit(0);
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html')
    console.log(DSFTest.reportJSON);
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();
