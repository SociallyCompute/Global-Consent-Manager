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
        if (!document.getElementById("checkTrust").checked) {
            browser.runtime.sendMessage("noTrust");
        } else {
            browser.runtime.sendMessage("trust");
        }
    },
};

async function handleMessage(message) {
    if (message.greet == "trust" || (!message.stat && message.greet == "resetTrust")) {
    document.getElementById("trust").innerHTML = "Website Trusted<br>(Click to Change)";
    document.getElementById("checkTrust").checked = false;
    }
    else if (message.greet == "noTrust" || (message.stat && message.greet == "resetTrust")){
    document.getElementById("trust").innerHTML = "Website Not Trusted<br>(Click to Change)";
    document.getElementById("checkTrust").checked = true;
    }
}

async function main() {
    let block = document.querySelector("#block");
    let {enabled} = await browser.storage.sync.get();
    block.checked = enabled;

    document.addEventListener("click", async (e) => {
        await actions[e.target.id]();
    });
    
    browser.runtime.onMessage.addListener(handleMessage);
}

main();

                