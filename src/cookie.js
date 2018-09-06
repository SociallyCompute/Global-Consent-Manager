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
            document.getElementById("trust").innerHTML = "Website Not Trusted<br>(Click to Change)";
            document.getElementById("checkTrust").checked = true;
            browser.runtime.sendMessage("noTrust");
        } else {
            document.getElementById("trust").innerHTML = "Website Trusted<br>(Click to Change)";
            document.getElementById("checkTrust").checked = false;
            browser.runtime.sendMessage("trust");
        }
    },
};

async function main() {
    let block = document.querySelector("#block");
    let {enabled} = await browser.storage.sync.get();
    block.checked = enabled;

    document.addEventListener("click", async (e) => {
        await actions[e.target.id]();
    });
}

main();
