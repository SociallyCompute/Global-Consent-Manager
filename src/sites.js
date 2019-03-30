"use strict";

const sites = [
    {
        // Working 3/26/2019 (M)
        domain: "mediapart.fr",
        name: "cc",
        value: "{%22disagreement%22:[%22visit%22%2C%22ad%22]%2C%22creation%22:1537283817003%2C%22update%22:1537283817003}",
    },
    {
        // Working 3/26/2019 (M)
        domain: "theguardian.com",
        name: "GU_TK",
        value: "0",
    },
    {
        // Working 3/26/2019 (M)
        domain: "theguardian.co.uk",
        name: "GU_TK",
        value: "0",
    },
    {
        // Working 3/26/2019 (M)
        // ADD MORE thelocal.*
        domain: "thelocal.es",
        name: "euconsent",
        value: "BOTRKYzOTRKYzABABBENBdAAAAAgWAAA",
    },
    {
        // Working 3/26/2019 (M)
        domain: "digitaltrends.com",
        name: "CookieConsent",
        value: "{stamp:'dv8/ZEvl7WmSKpF9zRuHOD/EcIGUL5sq/IiDrPYYe0q8SsOtlsV7ng=='%2Cnecessary:true%2Cpreferences:false%2Cstatistics:false%2Cmarketing:false%2Cver:1}",
    },
    {
        // Working 3/26/2019 (M)
        domain: "telegraph.co.uk",
        name: "_evidon_consent_cookie",
        // Need to figure out current time conversion for evidon format of date.
        value: "{\"vendors\":{\"0\":[]},\"consent_date\":\"2018-08-23T18:33:49.352Z\"}",
    },
    {
        // Working 3/26/2019 (M)
        domain: "cnet.com",
        name: "_evidon_consent_cookie",
        // Need to figure out current time conversion for evidon format of date.
        value: "{\"vendors\":{\"0\":[]},\"consent_date\":\"2018-08-23T18:33:49.352Z\"}",
    },
    {
        // Working 3/26/2019 (M)
        domain: "popularmechanics.com",
        selector: "#_evidon-barrier-wrapper, #_evidon-banner, #_evidon-background",
    },
    {
        // Working 3/26/2019 (M)
        domain: "mashable.com",
        selector: "#_evidon-barrier-wrapper, #_evidon-banner, #_evidon-background",
    },
    {
        // Working 3/26/2019 (M)
        domain: "wired.com",
        selector: "#_evidon_banner",
    },
    {
        // Working? Double-check soon 3/26/2019 (M)
        // Note the .de
        domain: "businessinsider.de",
        selector: ".cc-window, .cc-banner, .cc-type-info, .cc-theme-block, .cc-bottom",
    },
    {
        // Working 3/26/2019 (M)
        domain: "eurogamer.net",
        selector: ".cookie-gdpr, .cookie-bar",
    },
    {
        // Working 3/26/2019 (M)
        domain: "thenextweb.com",
        selector: ".cookieConsent-popOut",
    },
    {
        // Working 3/26/2019 (M)
        domain: "independent.co.uk",
        selector: ".qc-cmp-ui-container.qc-cmp-showing",
    },
    {
        // Working 3/26/2019 (M)
        domain: "theverge.com",
        selector: "#privacy-consent",
    },
    {
        // Working 3/26/2019 (M)
        domain: "worldcrunch.com",
        selector: "#cookie-notice",
    },
    {
        // Working 3/26/2019 (M)
        domain: "forsal.pl",
        selector: "#inforcwp",
    },
    {
        // No Dialog 3/26/2019 (M)
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
        // Working 3/26/2019 (M)
        domain: "thejournal.ie",
        selector: "#notify-container",
    },
    {
        // FIXED 3/26/2019 (M)
        domain: "politico.eu",
        selector: ".as-oil",
    },
    {
        // Working 3/26/2019 (M)
        // takes a little while to load with console
        domain: "voterspost.com",
        selector: "#cookie-notice",
    },
    {
        // Working 3/26/2019 (M)
        domain: "bbc.com",
        selector: "#cookiePrompt",
    },
    {
        // Working 3/26/2019 (M)
        domain: "euractiv.com",
        selector: "#cookie-law-bar",
    },
    {
        // FIXED 3/26/2019 (M)
        domain: "nytimes.com",
        selector: ".gdpr",
    },
    {
        // Working 3/26/2019 (M)
        domain: "ctxt.es",
        selector: "#aviso-cookies",
    },
    {
        // Working 3/26/2019 (M)
        domain: "lepetitjournal.com",
        selector: ".popup-content",
    },
    {
        // Working 3/26/2019 (M)
        domain: "portfolio.hu",
        selector: "#_iph_cp_popup",
    },
    {
        // Working 3/26/2019 (M)
        domain: "nouvelobs.com",
        selector: "#ObsCnil",
    },
    {
        // Working 3/26/2019 (M)
        domain: "index.hu",
        selector: "#_iph_cp_popup",
    },
    {
        // Working 3/26/2019 (M)
        domain: "reuters.com",
        selector: "#_evidon_banner",
    },
    {
        // FIXED 3/26/2019 (M)
        domain: "shetnews.co.uk",
        selector: "#alert-cookies",
    },
    {
        // Working 3/26/2019 (M)
        domain: "tgcom24.mediaset.it",
        selector: "#cookieGdpr, #cookieAdv",
    },
    {
        // Working 3/26/2019 (M)
        domain: "trtworld.com",
        selector: ".gdpr-banner",
    },
    // Begin Quantcast
    {
        // Working 3/26/2019 (M)
        domain: "slashdot.org",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "buzzfeednews.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "phoronix.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "wccftech.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "meneame.net",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "macrumors.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/28/2019 (M)
        domain: "androidguys.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/28/2019 (M)
        domain: "rawstory.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "sammobile.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "cyclingnews.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "euronews.com",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "joe.ie",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/26/2019 (M)
        domain: "vilaweb.cat",
        selector: ".qc-cmp-ui-container, #accept_cookies",
    },
    {
        // Working 3/26/2019 (M)
        domain: "bleepingcomputer.com",
        selector: ".qc-cmp-ui-container, #accept_cookies",
    },
    // End Quantcast
    {
        // No Dialog 3/26/2019 (M)
        domain: "public.fr",
        selector: "#footer_tc_privacy",
    },
    {
        // Working 3/26/2019 (M)
        domain: "vrt.be",
        selector: ".js-cookie-consent",
    },
    {
        // Working 3/26/2019 (M)
        domain: "dailymail.co.uk",
        selector: ".mol-ads-cmp--banner",
    },
    {
        // Working 3/27/2019 (M)
        domain: "software.ac.uk",
        selector: "#gdpr-popup",
    },
    {
        // Working 3/27/2019 (M)
        domain: "insights.com",
        selector: "#ccc-icon, #ccc-notify",
    },
    {
        // Working 3/27/2019 (M)
        domain: "tiobe.com",
        selector: ".cc_banner-wrapper",
    },
    {
        // Working 3/27/2019 (M)
        domain: "mybrowseraddon.com",
        selector: ".cc_banner-wrapper",
    },
    {
        // Working 3/27/2019 (M)
        domain: "orcid.org",
        selector: "#cookie-alert",
    },
    {
        // Working 3/27/2019 (M)
        domain: "link.springer.com",
        selector: ".optanon-alert-box-wrapper",
    },
    {
        // Working 3/27/2019 (M)
        domain: "thedailybeast.com",
        selector: ".optanon-alert-box-wrapper, #optanon",
    },
    {
        // Working 3/27/2019 (M)
        domain: "gallup.com",
        selector: "#gel-cookie-banner",
    },
    //Begin sp_message banners
    {
        // Working 3/27/2019 (M)
        domain: "motherboard.vice.com",
        selector: "[id^='sp_message_id'], [class^='sp_veil']",
    },
    {
        // Working 3/27/2019 (M)
        domain: "theneweuropean.co.uk",
        selector: "[id^='sp_message_id'], [class^='sp_veil']",
    },
    //End sp_message banners
    {
        // Working 3/27/2019 (M)
        domain: "forbes.com",
        selector: "[id^='pop-div']",
    },
    {
        // Working 3/28/2019 (M)
        domain: "independent.ie",
        selector: ".qc-cmp-ui-container",
    },
    {
        // Working 3/27/2019 (M)
        domain: "newyorker.com",
        selector: "#_evidon_banner",
    },
    {
        // Working 3/27/2019 (M)
        domain: "healthline.com",
        selector: ".window-wrapper",
    },
    {
        // Working 3/27/2019 (M)
        domain: "rtbf.be",
        selector: "#js-cookie-policy-default, .rtbf-cookie-policy__title, .rtbf-cookie-policy__text",
    },
    {
        // Working 3/28/2019 (M)
        domain: "m.argos.ie",
        selector: ".sk_argOverlayDiv",
    },
    {
        // Working 3/28/2019 (M)
        domain: "brussels-city-shuttle.com",
        selector: "#cookie_banner",
    },
    /*
    {
        // Broken 3/28/2019 (M)
        domain: "wp.pl",
        selector: "#cookie_banner",
    },
    */
    {
        // Working 3/28/2019 (M)
        domain: "medium.com",
        selector: ".butterBar",
    },
    {
        // Working 3/28/2019 (M)
        domain: "programmableweb.com",
        selector: "#sliding-popup",
    },
    {
        // Working 3/28/2019 (M)
        domain: "suzuki.ro",
        selector: "#CybotCookiebotDialog",
    },
    {
        // Working 3/28/2019 (M)
        domain: "brdfinance.ro",
        selector: ".wrapper-banner-cookie",
    },
    {
        // Working 3/28/2019 (M)
        domain: "ns.nl",
        selector: "#r42CookieBar, #r42CookieBg",
    },
    {
        // Working 3/28/2019 (M)
        domain: "fool.com",
        selector: "#gdpr-modal-background, #gdpr-modal-content, .cc-window",
    },
    {
        // Working 3/28/2019 (M)
        domain: "foodnetwork.co.uk",
        selector: "#cookie-message-mask, .cookie-message",
    },
    {
        // Working 3/28/2019 (M)
        domain: "foreignaffairs.com",
        selector: ".gdpr",
    },
    {
        // Working 3/27/2019 (M)
        domain: "smbc-comics.com",
        selector: "[class^='banner_banner']",
    },
];

// eslint-disable-next-line
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
