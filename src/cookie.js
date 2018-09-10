"use strict";

let actions = {
    async blocked(e) {
        await browser.runtime.sendMessage({
            domain: document.querySelector("#domain").textContent,
            blocked: e.target.checked,
        });
        await browser.tabs.reload({bypassCache: true});
    },

    async report(e) {
        let [tab] = await browser.tabs.query({active: true, currentWindow: true});
        await browser.tabs.create({
            url: "https://github.com/SociallyCompute/Global-Consent-Manager/issues/new?title="
            + "Unlisted: " + domain.textContent + "&body=The site at this url is unlisted: " + "\n"
            + "&projects=loading..." + tab.url + "&labels=Unlisted",
        });
        window.close();
    },

    handleEvent(e) {
        this[e.target.id](e);
    },
};

async function main() {
    let [tab] = await browser.tabs.query({active: true, currentWindow: true});

    let {host} = new URL(tab.url);
    let domain = document.querySelector("#domain");
    domain.textContent = host;

    let site = await getSite(host);
    if (site) {
        document.body.className = "managed";
        let blocked = document.querySelector("#blocked");
        blocked.checked = site.blocked;
        blocked.addEventListener("change", actions);
    } else {
        document.body.className = "unknown";
        let report = document.querySelector("#report");
        report.addEventListener("click", actions);
    }
}

main();
