import { DSFTesting } from '@gov-cy/govcy-frontend-tester'


(async () => {
     let DSFTest = new DSFTesting();
    await DSFTest.startTest('Mock','reports/mock/');
    //-------------------- START TESTS -------------------------
    let pageName = 'root';
    //go to page
    await DSFTest.page.goto('https://localhost:44319/?culture=el-GR', { waitUntil: 'networkidle0', });
    //set the viewport     
    await DSFTest.page.setViewport({ width: 1920, height: 969 });
    //run the batch of tests and reports fo this page 
    await DSFTest.DSFStandardPageTest(pageName,'el');
    //click
    await DSFTest.page.click('button.govcy-btn-primary');
    //--------Mock Login -----------------------------
    //await before run
    await DSFTesting.timeout(5000);
    console.log('********** Mock Login ***');
    //type
    await DSFTest.page.focus('#Input_Username');
    await DSFTest.page.type('#Input_Username',process.env.MOCK_USERNAME, { delay: 100 });

    //type
    await DSFTest.page.focus('#Input_Password');
    await DSFTest.page.type('#Input_Password',process.env.MOCK_PASS, { delay: 100 });

    //click
    await DSFTest.page.click('button[name="Input.Button"]');

     //-------Email selection ------------------------------
     pageName='email-selection';
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