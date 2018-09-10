"use strict";

let actions = {
    block() {
        if (!document.getElementById("block").checked) {
            browser.runtime.sendMessage("disable");
        } else {
            browser.runtime.sendMessage("enable");
        }
    },

    async trust() {
        browser.runtime.sendMessage("trust");
    },
};


async function handleMessage(message) {
    if (message.greet == "notList" && !message.stat) {
        document.getElementById("trust").innerHTML = "Website is not on the list.<br>(Reports coming soon)";
        document.getElementById("trust").disabled = true;
    } else if (message.greet == "notList" && message.stat) {
        document.getElementById("trust").disabled = false;
    } else {
        if (message.greet == "initTrustTrue") {
            document.getElementById("checkTrust").checked = true;
            document.getElementById("trust").innerHTML = "Website Trusted<br>(Click to Change)";
        } else {
            document.getElementById("checkTrust").checked = false;
            document.getElementById("trust").innerHTML = "Website Not Trusted<br>(Click to Change)";
        }
    }
    // console.log("GREET: " + message.greet);
    // console.log("STAT: " + message.stat);
    // console.log("CHECKED: " + document.getElementById("checkTrust").checked);
}

async function main() {
    let block = document.querySelector("#block");
    let {enabled} = await browser.storage.sync.get("enabled");
    block.checked = enabled;
    actions.block();

    browser.runtime.sendMessage("setTrustInit");

    document.addEventListener("click", async (e) => {
        if (e.target.id == "block" || "trust") {
            console.log("**************************************");
            await actions[e.target.id]();
        }
    });
    browser.runtime.onMessage.addListener(handleMessage);
}

main();

