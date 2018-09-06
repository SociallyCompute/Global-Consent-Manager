"use strict";
let enabled = false;
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

async function onBeforeRequest(request) {
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
    if (tsDomain.startsWith("www.")) {
        tsDomain = tsDomain.substr(4);
    }
    if (tsDomain.startsWith("de.")) {
        tsDomain = tsDomain.substr(3);
    }
    for (let site of sites) {
        if (site.domain == tsDomain) {
            if (doTrust == true) {
            console.log("Trusting " + tsDomain);
            disable(site);
            
            }
            else {
            console.log("Revoking trust for " + tsDomain);
            enable(site, false);
            }
        }
    }
    // Reloads the tab
    await browser.tabs.reload({bypassCache: true});
}

async function activate() {
        for (let site of sites) {
        //if (site.visits < 7) {
        await enable(site, true);
        //}
    }
    enabled  = false;
}

let actions = {
    async enable() {
        activate();
    },
    
    async disable() {
        browser.storage.sync.set({enabled: true});
        for (let site of sites) {
            await disable(site);
        }
        console.log("Cookies and CSS hiders disabled");
        enabled = true;
        browser.storage.sync.set({enabled: false});
    },

    trust() {
        browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                trust(tab,true);
            });
    },
    
    noTrust() {
        browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                trust(tab,false);
            });
    }
};

async function main() {
    let state = await browser.storage.sync.get();
    /*
    for (let site of sites) {
        site.visits = state[site.domain] || 0;
    }
    */

    if (state.enabled) {
        actions.enable();
    }

    browser.runtime.onMessage.addListener((msg) => {
        actions[msg]();
    });

    browser.webRequest.onBeforeRequest.addListener(onBeforeRequest, {
        types: ["main_frame"],
        urls: ["<all_urls>"],

    });
}

activate();

main();
