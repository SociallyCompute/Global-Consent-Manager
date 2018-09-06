"use strict";

async function logCookies(currentDomain) {
    let tabs = await browser.tabs.query({active: true, currentWindow: true});
    let cookies = null;
    if (currentDomain == true) {
        console.log("CURRENT DOMAIN");
        cookies = await browser.cookies.getAll({url: tabs[0].url});
    } else {
        cookies = await browser.cookies.getAll({});
    }
    if (cookies === undefined || cookies.length == 0) {
        console.log("No cookies found!");
    } else {
        let j = 1;
        for (let cookie of cookies) {
            // console.log(cookie);
            console.log("#" + j);
            console.log(cookie);
            j++;
        }
    }
}

let actions = {
    block() {
        if (!document.getElementById("block").checked) {
            browser.runtime.sendMessage("disable");
        } else {
            browser.runtime.sendMessage("enable");
        }
    },

    trust() {
        if (!document.getElementById("trust").innerHTML.indexOf("Not") != -1) {
            document.getElementById("trust").innterHTML = "Website Trusted<br>(Click to Change)";
            browser.runtime.sendMessage("noTrust");
        }
        else {
            document.getElementById("trust").innterHTML = "Website Not Trusted<br>(Click to Change)"
            browser.runtime.sendMessage("trust");
        }
    },
};

// Save a snapshot of cookies to compare to.
let snapshot = [];


async function main() {
    let block = document.querySelector("#block");
    let {enabled} = await browser.storage.sync.get();
    block.checked = enabled;
    
    document.addEventListener("click", async (e) => {
        await actions[e.target.id]();
    });
}

main();
