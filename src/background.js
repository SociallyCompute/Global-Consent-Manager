"use strict";
const sites = [
    {
        // Working 8/29/2018 (M)
        domain: "mediapart.fr",
        name: "cc",
        value: "{%22disagreement%22:[%22visit%22%2C%22ad%22]%2C%22creation%22:1535909178562%2C%22update%22:1535909178562}",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "theguardian.com",
        name: "GU_TK",
        value: "0",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "theguardian.co.uk",
        name: "GU_TK",
        value: "0",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "thelocal.es",
        name: "euconsent",
        value: "BOTRKYzOTRKYzABABBENBdAAAAAgWAAA",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "telegraph.co.uk",
        name: "_evidon_consent_cookie",
        value: "{\"vendors\":{\"6\":[]},\"consent_date\":\"2018-08-23T18:33:49.352Z\"}",
        trusted: false,
    },
    {
        domain: "independent.co.uk",
        selector: ".qc-cmp-ui-container.qc-cmp-showing",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "theverge.com",
        selector: "#privacy-consent",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "worldcrunch.com",
        selector: "#cookie-notice",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "forsal.pl",
        selector: "#inforcwp",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "index.hr",
        selector: ".cookie-consent-container",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "investing.com",
        selector: ".consentBarWrapper",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "thejournal.ie",
        selector: "#notify-container",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "politico.eu",
        selector: ".alert-cookies",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        // takes a little while to load
        domain: "voterspost.com",
        selector: "#cookie-notice",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "bbc.com",
        selector: "#cookiePrompt",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "euractiv.com",
        selector: "#cookie-law-bar",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "nytimes.com",
        selector: "#app > footer[role=contentinfo] + .shown.expanded:last-child",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "ctxt.es",
        selector: "#aviso-cookies",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "lepetitjournal.com",
        selector: ".popup-content",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "portfolio.hu",
        selector: "#_iph_cp_popup",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "nouvelobs.com",
        selector: "#ObsCnil",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "index.hu",
        selector: "#_iph_cp_popup",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "reuters.com",
        selector: "#_evidon_banner",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "shetnews.co.uk",
        selector: "#alert",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "tgcom24.mediaset.it",
        selector: "#cookieGdpr, #cookieAdv",
        trusted: false,
    },
    {
        // Working 8/29/2018 (M)
        domain: "trtworld.com",
        selector: ".gdpr-banner",
        trusted: false,
    },
];

function get(url) {
    let {host} = new URL(url);
    return sites.find((s) => host.endsWith(s.domain));
}

async function resetValues(string, enabled) {
    // console.log(string);
    // console.log(enabled);
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
    if (site.cs != undefined && site.enabled) {
        site.enabled = false;
        return site.cs.unregister();
    }
    if (site.name != undefined) {
        site.enabled = false;
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

let foundOne = false;

async function queryTrust(trustedSite, trusting) {
    let tsDomain = trustedSite.url.split("/")[2];
    if (tsDomain == undefined) {
        console.log("No value for Domain!");
    } else {
        if (tsDomain.startsWith("www.")) {
            tsDomain = tsDomain.substr(4);
        }
        if (tsDomain.startsWith("de.")) {
            tsDomain = tsDomain.substr(3);
        }
        foundOne = false;
        for (let site of sites) {
            if (site.domain == tsDomain) {
                console.log("TRUSTED VALUE AT RUN: " + site.trusted);
                foundOne = true;
                if (trusting) {
                    trust(site, tsDomain);
                } else {
                    site.trusted = trustedStatus;
                }
            }
        }
        if (!foundOne) {
            console.log("This website is not in the list!");
        }
    }
}

async function trust(site, tsDomain) {
    if (site.trusted) {
        site.trusted = false;
        trustedStatus = false;
        console.log("Trusting " + tsDomain);
    } else {
        site.trusted = true;
        trustedStatus = true;
        console.log("Revoking trust for " + tsDomain);
    }
    if (!trustedStatus) {
        disable(site);
    } else {
        enable(site, false);
    }
    await actions.setTrust();
    console.log("TRUSTED VALUE CHANGED TO: " + site.trusted);
}

let enabledStatus = false;
let trustedStatus = false;
let actions = {
    async enable() {
        if (!enabledStatus) {
            for (let site of sites) {
            // if (site.visits < 7) {
                await enable(site, true);
            // }
            }
            resetValues("initTrustFalse", false);
        }
        await browser.storage.sync.set({
            enabled: true,
            trusted: false});
        enabledStatus = true;
    },

    async disable() {
        if (enabledStatus) {
            for (let site of sites) {
                await disable(site);
            }
            console.log("Cookies and CSS hiders disabled");
            resetValues("initTrustTrue", true);
        }
        await browser.storage.sync.set({
            enabled: false,
            trusted: true});
        enabledStatus = false;
    },

    async trust() {
        browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                queryTrust(tab, true);
            });
        // resetValues("resetTrust");
        await browser.storage.sync.set({trusted: true});
    },

    setTrust() {
        if (trustedStatus) {
            resetValues("initTrustTrue", false);
        } else {
            resetValues("initTrustFalse", false);
        }
    },

    setTrustInit() {
        console.log("TRUSTED STATUS: " + trustedStatus);
        browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                queryTrust(tab, false);
            });
        if (foundOne) {
            if (trustedStatus) {
                resetValues("initTrustTrue", true);
            } else {
                resetValues("initTrustFalse", false);
            }
        }
    },
};

async function main() {
    /*
    for (let site of sites) {
        site.visits = state[site.domain] || 0;
    }*/
    actions["enable"];

    browser.runtime.onMessage.addListener((msg) => {
        actions[msg]();
    });

    // browser.webRequest.onBeforeRequest.addListener(onBeforeRequest, {
    //     types: ["main_frame"],
    //     urls: ["<all_urls>"],
    // });
}

main();
