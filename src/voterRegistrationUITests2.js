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
    await DSFTest.startTest('Voter registration','reports/voter-registration/');

    //-------------------- START TESTS -------------------------
    let pageName = 'root';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/', { waitUntil: 'networkidle0', });
           
    await DSFTest.page.setViewport({ width: 1920, height: 969 })

            /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            pageName = 'root';
            await DSFTest.ConsoleEcho(pageName);       
            await DSFTest.DSFStandardPageTest(pageName,'el');
            /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    
    await DSFTest.page.waitForSelector('#btnApplicationStart')
    await DSFTest.page.click('#btnApplicationStart')
   
    await DSFTest.page.waitForNavigation()
    
    await DSFTest.page.waitForSelector('#username')
    await DSFTest.page.click('#username')

    //type
    await DSFTest.page.focus('#username');
    await DSFTest.page.type('#username', process.env.TESTING_DATA_USERNAME, { delay: 100 });

    
    await DSFTest.page.waitForSelector('#password')
    await DSFTest.page.click('#password')

    //type
    await DSFTest.page.focus('#password');
    await DSFTest.page.type('#password', process.env.TESTING_DATA_PASS, { delay: 100 });
           
    await DSFTest.page.waitForSelector('.inner-body > .row > .col > .pb-1 > .btn')
    await DSFTest.page.click('.inner-body > .row > .col > .pb-1 > .btn')
    
    await DSFTest.page.waitForNavigation()

                /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
                pageName = 'address-selection';
                await DSFTest.ConsoleEcho(pageName);
                await DSFTest.DSFStandardPageTest(pageName,'el');
                /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    
    await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(1) > .govcy-radio-checked')
    await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(1) > .govcy-radio-checked')
    
    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
  
    await DSFTest.page.waitForNavigation()

                /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
                pageName = 'displacement-selection';
                await DSFTest.ConsoleEcho(pageName);
                await DSFTest.DSFStandardPageTest(pageName,'el');
                /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    
    await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
    await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
    
    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    
    await DSFTest.page.waitForNavigation()
    
        /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
        pageName = 'religious-selection';
        await DSFTest.ConsoleEcho(pageName);
        await DSFTest.DSFStandardPageTest(pageName,'el');
        /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    
    await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
    await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
    
    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')

    
    await DSFTest.page.waitForNavigation()

            /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
            pageName = 'email-selection';
            await DSFTest.ConsoleEcho(pageName);
            await DSFTest.DSFStandardPageTest(pageName,'el');
            /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    
    await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(1) > .govcy-radio-checked')
    await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(1) > .govcy-radio-checked')
    
    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    
    await DSFTest.page.waitForNavigation()

                /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
                pageName = 'set-mobile';
                await DSFTest.ConsoleEcho(pageName);
                await DSFTest.DSFStandardPageTest(pageName,'el');
                /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    
    await DSFTest.page.waitForSelector('#mobile')
    await DSFTest.page.click('#mobile')

    await DSFTest.page.type('#mobile', '99530552', { delay: 100 })
    
    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    
    await DSFTest.page.waitForNavigation()
    
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
