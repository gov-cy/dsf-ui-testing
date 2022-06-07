import {DSFTesting} from './dsf-testing.mjs';
import puppeteer from 'puppeteer';
import {expect} from 'chai';

const main = async (cap) => {
    console.log("Starting test -->", cap['name'])
    /* Set username and access key

    #on powershell
    $env:BROWSERSTACK_USERNAME = '<username>'
    $env:BROWSERSTACK_ACCESS_KEY = '<access key>'

    #on windows
    set BROWSERSTACK_USERNAME=<username>
    set BROWSERSTACK_ACCESS_KEY=<access key>

    # On Unix 
    export BROWSERSTACK_USERNAME=<username>
    export BROWSERSTACK_ACCESS_KEY=<access key>

    #in javascript
    cap['browserstack.username'] = process.env.BROWSERSTACK_USERNAME || '<username>';

    cap['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY || '<access key>';
    
    */
    cap['browserstack.username'] = process.env.BROWSERSTACK_USERNAME ;
    cap['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY ;

    const browser = await puppeteer.connect({
      browserWSEndpoint:`wss://cdp.browserstack.com/puppeteer?caps=${encodeURIComponent(JSON.stringify(cap))}`,  // The BrowserStack CDP endpoint gives you a `browser` instance based on the `caps` that you specified
      ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    /* 
    *  The BrowserStack specific code ends here. Following this line is your test script.
    *  Here, we have a simple script that opens duckduckgo.com, searches for the word BrowserStack and asserts the result.
    */
    await page.setViewport({ width: 1200, height: 2000, deviceScaleFactor: 1, });

    console.log("********** root page ***");
    //go to page
    await page.goto('https://child-birth-grant.staging.service.gov.cy/', { waitUntil: 'networkidle0', });

    //await before run
    await DSFTesting.timeout(10000);

    //set view port (resolution)
    //sometimes needed to reach the element and click it (bigger height)
    await page.setViewport({ width: 1200, height: 5000, deviceScaleFactor: 1, });
    //click
    await page.click("button.govcy-btn-primary");

    //await before run
    await DSFTesting.timeout(5000);

    console.log("********** CY Login ***");
    //type
    await page.focus("#username");
    await page.type("#username",process.env.CHILD_BIRTH_GRANT_USERNAME, { delay: 100 });

    //type
    await page.focus("#password");
    await page.type("#password",process.env.CHILD_BIRTH_GRANT_PASS, { delay: 100 });

    //click
    await page.click("button.btn-primary");
    //await before run
    await DSFTesting.timeout(10000);

    console.log("********** start  ***");
    
    const title = await page.title('');
    console.log(title);
    try {
        expect(title).to.equal("Βοήθημα τοκετού – gov.cy", 'Expected page title is incorrect!');
        // following line of code is responsible for marking the status of the test on BrowserStack as 'passed'. You can use this code in your after hook after each test
        await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'Title matched'}})}`);
      } catch {
        await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Title did not match'}})}`);
      }
      await browser.close();
};

//  The following capabilities array contains the list of os/browser environments where you want to run your tests. You can choose to alter this list according to your needs
const capabilities = [
{
  'browser': 'chrome',
  'browser_version': 'latest',  // We support chrome v72 and above. You can choose `latest`, `latest-beta`, `latest-1`, `latest-2` and so on, in this capability
  'os': 'osx',
  'os_version': 'catalina',
  'name': 'Chrome latest on Catalina',  // The name of your test and build. See browserstack.com/docs/automate/puppeteer/organize-tests for more details
  'build': 'puppeteer-build-2'
},
// {
//   'browser': 'firefox',
//   'browser_version': 'latest',  // We support firefox v86 and above. You can choose `latest`, `latest-beta`, `latest-1`, `latest-2` and so on, in this capability
//   'os': 'osx',
//   'os_version': 'catalina',
//   'name': 'Firefox latest on Catalina',
//   'build': 'puppeteer-build-2'
// },
{
  'browser': 'edge',
  'browser_version': 'latest',  // We support edge v80 and above. You can choose `latest`, `latest-beta`, `latest-1`, `latest-2` and so on, in this capability
  'os': 'osx',
  'os_version': 'catalina',
  'name': 'Edge latest on Catalina',
  'build': 'puppeteer-build-2'
},
{
  'browser': 'chrome',
  'browser_version': 'latest-1',
  'os': 'Windows',
  'os_version': '10',
  'name': 'Chrome latest-1 on Win10',
  'build': 'puppeteer-build-2'
},
// {
//   'browser': 'firefox',
//   'browser_version': 'latest-beta',
//   'os': 'Windows',
//   'os_version': '10',
//   'name': 'Firefox beta on Win10',
//   'build': 'puppeteer-build-2'
// },
{
  'browser': 'edge',
  'browser_version': 'latest',
  'os': 'Windows',
  'os_version': '10',
  'name': 'Edge latest on Win10',
  'build': 'puppeteer-build-2'
}]

//  The following code loops through the capabilities array defined above and runs your code against each environment that you have specified in parallel
capabilities.forEach(async (cap) => {
  await main(cap);
});