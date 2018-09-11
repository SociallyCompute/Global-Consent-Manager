"use strict";

function updateManaged(site) {
    let {blocked} = site.storage;
    let visits = Object.keys(site.storage).length;
    let managed = document.querySelector("#managed");
    managed.className = `manually-${blocked} visits-${visits}`;
    console.log("managed: ", managed.className);
}

let actions = {
    async blocked(e) {
        let domain = document.querySelector("#domain").textContent;
        await browser.runtime.sendMessage({
            domain: domain,
            blocked: e.target.checked,
        });
        updateManaged(await getSite(domain));
        await browser.tabs.reload({bypassCache: true});
    },

    async report(e) {
        let [tab] = await browser.tabs.query({active: true, currentWindow: true});
        let domain = document.querySelector("#domain").textContent;
        await browser.tabs.create({
            url: "https://github.com/SociallyCompute/Global-Consent-Manager/issues/new?title="
                + "Not listed yet: " + domain + "&body=The website at this url is unlisted: " + "\n"
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
        updateManaged(site);
    } else {
        document.body.className = "unknown";
        let report = document.querySelector("#report");
        report.addEventListener("click", actions);
    }
}

main();
