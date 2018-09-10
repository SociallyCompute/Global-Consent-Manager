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
    await browser.cookies.remove({
        name: site.name,
        url: `http://${site.domain}/`,
        firstPartyDomain: "",
    });
}

let actions = {
    async message({domain, blocked}) {
        let site = await getSite(domain);
        if (blocked) {
            await enable(site);
        } else {
            await disable(site);
        }
        await browser.storage.sync.set({[site.domain]: {blocked}});
    },
};

async function main() {
    for (let {domain} of sites) {
        let site = await getSite(domain);
        if (site.blocked) {
            await enable(site);
        }
    }

    browser.runtime.onMessage.addListener(actions.message);
}
main();
