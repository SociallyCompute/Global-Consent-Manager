"use strict";

require("geckodriver");

const {expect} = require("chai");
const {resolve} = require("path");
const {Builder, By} = require("selenium-webdriver");
const {Command} = require("selenium-webdriver/lib/command");

const blocklist = require("./blocklist.json");
const driver = new Builder().forBrowser("firefox").build();

async function getPageText(url) {
    await driver.get(url);
    await driver.sleep(1000);
    let body = await driver.findElement(By.tagName("body"));
    return await body.getText();
}

describe("Dialogs visible", () => {
    for (let {domain, dialog} of blocklist) {
        it(domain, async () => {
            let url = `http://${domain}/`;
            let text = await getPageText(url);
            expect(text).to.include(dialog);
        });
    }
});

describe("Install extension", () => {
    it("Done", async () => {
        let path = resolve(__dirname, "..");
        let cmd = new Command("install addon");
        cmd.setParameters({path, temporary: true});
        await driver.execute(cmd);
        await driver.sleep(2000);
    });
});

describe("Dialogs NOT visible", () => {
    for (let {domain, dialog} of blocklist) {
        it(domain, async () => {
            let url = `http://${domain}/`;
            let text = await getPageText(url);
            expect(text).to.not.include(dialog);
        });
    }
});

after(async () => {
    await driver.quit();
});
