"use strict";

function updateManaged(site) {
    let managed = document.querySelector("#managed");
    managed.classList.toggle("manual", !!site.manual);
    managed.classList.toggle("blocked", site.blocked);
    managed.classList.toggle("unblocked", !site.blocked);
    managed.classList.toggle("visited", Object.keys(site.storage).length > 2);
    document.querySelector("#management").classList.toggle("notmanaged", !managed);
    document.querySelector("#management").classList.toggle("managed", managed);
    console.log("managed: ", managed.className, Object.keys(site.storage).length);
}

function updateSecondary(isWebsite) {
    let report = document.querySelector("#report");
    let nosite = document.querySelector("#nosite");
    let cdblock = document.querySelector("#cdblock");
    cdblock.classList.toggle("hide", !isWebsite);
    report.classList.toggle("hide", !isWebsite);
    nosite.classList.toggle("hide", isWebsite);
    document.querySelector("#management").classList.toggle("notmanaged", true);
    document.querySelector("#management").classList.toggle("managed", false);
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
    let isWebsite = true;

    if (tab.url.startsWith("about:") || tab.url.startsWith("file:")
        || tab.url.startsWith("view-source:") || tab.url == "") {
        isWebsite = false;
        updateSecondary(isWebsite);
    } else {
        let blocked = document.querySelector("#blocked");
        blocked.checked = (site || {blocked: true}).blocked;
        blocked.addEventListener("change", actions);
        updateManaged(site);
        if (!site) {
            isWebsite = true;
            let report = document.querySelector("#report");
            document.body.className = "unknown";
            report.addEventListener("click", actions);
            updateSecondary(isWebsite);
        }
    }
}

main();
