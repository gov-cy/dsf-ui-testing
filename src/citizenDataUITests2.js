import { DSFTesting } from '../modules/dsf-testing.mjs';
import { question } from 'readline-sync'

(async () => {

    let DSFTest = new DSFTesting();
   
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    //DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors',], slowMo: 0, };
    DSFTest.puppeteerSettings = { headless: true };
    await DSFTest.startTest('Citizen Data', 'reports/citizen-data/');

    let pageName = 'root';

    DSFTest.skipLog = true;

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

await DSFTest.page.goto('https://update-my-details.staging.service.gov.cy/')

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

await DSFTest.page.type('#username', 'mlsi5')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
await DSFTest.ConsoleEcho(pageName,"Read password from console");
var sPassword = question('May I have your password? ');
//console.log('password ' + sPassword + '!');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.focus('#password');
await DSFTest.page.type('#password', sPassword, { delay: 100 });

await DSFTest.page.waitForSelector('.inner-body > .row > .col > .pb-1 > .btn')
await DSFTest.page.click('.inner-body > .row > .col > .pb-1 > .btn')

await DSFTest.page.waitForNavigation()

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'email-selection';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')

await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')

await DSFTest.page.waitForNavigation()

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'set-email';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.waitForSelector('#email')
await DSFTest.page.click('#email')

await DSFTest.page.type('#email', 'acheimaris@schools.ac.cy')

await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')

await DSFTest.page.waitForNavigation()

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'email-verification';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.waitForSelector('#Otp')
await DSFTest.page.click('#Otp')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
await DSFTest.ConsoleEcho(pageName,"Read OTP from console");
var sOTP = question('May I have your OTP? ');
console.log('OTP ' + sOTP + '!');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.type('#Otp', sOTP)

await DSFTest.page.waitForSelector('#mainContainer > .govcy-col-8 > .govcy-container > .govcy-form > .govcy-btn-primary')
await DSFTest.page.click('#mainContainer > .govcy-col-8 > .govcy-container > .govcy-form > .govcy-btn-primary')

await DSFTest.page.waitForNavigation()

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'email CONFIRM';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')

await DSFTest.page.waitForNavigation()

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'address-selection';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')

await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')
await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-primary')

await DSFTest.page.waitForNavigation()

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'set-address';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.waitForSelector('#PostalCode')
await DSFTest.page.click('#PostalCode')

await DSFTest.page.type('#PostalCode', '2331'); 

await DSFTest.page.waitForSelector('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-secondary')
await DSFTest.page.click('body > #mainContainer > .govcy-col-8 > .govcy-form > .govcy-btn-secondary')

await DSFTest.page.waitForNavigation()

await DSFTest.page.waitForSelector('#ViewModel_SelectedAddress')
await DSFTest.page.click('#ViewModel_SelectedAddress')

await DSFTest.page.select('#ViewModel_SelectedAddress', '146-102103')

await DSFTest.page.waitForNavigation()

await DSFTest.page.focus('#StreetNo');
await DSFTest.page.waitForSelector('#StreetNo')
await DSFTest.page.click('#StreetNo')

await DSFTest.page.type('#StreetNo', '26Α'); 

await DSFTest.page.waitForSelector('.govcy-col-8 > .govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-btn-primary')
await DSFTest.page.click('.govcy-col-8 > .govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-btn-primary')

await DSFTest.page.waitForNavigation()

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'mobile-selection';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    
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

