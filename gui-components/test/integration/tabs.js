// const puppeteer = require('puppeteer');
// const expect = require('chai').expect;
// const { startServer } = require('polyserve');
// const path = require('path');
// const fs = require('fs');
// const appUrl = 'http://127.0.0.1:4444';
// const screenshotDir = `${process.cwd()}/test/integration/screenshots-baseline`;

// // DOM helpers.
// const getChild = (el, childSelector) => {
//     return el.querySelector(childSelector);
// };

// const getChildProp = (el, childSelector, prop) => {
//     return el.querySelector(childSelector)[prop];
// };
// const doClick = (el, childSelector) => {
//     return el.querySelector(childSelector).click();
// };

// describe('tabs tests', function () {
//     let polyserve, browser, page;

//     before(async function () {
//         polyserve = await startServer({ port: 4444, root: path.join(__dirname, '../..'), moduleResolution: 'node' });
//         // Create the test directory if needed.
//         if (!fs.existsSync(screenshotDir)){
//             fs.mkdirSync(screenshotDir);
//         }
//     });

//     after((done) => polyserve.close(done));

//     beforeEach(async function () {
//         browser = await puppeteer.launch();
//         page = await browser.newPage();
//     });

//     afterEach(() => browser.close());

//     it('the page selector switches tabs', async function () {
//         await page.goto(`${appUrl}`);
//         await page.waitForSelector('rasterex-tabs', { visible: true });

//         await testTabsNavigation(page, '#rasterex-tab-generated-1')
//         await testTabsNavigation(page, '#rasterex-tab-generated-2')
//         await testTabsNavigation(page, '#rasterex-tab-generated-0')
//     });

//     it('the page selector dismiss tabs', async function () {
//         await page.goto(`${appUrl}`);
//         await page.waitForSelector('rasterex-tabs', { visible: true });

//         await testTabsDismiss(page, '#rasterex-tab-generated-1');
//         await testTabsDismiss(page, '#rasterex-tab-generated-2');
//         await testTabsDismiss(page, '#rasterex-tab-generated-0');
//     });

//     async function testTabsNavigation(page, selector) {
//         const tabslist = await page.$('rasterex-tabs');

//         await page.evaluate(doClick, tabslist, selector);
//         const selectedTab = await page.evaluate(getChildProp, tabslist, selector, 'selected');
//         await page.screenshot({path: `${screenshotDir}/switch${selector}.png`});
        
//         expect(selectedTab).equal(true);
//     }

//     async function testTabsDismiss(page, tabSelector) {
//         const tabslist = await page.$('rasterex-tabs');
//         const tab =  await page.$(tabSelector);
//         const dimsissSelector = '.dismissItem';

//         await page.evaluate(doClick, tab, dimsissSelector);
//         await page.screenshot({path: `${screenshotDir}/dismiss${tabSelector}.png`});
//         const dismissedTab = await page.evaluate(getChild, tabslist, tabSelector);

//         expect(dismissedTab).equal(null);
//     }
// });
