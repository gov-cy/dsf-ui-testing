import { DSFTesting } from '../modules/dsf-testing.mjs';
import { question } from 'readline-sync'

(async () => {

    let DSFTest = new DSFTesting();
   
    //DEBUG --- overwrite puppeteeer settings to headles browser false
    DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors',], slowMo: 0, };
    await DSFTest.startTest('Citizen Data', 'reports/citizen-data/');

    let pageName = 'root';

    DSFTest.skipLog = false;

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

//await DSFTest.page.waitForSelector('#btnApplicationStart')
await DSFTest.page.click('#btnApplicationStart')

await DSFTest.page.waitForNavigation()

await DSFTest.page.waitForSelector('#username')
await DSFTest.page.click('#username')

await DSFTest.page.type('#username', 'citizen18')

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

//await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')

//await DSFTest.page.waitForSelector('button.govcy-btn-primary')
await DSFTest.page.click('button.govcy-btn-primary')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'set-email';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

//await DSFTest.page.waitForSelector('#Email')
await DSFTest.page.click('#Email')

await DSFTest.page.type('#Email', 'cevangeloudits@gmail.com')

//await DSFTest.page.waitForSelector('button.govcy-btn-primary')
await DSFTest.page.click('button.govcy-btn-primary')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'email-verification';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

//await DSFTest.page.waitForSelector('#Otp')
await DSFTest.page.click('#Otp')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
await DSFTest.ConsoleEcho(pageName,"Read OTP from console");
var sOTP = question('May I have your OTP? ');
console.log('OTP ' + sOTP + '!');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.type('#Otp', sOTP)

//await DSFTest.page.waitForSelector('#mainContainer > .govcy-col-8 > .govcy-container > .govcy-form > .govcy-btn-primary')
await DSFTest.page.click('#mainContainer > .govcy-col-8 > .govcy-container > .govcy-form > .govcy-btn-primary')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'email CONFIRM';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

//await DSFTest.page.waitForSelector('button.govcy-btn-primary')
await DSFTest.page.click('button.govcy-btn-primary')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'address-selection';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

//await DSFTest.page.waitForSelector('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')

//await DSFTest.page.waitForSelector('button.govcy-btn-primary')
await DSFTest.page.click('button.govcy-btn-primary')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'set-address-1';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

//await DSFTest.page.waitForSelector('#PostalCode')
await DSFTest.page.click('#PostalCode')

await DSFTest.page.type('#PostalCode', '2040'); 

//await DSFTest.page.waitForSelector('button.govcy-btn-secondary')
await DSFTest.page.click('button.govcy-btn-secondary')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'set-address-2';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');

//await DSFTest.page.waitForSelector('#ViewModel_SelectedAddress')
await DSFTest.page.click('#ViewModel_SelectedAddress')

await DSFTest.page.select('#ViewModel_SelectedAddress', '7-101204')

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'set-address-3';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');

await DSFTest.page.focus('#StreetNo');
//await DSFTest.page.waitForSelector('#StreetNo')
await DSFTest.page.click('#StreetNo')

await DSFTest.page.type('#StreetNo', '26Α'); 

await DSFTest.page.click('button.govcy-btn-primary')


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'mobile-selection';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.click('.govcy-form > .govcy-fieldset > .govcy-form-control > .govcy-radio:nth-child(2) > .govcy-radio-checked')
//click
await DSFTest.page.click('button.govcy-btn-primary');

 
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'set-mobile';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
//type
await DSFTest.page.focus("#Mobile");
await DSFTest.page.type("#Mobile","99484967", { delay: 100 });

//click
await DSFTest.page.click('button.govcy-btn-primary');

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'mobile-verification';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');
//await DSFTest.page.waitForSelector('#Otp')

await DSFTest.ConsoleEcho(pageName,"Read OTP from console");
var sOTP = question('May I have your OTP? ');
console.log('OTP ' + sOTP + '!');
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
pageName = 'mobile-check-for-verification';
await DSFTest.ConsoleEcho(pageName);       
await DSFTest.DSFStandardPageTest(pageName,'el');

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

await DSFTest.page.type('#Otp', sOTP)

//await DSFTest.page.waitForSelector('button.govcy-btn-primary')
//click
await DSFTest.page.click('button.govcy-btn-primary');

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

