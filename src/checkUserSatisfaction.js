import { DSFTesting } from '@gov-cy/govcy-frontend-tester'


(async () => {
    let DSFTest = new DSFTesting();
    DSFTest.DSFCheckLevel = 0;
    await DSFTest.startTest('User Satisfaction','reports/US/');
    //-------------------- START TESTS -------------------------
    let pageName = 'child-birth-grant root';
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/?culture=el-GR', { waitUntil: 'networkidle0', });
    //set the viewport     
    await DSFTest.page.setViewport({ width: 1920, height: 969 });
    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //--------Mock Login -----------------------------
    //await before run
    await DSFTesting.timeout(5000);
    console.log('********** Mock Login ***');
    //type
    await DSFTest.page.focus('#username');
    await DSFTest.page.type('#username',process.env.MOCK_USERNAME, { delay: 100 });

    //type
    await DSFTest.page.focus('#password');
    await DSFTest.page.type('#password',process.env.MOCK_PASS, { delay: 100 });

    //click
    await DSFTest.page.click('button.btn.btn-primary');
    
     //-------First page ------------------------------
     //await before run
    await DSFTesting.timeout(5000);
    
    //-------User satisfaction ------------------------------
    pageName='CBG-user-satisfaction';
    //click
    await DSFTest.page.click('[href*="/user-satisfaction"]');
    
    await DSFTest.ConsoleEcho(pageName); 
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    
    //-------------------------------------
    pageName='CGB-user-satisfaction-success';
    await DSFTest.ConsoleEcho(pageName); 
    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input[name="radio"]')[1].click();
    });
    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el',false);
    //-------------------- START TESTS -------------------------
    pageName = 'update-my-details root';
    //go to page
    await DSFTest.page.goto('https://update-my-details.staging.service.gov.cy/?culture=el-GR', { waitUntil: 'networkidle0', });
    //set the viewport     
    await DSFTest.page.setViewport({ width: 1920, height: 969 });
    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //-------First page ------------------------------
     //await before run
     await DSFTesting.timeout(5000);
    
     //-------User satisfaction ------------------------------
     pageName='UmD-user-satisfaction';
     //click
     await DSFTest.page.click('[href*="/user-satisfaction"]');
     
     await DSFTest.ConsoleEcho(pageName); 
     //run the batch of tests and reports fo this page 
     await DSFTest.DSFStandardPageTest(pageName,'el');
 
    
    //-------------------------------------
    pageName='UmD-user-satisfaction-success';
    await DSFTest.ConsoleEcho(pageName); 
    //click on radio button
    await DSFTest.page.evaluate(() => {
        document.querySelectorAll('input[name="SatisfactionSelection"]')[1].click();
    });
    //click
    await DSFTest.page.click('#btnUserSatisfactionSubmit');
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el',false);

    await DSFTest.page.close()
    //-------------------- END TESTS -------------------------
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html');
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();