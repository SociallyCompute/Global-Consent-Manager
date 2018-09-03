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

async function enable(c) {
    if (c.selector) {
        c.cs = await browser.contentScripts.register({
            matches: [`*://*.${c.domain}/*`],
            css: [{code: `${c.selector} { display: none !important }`}],
            runAt: "document_start",
        });
        console.log(c.selector + " rule set for " + c.domain);
        return;
    }
    await browser.cookies.set({
        domain: c.domain,
        name: c.name,
        value: c.value,
        url: `http://${c.domain}/`,
        firstPartyDomain: "",
    });
    console.log(`Cookie ${c.name} set for domain ${c.domain}`);
}

async function disable(c) {
    if (c.cs) {
        return c.cs.unregister();
    }
    await browser.cookies.remove({
        name: c.name,
        url: `http://${c.domain}/`,
        firstPartyDomain: "",
    });
}

let actions = {
    async enable() {
        for (let c of sites) {
            await enable(c);
        }
        browser.storage.sync.set({enabled: true});
    },

    async disable() {
        for (let c of sites) {
            await disable(c);
        }
        console.log("Cookies and CSS hiders disabled");
        browser.storage.sync.set({enabled: false});
    },
};

async function main() {
    let state = await browser.storage.sync.get();
    if (state.enabled) {
        actions.enable();
    }
    browser.runtime.onMessage.addListener((msg) => {
        actions[msg]();
    });
}

main();
