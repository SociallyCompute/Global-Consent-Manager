"use strict";

function updateManaged(site) {
    let managed = document.querySelector("#managed");
    managed.classList.toggle("manual", !!site.manual);
    managed.classList.toggle("blocked", site.blocked);
    managed.classList.toggle("unblocked", !site.blocked);
    managed.classList.toggle("visited", Object.keys(site.storage).length > 2);
    console.log("managed: ", managed.className, Object.keys(site.storage).length);
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
        let [tab] = await browser.tabs.query({active: true, currentWindow: true});
        let domain = document.querySelector("#domain").textContent;
        let body = "I found a bug in Global Consent Manager!"
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
    let report = document.getElementById("report");
    let site = await getSite(host);

    if (tab.url.startsWith("about:") || tab.url.startsWith("file:") || tab.url == "") {
        console.log("Condition met");
        report.innerHTML = "This site is not a webpage...";
        report.disabled = true;
        report.style.display = "initial";
        document.body.className = "unknown";
    } else if (site) {
        report.style.display = "none";
        let blocked = document.querySelector("#blocked");
        blocked.checked = site.blocked;
        blocked.addEventListener("change", actions);
        updateManaged(site);
    } else {
        report.innerHTML = "Report Missing Site...";
        report.disabled = false;
        report.style.display = "initial";
        document.body.className = "unknown";
        report.addEventListener("click", actions);
    }
}

main();
