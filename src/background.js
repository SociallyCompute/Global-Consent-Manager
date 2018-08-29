"use strict";
const epoch = (new Date).getTime();
const cookies = [
    {
        // NO-CONSENT
        // Working 8/24/2018 (M)
        domain: "mediapart.fr",
        name: "cc",
        value: "{%22disagreement%22:[%22visit%22%2C%22ad%22]%2C%22creation%22:" + epoch + "%2C%22update%22:" + epoch + "}",
    },
    {
        // NO CONSENT
        // Working 8/24/2018 (M)
        domain: "theguardian.com",
        name: "GU_TK",
        value: "0",
    },
    {
        // NO CONSENT
        // Working 8/24/2018 (M)
        domain: "theguardian.co.uk",
        name: "GU_TK",
        value: "0",
    },
    {
        // NO CONSENT
        // Working 8/24/2018 (M)
        domain: "www.independent.co.uk",
        name: "euconsent",
        value: "BOSl-jdOTLWH-AKAHCENBhAAAAAgkOy_"
        + "93f9_X1fvzf-_f_9__9_59__v____f3______"
        + "__-9________v7__v_9__________________"
        + "_________A",
    },
    {
        // NO CONSENT
        // Working 8/24/2018 (M)
        domain: "www.thelocal.es",
        name: "euconsent",
        value: "BOTLWroOTLWroABADAENBhAAAAAgl7___"
        + "____9______9uz_Gv_v_f__33e8__9v_l_7_-_"
        + "__u_-33d4-_1vX99yfm1-7ftr3tp_86ues2_Xu"
        + "r_9pd3s",
    },
    {
        // NO CONSENT
        // Working 8/24/2018 (M)
        domain: "www.telegraph.co.uk",
        name: "_evidon_consent_cookie",
        value: "{\"vendors\":{\"6\":[]},\"consent_" +
            "date\":\"2018-08-23T18:33:49.352Z\"}",
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
    {
        domain: "index.hr",
        selector: ".cookie-consent-container",
    },
    {
        domain: "investing.com",
        selector: ".consentBarWrapper",
    },
    {
        domain: "thejournal.ie",
        selector: "#notify-container",
    },
    {
        domain: "politico.eu",
        selector: ".alert-cookies",
    },
    {
        // takes a little while to load
        domain: "voterspost.com",
        selector: "#cookie-notice",
    },
    {
        domain: "bbc.com",
        selector: "#cookiePrompt",
    },
    {
        domain: "euractiv.com",
        selector: "#cookie-law-bar",
    },
    {
        domain: "nytimes.com",
        selector: "#app > footer[role=contentinfo] + .shown.expanded:last-child",
    },
    {
        domain: "ctxt.es",
        selector: "#aviso-cookies",
    },
    {
        domain: "lepetitjournal.com",
        selector: ".popup-content",
    },
    {
        domain: "portfolio.hu",
        selector: "#_iph_cp_popup",
    },
    {
        domain: "nouvelobs.com",
        selector: "#ObsCnil",
    },
    {
        domain: "index.hu",
        selector: "#_iph_cp_popup",
    },
    {
        domain: "reuters.com",
        selector: "#_evidon_banner",
    },
    {
        domain: "shetnews.co.uk",
        selector: "#alert",
    },
    {
        domain: "www.tgcom24.mediaset.it",
        selector: "#cookieGdpr",
    },
    {
        domain: "www.tgcom24.mediaset.it",
        selector: "#cookieAdv",
    },
    {
        domain: "trtworld.com",
        selector: ".gdpr-banner",
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
            console.log(c.selector + " rule set for " + c.domain);
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
