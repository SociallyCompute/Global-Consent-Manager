"use strict";

function updateManaged(site) {
    const managed = document.querySelector("#managed");
    managed.classList.toggle("manual", !!site.manual);
    managed.classList.toggle("blocked", site.blocked);
    managed.classList.toggle("unblocked", !site.blocked);
    managed.classList.toggle("visited", Object.keys(site.storage).length > 2);
    document.querySelector("#management").classList.toggle("notmanaged", !managed);
    document.querySelector("#management").classList.toggle("managed", managed);
    console.log("managed: ", managed.className, Object.keys(site.storage).length);
}

function updateSecondary(isWebsite) {
    const report = document.querySelector("#report");
    const nosite = document.querySelector("#nosite");
    const cdblock = document.querySelector("#cdblock");
    cdblock.classList.toggle("hide", !isWebsite);
    report.classList.toggle("hide", !isWebsite);
    nosite.classList.toggle("hide", isWebsite);
    document.querySelector("#management").classList.toggle("notmanaged", true);
    document.querySelector("#management").classList.toggle("managed", false);
}

const actions = {
    async blocked(e) {
        const domain = document.querySelector("#domain").textContent;
        await browser.runtime.sendMessage({
            domain: domain,
            blocked: e.target.checked,
        });
        updateManaged(await getSite(domain));
        await browser.tabs.reload({bypassCache: true});
    },

    async report(e) {
        const [tab] = await browser.tabs.query({active: true, currentWindow: true});
        const domain = document.querySelector("#domain").textContent;
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


function localize() {
    const {getMessage} = browser.i18n;

    document.querySelector("h1").textContent = getMessage("extension_name");
    document.querySelector("a").firstChild.textContent = getMessage("learn_more");
    document.querySelector("#cdblock").firstChild.textContent = getMessage("blocking_label");
    document.querySelector("#report").textContent = getMessage("report_missing_button");
    document.querySelector("#report").title = getMessage("report_missing_title");
    document.querySelector("#nosite").textContent = getMessage("not_a_webpage");
}

async function main() {
    const [tab] = await browser.tabs.query({active: true, currentWindow: true});

    const {host} = new URL(tab.url);
    const domain = document.querySelector("#domain");
    domain.textContent = host;
    const site = await getSite(host);
    let isWebsite = true;

    if (tab.url.startsWith("about:") || tab.url.startsWith("file:")
        || tab.url.startsWith("view-source:") || tab.url == "") {
        isWebsite = false;
        updateSecondary(isWebsite);
    } else
    if (site) {
        const blocked = document.querySelector("#blocked");
        blocked.checked = site.blocked;
        blocked.addEventListener("change", actions);
        updateManaged(site);
    } else {
        isWebsite = true;
        const report = document.querySelector("#report");
        document.body.className = "unknown";
        report.addEventListener("click", actions);
        updateSecondary(isWebsite);
    }
}

localize();
main();
