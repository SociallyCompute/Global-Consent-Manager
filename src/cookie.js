"use strict";

function updateManaged(site) {
    let managed = document.querySelector("#managed");
    managed.classList.toggle("manual", !!site.manual);
    managed.classList.toggle("blocked", site.blocked);
    managed.classList.toggle("unblocked", !site.blocked);
    managed.classList.toggle("visited", Object.keys(site.storage).length > 2);
    console.log("managed: ", managed.className, Object.keys(site.storage).length);
}

function updateSecondary(isWebsite) {
    console.log(isWebsite);
    let report = document.querySelector("#report");
    let nosite = document.querySelector("#nosite");
    let cdblock = document.querySelector("#cdblock");
    cdblock.classList.toggle("hide", !isWebsite);
    report.classList.toggle("hide", !isWebsite);
    nosite.classList.toggle("hide", isWebsite);
    console.log("Report: ", report.ClassName);
    console.log("NoSite: ", nosite.ClassName);
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
                + tab.url + "&projects=loading..." + "&labels=not listed",
        });
        window.close();
    },

    async bug(e) {
        let domain = document.querySelector("#domain").textContent;
        let body = "I found a bug in Global Consent Manager!";
        body += "%0A%0A";
        body += "(Explain the issue here)";
        await browser.tabs.create({
            url: "https://github.com/SociallyCompute/Global-Consent-Manager/issues/new?title="
                + "Bug found while browsing " + domain + "&body=" + body +
                "&projects=loading..." + "&labels=bug",
        });
        window.close();
    },

    handleEvent(e) {
        this[e.target.id](e);
    },
};

async function main() {
    let [tab] = await browser.tabs.query({active: true, currentWindow: true});

    document.querySelector("#bug").addEventListener("click", actions);

    let {host} = new URL(tab.url);
    let domain = document.querySelector("#domain");
    domain.textContent = host;
    let site = await getSite(host);
    let isWebsite = true;

    if (tab.url.startsWith("about:") || tab.url.startsWith("file:")
        || tab.url.startsWith("view-source:") || tab.url == "") {
        isWebsite = false;
        updateSecondary(isWebsite);
    } else
    if (site) {
        let blocked = document.querySelector("#blocked");
        blocked.checked = site.blocked;
        blocked.addEventListener("change", actions);
        updateManaged(site);
    } else {
        isWebsite = true;
        let report = document.querySelector("#report");
        document.body.className = "unknown";
        report.addEventListener("click", actions);
        updateSecondary(isWebsite);
    }
}

main();
