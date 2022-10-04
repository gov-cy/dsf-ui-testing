import { DSFTesting } from '../modules/dsf-testing.mjs';

(async () => {

    let DSFTest = new DSFTesting();
   
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    //DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors',], slowMo: 0, };
    DSFTest.puppeteerSettings = { headless: true };
    await DSFTest.startTest('Citizen Data', 'reports/citizen-data/');

    let pageName = 'root';
    
    await DSFTest.page.goto('https://localhost:44319/', { delay: 1000 })
    await DSFTest.page.setViewport({ width: 1920, height: 969 })

    await DSFTest.ConsoleEcho(pageName);
    await DSFTest.DSFStandardPageTest(pageName,'el');

    await DSFTest.page.waitForSelector('#btnApplicationStart')
    await DSFTest.page.click('#btnApplicationStart')

    await DSFTest.page.waitForNavigation()
    
     //-------------------------------------
    //await before run
    await DSFTesting.timeout(100);
    await DSFTest.ConsoleEcho('CY Login');
    
    //type
    await DSFTest.page.focus('#username');
    await DSFTest.page.type('#username', process.env.CITIZEN_DATA_USERNAME, { delay: 100 });
    
    //type
    await DSFTest.page.focus('#password');
    await DSFTest.page.type('#password', process.env.CITIZEN_DATA_PASS, { delay: 100 });

    await DSFTest.page.click('.inner-body > .row > .col > .pb-1 > .btn')
        
    await DSFTest.page.waitForNavigation()

    //await DSFTest.ConsoleEcho('CY Login Authentication');
    
    //await DSFTest.page.waitForSelector('.inner-body > .consent-form > .row > .col-auto > .btn-primary')
    //await DSFTest.page.click('.inner-body > .consent-form > .row > .col-auto > .btn-primary')
    
    //await DSFTest.page.waitForNavigation()
    
    await DSFTest.ConsoleEcho('EmailSelection');

    pageName = 'EmailSelection';
    await DSFTest.DSFStandardPageTest(pageName, 'el'); 

    await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(1) > .govcy-radio-checked')
    await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(1) > .govcy-radio-checked')

    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')

    await DSFTest.page.waitForNavigation()

    await DSFTest.ConsoleEcho('SetAddress');

    pageName = 'SetAddress';
    await DSFTest.DSFStandardPageTest(pageName, 'el'); 

    await DSFTest.ConsoleEcho('SetAddress','Postal Code');

    await DSFTest.page.waitForSelector('#PostalCode')
    await DSFTest.page.click('#PostalCode')

    await DSFTest.page.type('#PostalCode', '2331');

    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-secondary')

    await DSFTest.page.waitForNavigation()

    await DSFTest.ConsoleEcho('SetAddress','Address Select');

    await DSFTest.page.waitForSelector('#ViewModel_SelectedAddress')
    await DSFTest.page.click('#ViewModel_SelectedAddress')

    await DSFTest.page.select('#ViewModel_SelectedAddress', '146-102103')

    await DSFTest.page.waitForNavigation()

    await DSFTest.ConsoleEcho('SetAddress','Street No');

    await DSFTest.page.focus('#StreetNo');
    await DSFTest.page.waitForSelector('#StreetNo')
    await DSFTest.page.click('#StreetNo')

    await DSFTest.page.type('#StreetNo', '16A');

    await DSFTest.page.waitForSelector('.govcy-col-8 > .govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-btn-primary')
    await DSFTest.page.click('.govcy-col-8 > .govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-btn-primary')

    await DSFTest.page.waitForNavigation()

    await DSFTest.ConsoleEcho('SetMobile');

    pageName = 'SetMobile';
    await DSFTest.DSFStandardPageTest(pageName, 'el'); 
    
    await DSFTest.page.waitForSelector('#mobile')
    await DSFTest.page.click('#mobile')

    await DSFTest.ConsoleEcho('SetMobile','Type mobile');
    await DSFTest.page.type('#mobile', '99530552');
    
    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    
    await DSFTest.page.waitForNavigation()

    await DSFTest.ConsoleEcho('MobileVerification');

    pageName = 'MobileVerification';
    await DSFTest.DSFStandardPageTest(pageName, 'el'); 
    
    await DSFTest.page.waitForSelector('#Otp')
    await DSFTest.page.click('#Otp')

    await DSFTest.ConsoleEcho('MobileVerification','Type Otp');
    await DSFTest.page.type('#Otp', '12345');    
    
    await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
    
    await DSFTest.page.waitForNavigation()
    
    console.log('********** Save Test ***');
  
    //process.exit(0);
    //FLOW report
    await DSFTest.reportLighthouseFlow('report.html')
    console.log(DSFTest.reportJSON);
    //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();
