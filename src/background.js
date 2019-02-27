"use strict";

async function enable(site) {
    if (site.selector) {
        site.cs = await browser.contentScripts.register({
            matches: [`*://*.${site.domain}/*`],
            css: [{code: `${site.selector} { display: none !important }`}],
            runAt: "document_start",
        });
        console.log(site.selector + " rule set for " + site.domain);
        return;
    }
    await browser.cookies.set({
        domain: site.domain,
        name: site.name,
        value: site.value,
        url: `http://${site.domain}/`,
        firstPartyDomain: "",
    });
    console.log(`Cookie ${site.name} set for domain ${site.domain}`);
}

async function disable(site) {
    if (site.selector) {
        return site.cs.unregister();
    }
    if (site.name) {
        await browser.cookies.remove({
            name: site.name,
            url: `http://${site.domain}/`,
            firstPartyDomain: "",
        });
    }
}

let actions = {
    async message({domain, blocked, getDomain}) {
        if (getDomain) {
            const result = await getSite(getDomain);
            console.log(result, getDomain, sites);
            return result;
        }

        console.log("message", sites);
        let site = await getSite(domain);
        if (!site) {
            site = {blocked, manual: true, domain};
            sites.push(site);
        }
        site.storage = {blocked, manual: true};
        await browser.storage.sync.set({[site.domain]: site.storage});
        if (blocked) {
            await enable(site);
        } else {
            await disable(site);
        }
    },

    async navigation({url}) {
        let site = await getSite(new URL(url).host);
        let date = new Date().toISOString().substr(0, 10);

        if (!site || site.manual || !site.blocked || date in site.storage) {
            return;
        }

        if (Object.keys(site.storage).length <= 5) {
            site.storage[date] = 1;
        } else {
            site.storage = {blocked: false};
            await disable(site);
        }
        await browser.storage.sync.set({[site.domain]: site.storage});
    },
};

async function initRequestBlocker() {
    await browser.webRequest.onBeforeRequest.addListener(
        async function(details) {
            const tab = await browser.tabs.get(details.tabId);
            const host = new URL(tab.url).host;
            const siteSettings = await getSite(host) || {blocked: true};

            return {cancel: siteSettings.blocked};
        },
        {urls: domains},
        ["blocking"]
    );
}

async function main() {
    for (let {domain} of sites) {
        let site = await getSite(domain);
        if (site.blocked) {
            await enable(site);
        }
    }

    await initRequestBlocker();
    await browser.runtime.onMessage.addListener(actions.message);
    await browser.webNavigation.onCommitted.addListener(actions.navigation);
}
main();
