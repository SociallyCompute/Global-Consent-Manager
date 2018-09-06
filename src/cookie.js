"use strict";

async function logCookies(currentDomain) {
    let tabs = await browser.tabs.query({active: true, currentWindow: true});
    let cookies = null;
    if (currentDomain == true) {
        console.log("CURRENT DOMAIN");
        cookies = await browser.cookies.getAll({url: tabs[0].url});
    } else {
        cookies = await browser.cookies.getAll({});
    }
    if (cookies === undefined || cookies.length == 0) {
        console.log("No cookies found!");
    } else {
        let j = 1;
        for (let cookie of cookies) {
            // console.log(cookie);
            console.log("#" + j);
            console.log(cookie);
            j++;
        }
    }
}

let actions = {
    enable() {
        browser.runtime.sendMessage("enable");
    },

    disable() {
        browser.runtime.sendMessage("disable");
    },

    logAll() {
        logCookies(false);
    },

    log() {
        logCookies(true);
    },

    consent2() {
        async function addName(name) {
            let cookies = await browser.cookies.getAll({name: name});
            if (cookies.length != 0) {
                for (let cookie of cookies) {
                    console.log("At domain " + cookie.domain + " found " + name);
                }
            }
        }

        console.log("ALL PRESENT GENERATED CONSENT COOKIES");
        addName("euconsent");
        addName("cepubsonsent");
        addName("banner-cookie");
        addName("GU_TK");
        addName("ckns_policy_exp");
        addName("ckns_policy");
        addName("ckns_privacy");
        addName("ckns_explicit");
        addName("cookie_notice_accepted");
        addName("cookie-law-bar");
        addName("closeGDPR");
        addName("NYT-T");
        addName("nyt-gdpr");
        addName("lopd");
        addName("_iph_pcb");
        addName("consentSaw");
        addName("cookieConsent");
        addName("cookies_notice");
        addName("cc");
        addName("displayCookieConsent");
        addName("cookie-agreed");
        addName("_evidon_consent_cookie");
        addName("rtiCookieLaw01");
        addName("gdprCookie");
        addName("sn_cookie");
        addName("ObsRGPD");
        addName("_iph_pcb");
        addName("_gali");
        addName("consentSaw");
        addName("closeGDPR");
    },

    /* click "CLEAR COOKIES" WILL CLEAR ALL YOUR COOKIES */
    async clear() {
        try {
            await browser.browsingData.removeCookies({});
            console.log("Removed!");
        } catch (error) {
            console.error(error);
        }
    },

    async snapshot() {
        let [tab] = await browser.tabs.query({active: true});
        let domain = new URL(tab.url).host;
        let cookies = await browser.cookies.getAll({domain});
        console.log("snapshot for: ", domain);
        for (let c of cookies) {
            let same = (s) => s.name === c.name && s.value === c.value;
            if (!snapshot.some(same)) {
                console.log(c);
            }
        }
        snapshot = cookies;
    },
};

// Save a snapshot of cookies to compare to.
let snapshot = [];

async function main() {
    let block = document.querySelector("#block");
    let {enabled} = await browser.storage.sync.get();
    block.checked = enabled;

    // document.addEventListener("click", async (e) => {
    //     await actions[e.target.id]();
    //     window.close();
    // });

    block.addEventListener("change", async (e) => {
        let msg = block.checked ? "enable" : "disable";
        await actions[msg]();
    });
}

main();
