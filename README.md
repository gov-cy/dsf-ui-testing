# DSF-ui-testing

This project provides example of UI automated testing. It includes a custom Node module and sample scripts to perform various tests

## Install

You need to have [Node.js](https://nodejs.org/en/) installed.

### 1. Download the tool

### 2. Install modules

Navigate to your local copies folder though the command line and Run the following command `npm install`

## dsf-testing module

This module groups some basic functions to perform client side tests using puppeteer and other packages such as lighthouse and pa11y.

### Starting a test

You can use it by using the import function as follows:

```js
import {DSFTesting} from '../modules/dsf-testing.mjs';
```

To start using it an instance needs to be created as follows: 

```js
let DSFTest = new DSFTesting();
```

You can overwrite the default settings (before calling the `startTest` function) as follows :

```js
DSFTest.puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors'], slowMo: 0 };
DSFTest.isIncognito=false;
DSFTest.pa11ySettings = {
        standard: 'WCAG2AA'
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

To start a test you must call the `startTest` function as follows:

```js
// define <name of report> and <path where reports are saved>
await DSFTest.startTest('Child birth Grand','reports/childBirthGrant/');
```

Then you can tests using the pappeteer instance that has been created. 

### DSF UI Tests

A series of test are performed by the DSF to assure compliance with the design system and accessibility requirements. To perform these tests you can run `DSFStandardPageTest` .


#### dsf-testing example

```js 

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
        //generate the report
    await DSFTest.generateReport();
    //close browser
    await DSFTest.endTest();
})();

```

## Examples scripts

You can find some examples we have been testing under the `\src\` folder. To run the examples use the `node` command as followes: 

```shell
node .\src\mockPuppetier.js   
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

## Todo

- Add more tests
- Add versions of checks
- Run test on non DSF pages (proof of concept) 
- Add linters (html, js, css)