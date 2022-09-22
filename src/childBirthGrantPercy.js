import {DSFTesting} from '../modules/dsf-testing.mjs';
import Percy from '@percy/core'
import percySnapshot from '@percy/puppeteer';

(async () => {
    let DSFTest = new DSFTesting();
    await DSFTest.startTest('Child birth Grand','reports/childbirthgrand/');

    /* Must declare the percy token 
    # On Windows
    $ set PERCY_TOKEN=<your token here> 

    # On Unix 
    $ export PERCY_TOKEN=<your token here>

    or you can define it when creating the percy instance in your code
    const percy = await Percy.start({"token": "<your token here>",}) //default process.env.PERCY_TOKEN
    */
        
    //create a new instance
    const percy = await Percy.start();

    //-------------------- START TESTS -------------------------
    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 2000, deviceScaleFactor: 1, });

    console.log("********** root page ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/', { waitUntil: 'networkidle0', });

    //await before run
    await DSFTesting.timeout(10000);
    
    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 2000, deviceScaleFactor: 1, });

    //do percy 
    await percySnapshot(DSFTest.page, 'Root', { widths: [374, 767, 1280] });
    
    //set view port (resolution)
    //sometimes needed to reach the element and click it (bigger height)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    //click
    await DSFTest.page.click("button.govcy-btn-primary");

    //await before run
    await DSFTesting.timeout(5000);

    console.log("********** CY Login ***");
    //type
    await DSFTest.page.focus("#username");
    await DSFTest.page.type("#username",process.env.CHILD_BIRTH_GRANT_USERNAME, { delay: 100 });

    //type
    await DSFTest.page.focus("#password");
    await DSFTest.page.type("#password",process.env.CHILD_BIRTH_GRANT_PASS, { delay: 100 });


    //click
    await DSFTest.page.click("button.btn-primary");

    //await before run
    await DSFTesting.timeout(10000);

    console.log("********** start  ***");
    
    
    //do percy 
    await percySnapshot(DSFTest.page, 'start', { widths: [374, 767, 1280] });
    //stop percy
    await percy.stop(true);

    //-------------------- END TESTS -------------------------
    //close browser
    await DSFTest.endTest();
})();

