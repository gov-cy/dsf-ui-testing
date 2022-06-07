import {DSFTesting} from './dsf-testing.mjs';

(async () => {
    let DSFTest = new DSFTesting();
    DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors'], slowMo: 0 };
    await DSFTest.startTest('Child birth Grand','reports/childbirthgrand/');

    //-------------------- START TESTS -------------------------

    console.log("********** root page ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/', { waitUntil: 'networkidle0', });

    //await before run
    await DSFTesting.timeout(10000);
    
    //take screenshoot
    
    //take screenshoot
    await DSFTest.doScreenshot( 'root.png' ,1200);
    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 2000, deviceScaleFactor: 1, });

    //do pa11y
    await DSFTest.doPa11y('root.pa11y.html');
    // process.exit(0);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());
    
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
    //do lighthouse FLOW navidation
    await DSFTest.doLighthouseNavStart("toStart");
    //type
    await DSFTest.page.focus("#username");
    await DSFTest.page.type("#username",process.env.CHILD_BIRTH_GRANT_USERNAME, { delay: 100 });

    //type
    await DSFTest.page.focus("#password");
    await DSFTest.page.type("#password",process.env.CHILD_BIRTH_GRANT_PASS, { delay: 100 });

    //click
    await DSFTest.page.click("button.btn-primary");
    
    //do lighthouse FLOW navidation
    await DSFTest.doLighthouseNavEnd();

    //await before run
    await DSFTesting.timeout(10000);
    // await DSFTest.page.waitForNavigation(), // The promise resolves after navigation has finished
    // await DSFTest.page.waitForSelector("button.govcy-btn-primary");
    console.log("********** start  ***");
    
    //take screenshoot
    await DSFTest.doScreenshot( 'start.png' ,1200);
   
    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    //do pa11y
    //await DSFTest.doPa11y('start.pa11y.html');

    //FLOW report
    await DSFTest.reportLighthouseFlow('report_small.html');
    
    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    
    //click
    await DSFTest.page.click("button.govcy-btn-primary");

    //await before run
    await DSFTesting.timeout(5000);
    
    console.log("********** step 01 ***");
    
    //take screenshoot
    await DSFTest.doScreenshot( 'step01.png' ,1200);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    //do pa11y
    //await DSFTest.doPa11y('step01.pa11y.html');

    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    
    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[1].click();
    });

    //click
    await DSFTest.page.click("button.govcy-btn-primary");

    //await before run
    await DSFTesting.timeout(5000);

    console.log("********** step 02 ***");

    //take screenshoot
    await DSFTest.doScreenshot( 'step02.png' ,1200);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    //do pa11y
    //await DSFTest.doPa11y('step02.pa11y.html');

    //go back
    await DSFTest.page.goBack();

    //await before run
    await DSFTesting.timeout(5000);

    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    
    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[0].click();
    });

    //click
    await DSFTest.page.click("button.govcy-btn-primary");

    //await before run
    await DSFTesting.timeout(5000);

    console.log("********** step 03 ***");
    
    //take screenshoot
    await DSFTest.doScreenshot( 'step03.png' ,1200);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    //do pa11y
    //await DSFTest.doPa11y('step03.pa11y.html');

    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    
    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[0].click();
    });

    //type
    await DSFTest.page.focus("#tel");
    await DSFTest.page.type("#tel","99123456", { delay: 100 });

    //click
    await DSFTest.page.click("button.govcy-btn-primary");
    
    //await before run
    await DSFTesting.timeout(5000);

    console.log("********** step 04 ***");

    //take screenshoot
    await DSFTest.doScreenshot( 'step03.png' ,1200);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    //do pa11y
    //await DSFTest.doPa11y('step03.pa11y.html');

    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    
    // //click
    // await DSFTest.page.click("button.govcy-btn-primary");

    // //await before run
    // await DSFTesting.timeout(5000);

    // console.log("********** responseSuccess ***");
    
    
    // //take screenshoot
    // await DSFTest.doScreenshot( 'responseSuccess.png' ,1200);

    // //set view port (resolution)
    // await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });

    // //do lighthouse FLOW
    // await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** PrivacyStatement ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/PrivacyStatement', { waitUntil: 'networkidle0', });
    
    //take screenshoot
    await DSFTest.doScreenshot( 'PrivacyStatement.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('PrivacyStatement.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** CookiePolicy ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/CookiePolicy', { waitUntil: 'networkidle0', });

    
    //take screenshoot
    await DSFTest.doScreenshot( 'CookiePolicy.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('CookiePolicy.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** AccessibilityStatement ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/AccessibilityStatement', { waitUntil: 'networkidle0', });

    //take screenshoot
    await DSFTest.doScreenshot( 'AccessibilityStatement.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('AccessibilityStatement.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** StillBorn ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/StillBorn', { waitUntil: 'networkidle0', });

    
    //take screenshoot
    await DSFTest.doScreenshot( 'StillBorn.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('StillBorn.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** ServerError ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/ServerError', { waitUntil: 'networkidle0', });
    
    //take screenshoot
    await DSFTest.doScreenshot( 'ServerError.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('ServerError.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** NoValidProfile ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/NoValidProfile', { waitUntil: 'networkidle0', });

    
    //take screenshoot
    await DSFTest.doScreenshot( 'NoValidProfile.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('NonValidProfile.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** NoContribution ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/NoContribution', { waitUntil: 'networkidle0', });

    
    //take screenshoot
    await DSFTest.doScreenshot( 'NoContribution.png' ,1200);
    
    //do pa11y
    //await DSFTest.doPa11y('NoContribution.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** NoChildUnder12Found ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/NoChildUnder12Found', { waitUntil: 'networkidle0', });

    
    //take screenshoot
    await DSFTest.doScreenshot( 'NoChildUnder12Found.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('NoChildUnder12Found.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** NoChild ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/NoChild', { waitUntil: 'networkidle0', });
    
    //take screenshoot
    await DSFTest.doScreenshot( 'NoChild.png' ,1200);

    //do pa11y
    //await DSFTest.doPa11y('NoChild.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    console.log("********** NoEnroll ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/NoEnroll', { waitUntil: 'networkidle0', });

    
    //take screenshoot
    await DSFTest.doScreenshot( 'NoEnroll.png' ,1200);

    
    //do pa11y
    //await DSFTest.doPa11y('NoEnroll.pa11y.html');

    //await before run
    await DSFTesting.timeout(5000);

    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    //-------------------- END TESTS -------------------------

    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html')
    //close browser
    await DSFTest.endTest();
})();

