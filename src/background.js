"use strict";

const cookies = [
    {
        // Working 8/24/2018 (M)
        domain: "index.hr",
        name: "consentSaw",
        value: "true",
    },
    {
        // Working 8/24/2018 (M)
        domain: "investing.com",
        name: "cookieConsent",
        value: "was-set",
    },
    {
        // Working 8/24/2018 (M)
        // This is the cookie recieved when "J'accepte" is pressed.
        domain: "mediapart.fr",
        name: "cc",
        value: "{%22disagreement%22:[]%2C%22creation%22:1535037101031%2C%22update%22:1535037123418}",
    },
    {
        // Working 8/24/2018 (M)
        domain: "theguardian.co.uk",
        name: "GU_TK",
        value: "1",
    },
    {
        // Working 8/24/2018 (M)
        domain: "thejournal.ie",
        name: "cookies_notice",
        value: "1",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.independent.co.uk",
        name: "euconsent",
        value: "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
            "___________________________________________" +
            "________________________________A",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.thelocal.es",
        name: "euconsent",
        value: "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
            "___________________________________________" +
            "________________________________A",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.politico.eu",
        name: "banner-cookie",
        value: "0",
    },
    {
        // Working 8/24/2018 (M)
        domain: "voterspost.com",
        name: "cookie_notice_accepted",
        value: "true",
    },
    {
        // Working 8/24/2018 (M)
        domain: "bbc.com",
        name: "ckns_policy_exp",
        value: "1566096722751",
    },
    {
        // Working 8/24/2018 (M)
        domain: "bbc.com",
        name: "ckns_explicit",
        value: "1",
    },
    {
        // Working 8/24/2018 (M)
        domain: "bbc.com",
        name: "ckns_privacy",
        value: "1",
    },
    {
        // Working 8/24/2018 (M)
        domain: "bbc.com",
        name: "ckns_policy",
        value: "111",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.euractiv.com",
        name: "cookie-law-bar",
        value: "accept",
    },
    {
        // Working 8/24/2018 (M)
        domain: "nytimes.com",
        name: "NYT-T",
        value: "ok",
    },
    {
        // Working 8/24/2018 (M)
        domain: "nytimes.com",
        name: "nyt-gdpr",
        value: "1",
    },
    {
        // Working 8/24/2018 (M)
        domain: "ctxt.es",
        name: "lopd",
        value: "true",
    },
    // Working 8/24/2018 (M)
    {
        domain: "index.hu",
        name: "_iph_pcb",
        value: "1",
    },
    {
        // Working 8/24/2018 (M)
        domain: "reuters.com",
        name: "_evidon_consent_cookie",
        value: "{\"vendors\":{\"3\":[17,51,58,64,80,81,131," +
            "134,168,174,176,190,249,257,274,290,292,313,348,355,395," +
            "443,474,480,506,635,920,934,958,1043,1256,1284,1440,1550," +
            "1879,2449,2516,2521,2609,2645,2918,2941,3009,3373,3490,3561,+ " +
            "3632,3768,3794,3857,3992,4097,4160,4511,4670,4672,5148,5172]}," +
            "\"consent_date\":\"2018-08-21T15:49:17.529Z\"}",
    },
    {
        // Working 8/24/2018 (M)
        domain: "lepetitjournal.com",
        name: "cookie-agreed",
        value: "2",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.portfolio.hu",
        name: "_iph_pcb",
        value: "1",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.portfolio.hu",
        name: "_gali",
        value: "_iph_cp_accept",
    },
    {
        // Working 8/24/2018 (M)
        domain: "nouvelobs.com",
        name: "ObsRGPD",
        value: "%7B%22date%22%3A1568744358165%7D",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.shetnews.co.uk",
        name: "sn_cookie",
        value: "enabled",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.tgcom24.mediaset.it",
        name: "rtiCookieLaw01",
        value: "on",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.tgcom24.mediaset.it",
        name: "gdprCookie",
        value: "on",
    },
    {
        // Working 8/24/2018 (M)
        // A blank frame comes up for me, but as inspected it says "google ads iframe"
        domain: "www.telegraph.co.uk",
        name: "_evidon_consent_cookie",
        value: "{\"vendors\":{\"6\":[14,17,31,36,51,56" +
            ",63,64,66,82,84,111,128,131,134,139,141,168,173,176," +
            "189,249,253,290,292,293,298,307,313,348,375,395,433," +
            "457,467,539,550,560,608,623,635,718,841,937,948,1028," +
            "1100,1117,1192,1256,1463,1647,2197,2449,2609,2629," +
            "2937,3163,3373,3384,3428,3490,3794,3878,3952,3994," +
            "4160,4166,4903,4925,4931,4970,5037,5403]},\"consent_" +
            "date\":\"2018-08-23T18:33:49.352Z\"}",
    },
    {
        // Working 8/24/2018 (M)
        domain: "www.trtworld.com",
        name: "closeGDPR",
        value: "true",
    },
];

const css = [
    {
        domain: "theverge.com",
        selector: "#privacy-consent",
    },
    {
        domain: "worldcrunch.com",
        selector: "#cookie-notice",
    },
    {
        domain: "forsal.pl",
        selector: "#inforcwp",
    },
];

let contentScripts = [];

let actions = {
    async enable() {
        for (let c of cookies) {
            await browser.cookies.set({
                domain: c.domain,
                name: c.name,
                value: c.value,
                url: `http://${c.domain}/`,
                firstPartyDomain: "",
            });
            console.log(`Cookie ${c.name} set for domain ${c.domain}`);
        }
        for (let c of css) {
            let cs = await browser.contentScripts.register({
                matches: [`*://*.${c.domain}/*`],
                css: [{code: `${c.selector} { display: none !important }`}],
                runAt: "document_start",
            });
            contentScripts.push(cs);
        }
        browser.storage.sync.set({enabled: true});
    },

    async disable() {
        for (let c of cookies) {
            await browser.cookies.remove({
                name: c.name,
                url: `http://${c.domain}/`,
                firstPartyDomain: "",
            });
        }
        for (let cs of contentScripts) {
            await cs.unregister();
        }
        contentScripts = [];
        console.log("Cookies and CSS hiders disabled")
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
