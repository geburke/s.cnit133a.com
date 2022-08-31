
const assert = require('assert');
const { Console } = require('console');
const webdriver = require('selenium-webdriver');
const { Key } = require('selenium-webdriver/ie');
const { isTypedArray, isRegExp } = require('util/types');
const timeout = 10000;

const prod_url = 'https://cnit133a.com'
const staging_url = 'https://s.cnit133a.com'
const file_name = "../index.html"

let url = ""

function get_url() {
    branch_name = require('child_process')
    .execSync('git rev-parse --abbrev-ref HEAD')
    .toString().trim();

    if (process.argv[2] === "prod" || branch_name === "master") {
        url = prod_url; 
    } else if (process.argv[2] === "staging" || branch_name == "dev") {
        url = staging_url; 
    } else {
        url = "file://" + process.cwd() + "/" + file_name;
    }
    return url;
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

var chromeOptions = {
    'args': ['--allow-file-access-from-files', '--selenium-tester']
};

console.log("Starting tests")
describe("Testing hw2", function() {
    this.timeout(timeout);
    let v = null;

    before(async function() {
        url = await get_url();
    });
    before(async function() {
        console.log("testing url is:", url)
        By = webdriver.By;
        until = webdriver.until;
        driver = await new webdriver.Builder()
         .forBrowser('chrome')
         .setChromeOptions(chromeOptions)
         .build();
        await driver.get(url);
    });

    after(async function() {
        console.log("Closing browser");
        return driver.quit();
    });

    it('Find id href', async function() {
        let heading_says = await driver.findElement(By.id("beginning-web-development-certificate")).getText();
        assert.strictEqual(heading_says, "Beginning Web Development Certificate");
    });
});