import fs from 'fs';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
import { startFlow } from 'lighthouse/lighthouse-core/fraggle-rock/api.js';
import pa11y  from 'pa11y';
import htmlReporter from 'pa11y/lib/reporters/html.js';

/**
 * Can perform client side tests using puppeteer and other packages such as lighthouse and pa11y.
 * 
 * Checkout what you can do with puppeteer at https://pptr.dev/
 */
export class DSFTesting {

    /**
     * Start the tests with this function. Will create instances for puppeteer page and lighthouse
     * 
     * @param {string} testName the name of the test  
     * @param {string} reportPath The path of the reports. Can be used to set the folder where the reports are saved  
     */
    async startTest(testName, reportPath="") {
        //set report path
        this.reportPath = reportPath;
        //set test name
        this.testName = testName;
        //create browser and new page
        // if (this.browser != null)
        // {
            this.browser = await puppeteer.launch(this.puppeteerSettings);
            if (this.isIncognito) {
                //run in incognito mode
                this.context = await this.browser.createIncognitoBrowserContext();
                //new page
                this.page = await this.context.newPage();
            } else {
                //new page
                this.page = await this.browser.newPage();    
            }
            //Lighthouse
            //FLOW
            this.flow = await startFlow(this.page, {
                name: testName,
                configContext: this.lighthouseFlowConfigContext,
            });
        // }
    }


    /**
     * Always end tests with this. Will close the browser
     */
    async endTest() {
        //close browser
        this.browser.close();
    }
    /**
     * Wait for some time (in miliseconds) before you execure the next thing
     * 
     * @param {int} ms Time out in miliseconds 
     * @returns 
     */
    static async timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    
    /**
     * Takes a screenshoot
     * 
     * @param {string} filename the name of the file to be saved. The path will be `this.reportPath + filename`
     * @param {int} width the width of the screenshoot 
     */
     async doScreenshot(filename,width) {
        //set view port (resolution)
        await this.page.setViewport({ width: width, height: 100, deviceScaleFactor: 1, });
        //take screenshoot
        await this.page.screenshot({ path: this.reportPath + filename ,fullPage:true});

    }

    /**
     * 
     * @param {string} pageURL the url of the page
     * @returns 
     */
    async doLighthouseA11YScore(pageURL) {
        //set lighthouse settings
        let settings = this.lighthouseSettings;

        //set port on lighthouse settings
        settings.port = (new URL(this.browser.wsEndpoint())).port;

        //get lighthouse results
        let runnerResult = await lighthouse(pageURL, settings);

        //push url
        let result = [];
        result.push(runnerResult.lhr.finalUrl);

        //push performance result
        if (runnerResult.lhr.categories.accessibility.score) {
            result.push(runnerResult.lhr
                .categories.accessibility.score * 100)
        } else {
            result.push("NA");
        }
  
      return result;
    }


    /**
     * runs the lighthouse flow
     * 
     * @param {string} pageURL the url of the page
     */
    async doLighthouseFlow(pageURL) {
        //FLOW
        await this.flow.snapshot({ stepName: pageURL })
    }

    /**
     * starts the lighthouse navivation flow
     * 
     * @param {string} stepName the step name
     */
    async doLighthouseNavStart(stepName) {
        //FLOW
        await this.flow.startTimespan({ stepName: stepName })
    }

    /**
     * stops the lighthouse navivation flow
     * 
     */
    async doLighthouseNavEnd() {
        //FLOW
        await this.flow.endTimespan()
    }

    /**
     * Creates the lighthouse flow report
     * 
     * @param {string} path the report path in string. The path will be `this.reportPath + filename`
     */
    async reportLighthouseFlow(path) {
        //FLOW
        fs.writeFileSync(this.reportPath + path, await this.flow.generateReport());
    }
    
    /**
     * Creates the pa11y report
     * 
     * @param {string} path the report path in string. The path will be `this.reportPath + filename`
     */
    async doPa11y(path) {
        // do PA11Y

        let results = await pa11y(this.page.url(),
        Object.assign(
        {
            browser:this.context,
            page: this.page
        }, this.pa11ySettings));
        
        fs.writeFileSync(this.reportPath + path,await htmlReporter.results(results));
    }

    /**
     * default lighthouse settings
     * more at https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md 
     */
    lighthouseSettings = {
        onlyCategories: ["accessibility"],
        output: "csv",
    };

    /**
     * Default puppeteer Settings
     */
    puppeteerSettings = { headless: true, args: ['--ignore-certificate-errors'], slowMo: 0 };

    /**
     * 
     * Default lighthouse flow settings
     */
    lighthouseFlowConfigContext = {
        screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
        },
        formFactor: "desktop",
    };

    /**
     * Default pa11y settings
     */
    pa11ySettings = {
        standard: 'WCAG2AA'
        ,wait: 10000
    };
    /**
     * The puppeteer page object. See more at  https://pptr.dev/
     */    
    page = null;

    /**
     * The path of the reports. Can be used to set the folder where the reports are saved
     */
     reportPath="";

     browser = null;

     /**
      * Indicates whether to use an incognito browser contenxt
      */
     isIncognito = true;
}

