# DSF-ui-testing

This project provides example of UI automated testing. It includes a custom Node module and sample scripts to perform various tests

## Install

You need to have [Node.js](https://nodejs.org/en/) installed.

### 1. Download the tool

### 2. Install modules

Navigate to your local copies folder though the command line and Run the following command `npm install`

## dsf-testing module

This module groups some basic functions to perform client side tests using puppeteer and other packages such as lighthouse and pa11y.

You can use it by using the import function as follows:

```js
import {DSFTesting} from './dsf-testing.mjs';
```

To start using it an instance needs to be created as follows: 

```js
let DSFTest = new DSFTesting();
```

You can overwrite the default settings (before calling the `startTest` function) as follows :

```js
DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors'], slowMo: 0 };
DSFTest.isIncognito=false;
DSFTest.pa11ySettings = {
        standard: 'WCAG2AAA'
        ,wait: 10000
    };
DSFTest.lighthouseFlowConfigContext = {
        screenEmulation: {
            mobile: false,
            width: 1200,
            height: 800,
            deviceScaleFactor: 1
        },
        formFactor: "desktop",
    };
```

Finally to staty a test you must call the `startTest` function as follows:

```js
// define <name of report> and <path where reports are saved>
await DSFTest.startTest('Child birth Grand','reports/childBirthGrant/');
```

### dsf-testing example

```js 
import {DSFTesting} from './dsf-testing.mjs';

(async () => {
    let DSFTest = new DSFTesting();
    DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors'], slowMo: 0 };
    await DSFTest.startTest('Child birth Grand','reports/childBirthGrant/');

    //-------------------- START TESTS -------------------------

    console.log("********** root page ***");
    //go to page
    await DSFTest.page.goto('https://child-birth-grant.staging.service.gov.cy/', { waitUntil: 'networkidle0', });
    //await before run
    await DSFTesting.timeout(10000);
    //take screenshoot
    await DSFTest.doScreenshot( 'root.png' ,1200);
    //set view port (resolution)
    await DSFTest.page.setViewport({ width: 1200, height: 2000, deviceScaleFactor: 1, });
    //do pa11y
    await DSFTest.doPa11y('root.pa11y.html');
    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());
    
    //set view port (resolution)
    //sometimes needed to reach the element and click it (bigger height)
    await DSFTest.page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1, });
    //click
    await DSFTest.page.click("button.govcy-btn-primary");

    //await before run
    await DSFTest.page.waitForNavigation(), // The promise resolves after navigation has finished
    await DSFTest.page.waitForSelector("button.btn-primary");
    console.log("********** CY Login ***");
    //do lighthouse FLOW navidation
    await DSFTest.doLighthouseNavStart("toStart");
    //type
    await DSFTest.page.focus("#username");
    await DSFTest.page.type("#username","mlsi41", { delay: 100 });

    //type
    await DSFTest.page.focus("#password");
    await DSFTest.page.type("#password","testing1!", { delay: 100 });

    //click
    await DSFTest.page.click("button.btn-primary");
    
    //do lighthouse FLOW navidation
    await DSFTest.doLighthouseNavEnd();

    //await before run
    await DSFTesting.timeout(10000);
    console.log("********** start  ***");
    
    //take screenshoot
    await DSFTest.doScreenshot( 'start.png' ,1200);
   
    //do lighthouse FLOW
    await DSFTest.doLighthouseFlow( DSFTest.page.url());

    //do pa11y
    await DSFTest.doPa11y('start.pa11y.html');

    //FLOW report
    await DSFTest.reportLighthouseFlow('report_small.html')
    //close browser
    await DSFTest.endTest();
})();

```

## Examples scripts

You can find some examples we have been testing under the `\src\` folder. To run the examples use the `node` command as followes: 

```shell
node .\src\childBirthGrantPuppetier.js   
```

All of the example scripts use some enviromental variables for test username and password used in the respected scenarios. Make sure you set the following:

```shell
#on powershell
$env:CHILD_BIRTH_GRANT_USERNAME = '<username>'
$env:CHILD_BIRTH_GRANT_PASS = '<password>'

#on windows
set CHILD_BIRTH_GRANT_USERNAME=<username> 
set CHILD_BIRTH_GRANT_PASS=<password> 

# On Unix 
export CHILD_BIRTH_GRANT_USERNAME=<username>
export CHILD_BIRTH_GRANT_PASS=<password>

```

### childBirthGrantPuppetier

This script goes through the user journey of a service, creates **screenshoots**, **accessibility reports** using pa11y and **performance reports** using lighthouse.

### childBirthGrantA11YScore

This script goes through the user journey of a service and uses lighthouse to rate each page with a score on ***Accessibility**.

### childBirthGrantPercy

This script goes through the user journey of a service and takes cross browser screenshoots using **Percy** (https://percy.io/) service. To use the script you need to set the `PERCY_TOKEN` environmental variable as follows:

```shell
#on powershell
$env:PERCY_TOKEN = '<token>'

#on windows
set PERCY_TOKEN=<token> 

# On Unix 
export PERCY_TOKEN=<token>

#on javascript
const percy = await Percy.start({"token": "<token>",})
```

You will need to get the token from your account on Percy.

### childBirthGrantBrowserStack

This script goes through the user journey of a service using different OS and Browsers with  **Browserstack Automate** (https://www.browserstack.com/automate) and checks if the user story creates the desired result. To use the script you need to set the following environmental variable as follows:

```shell
#on powershell
$env:BROWSERSTACK_USERNAME = '<username>'
$env:BROWSERSTACK_ACCESS_KEY = '<accesskey>'

#on windows
set BROWSERSTACK_USERNAME=<username>
set BROWSERSTACK_ACCESS_KEY=<accesskey>

# On Unix 
export BROWSERSTACK_USERNAME=<username>
export BROWSERSTACK_ACCESS_KEY=<accesskey>

#in javascript
cap['browserstack.username'] = process.env.BROWSERSTACK_USERNAME || '<username>';
cap['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY || '<accesskey>';

```

You will need to get the username and access key from your account on Browserstack.