"use strict";

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

browser.runtime.onMessage.addListener(async () => {
    for (let c of css) {
        let cs = await browser.contentScripts.register({
            matches: [`*://*.${c.domain}/*`],
            css: [{code: `${c.selector} { display: none !important }`}],
            runAt: "document_start",
        });
        contentScripts.push(cs);
    }
});
