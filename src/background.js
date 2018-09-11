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
        site.storage.blocked = blocked;
        await browser.storage.sync.set({[site.domain]: site.storage});
        if (blocked) {
            await enable(site);
        } else {
            await disable(site);
        }
    },

    async navigation({url}) {
        let site = await getSite(new URL(url).host);
        if (site && site.blocked) {
            let keys = Object.keys(site.storage);
            let date = new Date().toISOString().substr(0, 16);
            if (keys.length <= 5 && !keys.includes(date)) {
                site.storage[date] = 1;
                await browser.storage.sync.set({[site.domain]: site.storage});
                if (keys.length >= 5 && !site.storage.blocked) {
                    await disable(site);
                }
            }
        }
    },
};

async function main() {
    for (let {domain} of sites) {
        let site = await getSite(domain);
        if (site.blocked) {
            await enable(site);
        }
    }

    await browser.runtime.onMessage.addListener(actions.message);
    await browser.webNavigation.onCommitted.addListener(actions.navigation);
}
main();
