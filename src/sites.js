"use strict";

/* exported sites, getSite */

const sites = [
    {
        // Working 9/11/2018 (M)
        domain: "mediapart.fr",
        name: "cc",
        value: "{%22disagreement%22:[%22visit%22%2C%22ad%22]%2C%22creation%22:1535909178562%2C%22update%22:1535909178562}",
    },
    {
        // Working 9/11/2018 (M)
        domain: "theguardian.com",
        name: "GU_TK",
        value: "0",
    },
    {
        // Working 9/11/2018 (M)
        domain: "theguardian.co.uk",
        name: "GU_TK",
        value: "0",
    },
    {
        // Working 9/11/2018 (M)
        // ADD MORE thelocal.*
        domain: "thelocal.es",
        name: "euconsent",
        value: "BOTRKYzOTRKYzABABBENBdAAAAAgWAAA",
    },
    {
        // Fixed 9/11/2018 (M)
        domain: "telegraph.co.uk",
        name: "_evidon_consent_cookie",
        value: "{\"vendors\":{\"0\":[]},\"consent_date\":\"2018-08-23T18:33:49.352Z\"}",
    },
    {
        // Fixed 9/11/2018 (M)
        domain: "cnet.com",
        name: "_evidon_consent_cookie",
        value: "{\"vendors\":{\"0\":[]},\"consent_date\":\"2018-08-23T18:33:49.352Z\"}",
    },
    {
        // Working 9/11/2018 (M)
        domain: "independent.co.uk",
        selector: ".qc-cmp-ui-container.qc-cmp-showing",
    },
    {
        // Working 9/11/2018 (M)
        domain: "theverge.com",
        selector: "#privacy-consent",
    },
    {
        // Working 9/11/2018 (M)
        domain: "worldcrunch.com",
        selector: "#cookie-notice",
    },
    {
        // Working 9/11/2018 (M)
        domain: "forsal.pl",
        selector: "#inforcwp",
    },
    {
        // Broken 9/11/2018 (M)
        // Manage consentSaw cookie on load?
        domain: "index.hr",
        selector: ".cookie-consent-container",
    },
    {
        // Broken 9/11/2018 (M)
        // Manage was-set cookie on load?
        domain: "investing.com",
        selector: ".consentBarWrapper",
    },
    {
        // Working 9/11/2018 (M)
        domain: "thejournal.ie",
        selector: "#notify-container",
    },
    {
        // Working 9/11/2018 (M)
        domain: "politico.eu",
        selector: ".alert-cookies",
    },
    {
        // Working 9/11/2018 (M)
        // takes a little while to load with console
        domain: "voterspost.com",
        selector: "#cookie-notice",
    },
    {
        // Working 9/11/2018 (M)
        domain: "bbc.com",
        selector: "#cookiePrompt",
    },
    {
        // Working 9/11/2018 (M)
        domain: "euractiv.com",
        selector: "#cookie-law-bar",
    },
    {
        // Working 9/11/2018 (M)
        domain: "nytimes.com",
        selector: "#app > footer[role=contentinfo] + .shown.expanded:last-child",
    },
    {
        // Working 9/11/2018 (M)
        domain: "ctxt.es",
        selector: "#aviso-cookies",
    },
    {
        // Working 9/11/2018 (M) (Revisit)
        domain: "lepetitjournal.com",
        selector: ".popup-content",
    },
    {
        // Working 9/11/2018 (M)
        domain: "portfolio.hu",
        selector: "#_iph_cp_popup",
    },
    {
        // Working 9/11/2018 (M)
        domain: "nouvelobs.com",
        selector: "#ObsCnil",
    },
    {
        // Working 9/11/2018 (M)
        domain: "index.hu",
        selector: "#_iph_cp_popup",
    },
    {
        // Working 9/11/2018 (M)
        domain: "reuters.com",
        selector: "#_evidon_banner",
    },
    {
        // Working 9/11/2018 (M)
        domain: "shetnews.co.uk",
        selector: "#alert",
    },
    {
        // Working 9/11/2018 (M)
        domain: "tgcom24.mediaset.it",
        selector: "#cookieGdpr, #cookieAdv",
    },
    {
        // Working 9/11/2018 (M)
        domain: "trtworld.com",
        selector: ".gdpr-banner",
    },
    // Begin Quantcast
    {
        // Working 9/14/2018 (M)
        domain: "meneame.net",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 9/14/2018 (M)
        domain: "cyclingnews.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 9/14/2018 (M)
        domain: "euronews.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 9/14/2018 (M)
        domain: "joe.ie",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 9/14/2018 (M)
        domain: "vilaweb.cat",
        selector: ".qc-cmp-ui-container, #accept_cookies",
    },
    // End Quantcasrt
    {
        // Working 9/14/2018 (M)
        domain: "public.fr",
        selector: "#footer_tc_privacy",
    },
    {
        // Working 9/14/2018 (M)
        domain: "vrt.be",
        selector: ".js-cookie-consent",
    },
    {
        // Working 9/14/2018 (M)
        domain: "dailymail.co.uk",
        selector: ".mol-ads-cmp--banner",
    },
];

async function getSite(host) {
    let site = sites.find((s) => host.endsWith(s.domain));
    if (site) {
        let storage = await browser.storage.sync.get(site.domain);
        site.storage = storage[site.domain] || {blocked: true};
        site.blocked = site.storage.blocked;
        site.manual = site.storage.manual;
        return site;
    }
}
