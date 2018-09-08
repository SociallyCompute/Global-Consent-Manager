"use strict";

let actions = {
    block() {
        if (!document.getElementById("block").checked) {
            browser.runtime.sendMessage("disable");
        } else {
            browser.runtime.sendMessage("enable");
        }
    },

    trust() {
        if (document.getElementById("checkTrust").checked) {
            browser.runtime.sendMessage("trust");
        } else {
            browser.runtime.sendMessage("noTrust");
        }
    },
};


async function handleMessage(message) {
    if (message.greet == "notList" && !message.stat) {
        document.getElementById("trust").innerHTML = "Website is not on the list.<br>(Reports coming soon)";
        document.getElementById("trust").disabled = true;
    } else if (message.greet == "notList" && message.stat) {
        document.getElementById("trust").disabled = false;
    } else if (message.greet == "trust" || (!message.stat && message.greet == "resetTrust")) {
        document.getElementById("trust").innerHTML = "Website Trusted<br>(Click to Change)";
        document.getElementById("checkTrust").checked = false;
    } else if (message.greet == "noTrust" || (message.stat && message.greet == "resetTrust")) {
        document.getElementById("trust").innerHTML = "Website Not Trusted<br>(Click to Change)";
        document.getElementById("checkTrust").checked = true;
    } else if (message.greet = "checkbox") {
        if (message.stat) {
            document.getElementById("block").checked = true;
        } else {
            document.getElementById("block").checked = false;
        }
    }
}

async function main() {
    let block = document.querySelector("#block");
    let {enabled} = await browser.storage.sync.get("enabled");
    block.checked = enabled;
    

    
    let {trusted} = await browser.storage.sync.get("trusted");
    
    if (trusted) {
        document.getElementById("checkTrust").checked = true;
        await actions["trust"]();
    }
    else {
        document.getElementById("checkTrust").checked = false;
        await actions["trust"]();
    }
    
    document.addEventListener("click", async (e) => {
        if (e.target.id == "block" || "trust") {
            await actions[e.target.id]();
        }
    });
    // document.addEventListener("load", check);
    browser.runtime.onMessage.addListener(handleMessage);
}

async function log() {
    console.log(await browser.storage.sync.get("enabled"));
    console.log(await browser.storage.sync.get("trusted"));
}

main();

