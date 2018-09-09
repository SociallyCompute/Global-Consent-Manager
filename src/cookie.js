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
    } else if (message.greet == "list") {
    } else if (message.greet == "checkbox") {
        if (message.stat) {
            document.getElementById("block").checked = true;
        } else {
            document.getElementById("block").checked = false;
        }
    } else if (message.stat == false) {
        if (message.greet == "initTrustTrue") {
            document.getElementById("checkTrust").checked = false;
            document.getElementById("trust").innerHTML = "Website Not Trusted<br>(Click to Change)";
        } else {
            document.getElementById("checkTrust").checked = true;
            document.getElementById("trust").innerHTML = "Website Trusted<br>(Click to Change)";
        }
    } else {
        if (message.greet == "initTrustTrue") {
            document.getElementById("checkTrust").checked = true;
            document.getElementById("trust").innerHTML = "Website Trusted<br>(Click to Change)";
        } else {
            document.getElementById("checkTrust").checked = false;
            document.getElementById("trust").innerHTML = "Website Not Trusted<br>(Click to Change)";
        }
    }
}

async function main() {
    let block = document.querySelector("#block");
    let {enabled} = await browser.storage.sync.get("enabled");
    block.checked = enabled;
    actions.block();

    browser.runtime.sendMessage("setTrustInit");

    document.addEventListener("click", async (e) => {
        if (e.target.id == "block" || "trust") {
            await actions[e.target.id]();
        }
    });
    browser.runtime.onMessage.addListener(handleMessage);
}

main();

