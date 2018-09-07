"use strict";
const sites = [
    {
        // Working 8/29/2018 (M)
        domain: "mediapart.fr",
        name: "cc",
        value: "{%22disagreement%22:[%22visit%22%2C%22ad%22]%2C%22creation%22:1535909178562%2C%22update%22:1535909178562}",
    },
    {
        // Working 8/29/2018 (M)
        domain: "theguardian.com",
        name: "GU_TK",
        value: "0",
    },
    {
        // Working 8/29/2018 (M)
        domain: "theguardian.co.uk",
        name: "GU_TK",
        value: "0",
    },
    {
        // Working 8/29/2018 (M)
        domain: "thelocal.es",
        name: "euconsent",
        value: "BOTRKYzOTRKYzABABBENBdAAAAAgWAAA",
    },
    {
        // Working 8/29/2018 (M)
        domain: "telegraph.co.uk",
        name: "_evidon_consent_cookie",
        value: "{\"vendors\":{\"6\":[]},\"consent_date\":\"2018-08-23T18:33:49.352Z\"}",
    },
    {
        domain: "independent.co.uk",
        selector: ".qc-cmp-ui-container.qc-cmp-showing",
    },
    {
        // Working 8/29/2018 (M)
        domain: "theverge.com",
        selector: "#privacy-consent",
    },
    {
        // Working 8/29/2018 (M)
        domain: "worldcrunch.com",
        selector: "#cookie-notice",
    },
    {
        // Working 8/29/2018 (M)
        domain: "forsal.pl",
        selector: "#inforcwp",
    },
    {
        // Working 8/29/2018 (M)
        domain: "index.hr",
        selector: ".cookie-consent-container",
    },
    {
        // Working 8/29/2018 (M)
        domain: "investing.com",
        selector: ".consentBarWrapper",
    },
    {
        // Working 8/29/2018 (M)
        domain: "thejournal.ie",
        selector: "#notify-container",
    },
    {
        // Working 8/29/2018 (M)
        domain: "politico.eu",
        selector: ".alert-cookies",
    },
    {
        // Working 8/29/2018 (M)
        // takes a little while to load
        domain: "voterspost.com",
        selector: "#cookie-notice",
    },
    {
        // Working 8/29/2018 (M)
        domain: "bbc.com",
        selector: "#cookiePrompt",
    },
    {
        // Working 8/29/2018 (M)
        domain: "euractiv.com",
        selector: "#cookie-law-bar",
    },
    {
        // Working 8/29/2018 (M)
        domain: "nytimes.com",
        selector: "#app > footer[role=contentinfo] + .shown.expanded:last-child",
    },
    {
        // Working 8/29/2018 (M)
        domain: "ctxt.es",
        selector: "#aviso-cookies",
    },
    {
        // Working 8/29/2018 (M)
        domain: "lepetitjournal.com",
        selector: ".popup-content",
    },
    {
        // Working 8/29/2018 (M)
        domain: "portfolio.hu",
        selector: "#_iph_cp_popup",
    },
    {
        // Working 8/29/2018 (M)
        domain: "nouvelobs.com",
        selector: "#ObsCnil",
    },
    {
        // Working 8/29/2018 (M)
        domain: "index.hu",
        selector: "#_iph_cp_popup",
    },
    {
        // Working 8/29/2018 (M)
        domain: "reuters.com",
        selector: "#_evidon_banner",
    },
    {
        // Working 8/29/2018 (M)
        domain: "shetnews.co.uk",
        selector: "#alert",
    },
    {
        // Working 8/29/2018 (M)
        domain: "tgcom24.mediaset.it",
        selector: "#cookieGdpr, #cookieAdv",
    },
    {
        // Working 8/29/2018 (M)
        domain: "trtworld.com",
        selector: ".gdpr-banner",
    },
];

function get(url) {
    let {host} = new URL(url);
    return sites.find((s) => host.endsWith(s.domain));
}

async function resetValues(string, enabled) {
    await browser.runtime.sendMessage({
        greet: string,
        stat: enabled,
    });
}

async function enable(site, log) {
    site.enabled = true;
    if (site.selector) {
        site.cs = await browser.contentScripts.register({
            matches: [`*://*.${site.domain}/*`],
            css: [{code: `${site.selector} { display: none !important }`}],
            runAt: "document_start",
        });
        if (log) {
            console.log(site.selector + " rule set for " + site.domain);
        }
        return;
    }
    await browser.cookies.set({
        domain: site.domain,
        name: site.name,
        value: site.value,
        url: `http://${site.domain}/`,
        firstPartyDomain: "",
    });
    if (log) {
        console.log(`Cookie ${site.name} set for domain ${site.domain}`);
    }
}

async function disable(site) {
    if (site.cs && site.enabled) {
        site.enabled = false;
        return site.cs.unregister();
    }
    if (site.name != undefined) {
        await browser.cookies.remove({
            name: site.name,
            url: `http://${site.domain}/`,
            firstPartyDomain: "",
        });
    }
}

async function onBeforeRequest(request) {   // eslint-disable-line
    let site = get(request.url);
    if (site && site.enabled) {
        /*
        site.visits++;
        console.log(site.domain, "visits:", site.visits);
        await browser.storage.sync.set({[site.domain]: site.visits});
        if (site.visits > 7) {
            disable(site);
        }
        */
    }
}

async function trust(trustedSite, doTrust) {
    let tsDomain = trustedSite.url.split("/")[2];
    // conditional for "www." cases
    if (tsDomain == undefined) {
        console.log("No value for Domain!");
    } else {
        if (tsDomain.startsWith("www.")) {
            tsDomain = tsDomain.substr(4);
        }
        if (tsDomain.startsWith("de.")) {
            tsDomain = tsDomain.substr(3);
        }
        let foundOne = false;
        for (let site of sites) {
            if (site.domain == tsDomain) {
                foundOne = true;
                if (doTrust == true) {
                    console.log("Trusting " + tsDomain);
                    disable(site);
                    await browser.runtime.sendMessage({greet: "trust"});
                } else {
                    console.log("Revoking trust for " + tsDomain);
                    enable(site, false);
                    await browser.runtime.sendMessage({greet: "noTrust"});
                }
            }
        }
        if (!foundOne) {
            console.log("This website is not in the list!");
        }
    }
    // Reloads the tab
}

async function activate() {
    for (let site of sites) {
        // if (site.visits < 7) {
        await enable(site, true);
        // }
    }
}

// let enabled = false;
let actions = {
    async enable() {
        activate();
        resetValues("resetTrust", true);
        await browser.tabs.reload({bypassCache: true});
        browser.storage.sync.set({enabled: true});
    },

    async disable() {
        browser.storage.sync.set({enabled: false});
        for (let site of sites) {
            await disable(site);
        }
        console.log("Cookies and CSS hiders disabled");
        resetValues("resetTrust", false);
        await browser.tabs.reload({bypassCache: true});
        // enabled = false;
    },

    async trust() {
        browser.storage.sync.set({trusted: true});
        browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                trust(tab, true);
            });
        resetValues("resetTrust", true);
        await browser.tabs.reload({bypassCache: true});
    },

    async noTrust() {
        browser.storage.sync.set({trusted: false});
        browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                trust(tab, false);
            });
        resetValues("resetTrust", false);
        await browser.tabs.reload({bypassCache: true});
    },
};

// This function determines if a domain is in the set list of domains.
// It is similar to trust().

/* let worthValue = true;
   sync function checkifTrust(tabsSecond) {
    let tsDomain = tabsSecond.url.split("/")[2];
    let foundOne = false;
    for (let site of sites) {
        if (tsDomain.startsWith("www.")) {
            tsDomain = tsDomain.substr(4);
        }
        if (tsDomain.startsWith("de.")) {
            tsDomain = tsDomain.substr(3);
        }
        if (site.domain == tsDomain) {
            foundOne = true;
        }
    }
    if (foundOne == false) {
        worthValue = false;
    }
    console.log(foundOne);
}

//This function's purpose is to break down the process of checkifTrust.

function singleUpdate() {
    browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
        .then((tabs) => browser.tabs.get(tabs[0].id))
        .then((tab) => {
            checkifTrust(tab);
        });
    if (!worthValue) {
        resetValues("notList");
    }
}

//When called, this function updates the checkboxes, based on persistent values.

function update() {
    resetValues("resetTrust", enabled);
    resetValues("checkbox", enabled);
    singleUpdate();
}*/

async function main() {
    /*
    for (let site of sites) {
        site.visits = state[site.domain] || 0;
    }*/

    let {enabled} = await browser.storage.sync.get({enabled: true});
    let {trusted} = await browser.storage.sync.get({trusted: true});

    if (enabled) {
        actions.enable();
    } else {
        actions.disable();
    }
    if (trusted) {
        actions.noTrust();
    } else {
        actions.trust();
    }

    console.log((await browser.storage.sync.get()));
    console.log(enabled);
    console.log(trusted);

    browser.runtime.onMessage.addListener((msg) => {
        actions[msg]();
    });

    // browser.webRequest.onBeforeRequest.addListener(onBeforeRequest, {
    //     types: ["main_frame"],
    //     urls: ["<all_urls>"],
    // });
}

main();
