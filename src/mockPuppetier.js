import {DSFTesting} from '../modules/dsf-testing.mjs';

(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors',], slowMo: 0, };
    await DSFTest.startTest('Mock service','reports/mock/');

    //-------------------- START TESTS -------------------------
    let pageName = 'root';
    //go to page
    await DSFTest.page.goto('https://localhost:44319/?culture=el-GR', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //click
    await DSFTest.page.click('button.govcy-btn-primary');

    //-------------------------------------
    //await before run
    await DSFTesting.timeout(5000);
    //await DSFTest.page.waitForNavigation({waitUntil: 'networkidle2'}), // The promise resolves after navigation has finished
    //await DSFTest.page.waitForSelector('button.btn-primary');
    console.log('********** CY Login ***');
    //type
    await DSFTest.page.focus('#Input_Username');
    await DSFTest.page.type('#Input_Username',process.env.CHILD_BIRTH_GRANT_USERNAME, { delay: 100 });

    //type
    await DSFTest.page.focus('#Input_Password');
    await DSFTest.page.type('#Input_Password',process.env.CHILD_BIRTH_GRANT_PASS, { delay: 100 });

    //click
    await DSFTest.page.click('button.btn-primary');

    //-------------------------------------
    pageName='AddressSelection';
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='AddressSelectionError';
    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el',true);
    //-------------------------------------
    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[1].click();
    });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='SetAddress_mainContainer';    
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#PostalCode");
    await DSFTest.page.type("#PostalCode","1002", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-secondary');

    //-------------------------------------
    pageName='SetAddress'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    await DSFTest.page.select('#selectedAddressCode', '10002')
    //-------------------------------------
    pageName='SetAddress_selected'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#StreetNo");
    await DSFTest.page.type("#StreetNo","10a", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='MobileSelection'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[1].click();
    });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='SetMobile'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#mobile");
    await DSFTest.page.type("#mobile","66123456", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='EmailSelection'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[1].click();
    });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='SetEmail'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#email");
    await DSFTest.page.type("#email","test@example.com", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='ReviewPage'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='ApplicationResponse'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
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
