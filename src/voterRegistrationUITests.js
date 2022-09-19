import {DSFTesting} from './dsf-testing.mjs';

(async () => {
    let DSFTest = new DSFTesting();
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors',], slowMo: 0, };
    await DSFTest.startTest('Voter registration','reports/voter-registration/');

    //-------------------- START TESTS -------------------------
    let pageName = 'root';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //click
    await DSFTest.page.click('button.govcy-btn-primary');

    //-------------------------------------
    //await before run
    await DSFTesting.timeout(10000);
    console.log('********** CY Login ***');
    //type
    await DSFTest.page.focus('#username');
    await DSFTest.page.type('#username',process.env.CHILD_BIRTH_GRANT_USERNAME, { delay: 100 });

    //type
    await DSFTest.page.focus('#password');
    await DSFTest.page.type('#password',process.env.CHILD_BIRTH_GRANT_PASS, { delay: 100 });

    //click
    await DSFTest.page.click('button.btn-primary');

    //-------------------------------------
    pageName='address-selection';
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='address-selection-error';
    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el',true);
    //-------------------------------------
    pageName='abroad-address-selection';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/abroad-address-selection', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[1].click();
    });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='set-address-1';    
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#postalCode");
    await DSFTest.page.type("#postalCode","2040", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-secondary');

    //-------------------------------------
    pageName='set-address-2'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    await DSFTest.page.select('#SelectedAddress', '12-101204')
    //-------------------------------------
    pageName='set-address-3'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#StreetNo");
    await DSFTest.page.type("#StreetNo","10a", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='displacement-selection'; 
    //await before run
    await DSFTesting.timeout(5000);
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/displacement-selection', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

   //click on radio button
   await DSFTest.page.evaluate(() => {
       document.querySelectorAll('input.govcy-radio-input')[0].click();
   });

   //click
   await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='set-displacement-1'; 

    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    await DSFTest.page.select('#DistrictCodeSelection', '1')
    //-------------------------------------
    pageName='set-displacement-2'; 

    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    await DSFTest.page.select('#TownCodeSelection', '1000')
    //-------------------------------------
    pageName='set-displacement-3'; 

    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    await DSFTest.page.select('#ParishCodeSelection', '100026')
    
    //click
    await DSFTest.page.click('button.govcy-btn-primary');

    //-------------------------------------
    pageName='religious-selection'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[0].click();
    });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    
    //-------------------------------------
    pageName='set-religious'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[1].click();
    });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    
    //-------------------------------------
    pageName='email-selection'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input.govcy-radio-input')[1].click();
    });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='set-email'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#email");
    await DSFTest.page.type("#email","test@test.com", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');

    //-------------------------------------
    pageName='set-mobile'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //type
    await DSFTest.page.focus("#mobile");
    await DSFTest.page.type("#mobile","99123456", { delay: 100 });

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    
    //-------------------------------------
    pageName='review-page'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');

    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------------------------------------
    pageName='ApplicationResponse'; 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='no-valid-profile';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/no-valid-profile', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='pin-not-found';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/pin-not-found', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='no-active-citizen';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/no-active-citizen', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='age-eligibility-failure';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/age-eligibility-failure', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='age-group-not-allowed';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/age-group-not-allowed', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='not-cy-nationality';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/not-cy-nationality', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='community-not-allowed';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/community-not-allowed', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='pending-application-exists';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/pending-application-exists', { waitUntil: 'networkidle0', });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //-------------------------------------
    pageName='already-register';
    //go to page
    await DSFTest.page.goto('https://voter-registration.staging.service.gov.cy/already-register', { waitUntil: 'networkidle0', });
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
