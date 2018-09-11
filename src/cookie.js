"use strict";

let actions = {
    async blocked(e) {
        await browser.runtime.sendMessage({
            domain: document.querySelector("#domain").textContent,
            blocked: e.target.checked,
        });
        let managed = document.querySelector("#managed");
        let site = await getSite(document.querySelector("#domain").textContent);
        managed.parentNode.className = `${site.storage.blocked} v${Object.keys(site.storage).length}`;
        await browser.tabs.reload({bypassCache: true});
    },

    async report(e) {
        let [tab] = await browser.tabs.query({active: true, currentWindow: true});
        await browser.tabs.create({
            url: "https://github.com/SociallyCompute/Global-Consent-Manager/issues/new?title="
            + "Not listed yet: " + domain.textContent + "&body=The website at this url is unlisted: " + "\n"
            + tab.url + "&projects=loading..." + "&labels=Unlisted",
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

        let managed = document.querySelector("#managed");
        managed.parentNode.className = `${site.storage.blocked} v${Object.keys(site.storage).length}`;
        console.log("managed.className", managed.className);
    } else {
        document.body.className = "unknown";
        let report = document.querySelector("#report");
        report.addEventListener("click", actions);
    }
}

main();
