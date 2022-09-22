import {DSFTesting} from '../modules/dsf-testing.mjs';

(async () => {
    let DSFTest = new DSFTesting();
    DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors'], slowMo: 0 };
    //couldn't find how to work it in incognito
    DSFTest.isIncognito=false;
    await DSFTest.startTest('Child birth Grand','reports/childbirthgrand/');

    //-------------------- START TESTS -------------------------

    console.log("********** root page ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/', { waitUntil: 'networkidle0', });

    //await before run
    await DSFTesting.timeout(10000);
    
    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 2000, deviceScaleFactor: 1, });

    //get score for page
    console.log(await DSFTest.doLighthouseA11YScore(DSFTest.page.url()));
    //set view port (resolution)
    //sometimes needed to reach the element and click it (bigger height)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    //click
    await DSFTest.page.click("button.govcy-btn-primary");

    //await before run
    //await DSFTesting.timeout(5000);
    await DSFTest.page.waitForNavigation(), // The promise resolves after navigation has finished
    await DSFTest.page.waitForSelector("button.btn-primary");
    console.log("********** CY Login ***");
    
    //get score for page
    console.log(await DSFTest.doLighthouseA11YScore(DSFTest.page.url()));
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
    // await DSFTest.page.waitForNavigation(), // The promise resolves after navigation has finished
    // await DSFTest.page.waitForSelector("button.govcy-btn-primary");
    console.log("********** start  ***");
    
    //get score for page
    console.log(await DSFTest.doLighthouseA11YScore(DSFTest.page.url()));

    //-------------------- END TESTS -------------------------
    //close browser
    await DSFTest.endTest();
})();

